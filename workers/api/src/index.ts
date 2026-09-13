import { Hono } from "hono";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import { jwtVerify, SignJWT } from "jose";
import { z } from "zod";
import type { Bindings } from "./bindings";
import posts from "./routes/posts";
import events from "./routes/events";
import jobs from "./routes/jobs";
import donations from "./routes/donations";
import banners from "./routes/banners";
import analytics from "./routes/analytics";
import { ChatRoom } from "./durable/ChatRoom";

// ---------- Types ----------
type Env = Bindings;

// ---------- App ----------
const app = new Hono<{ Bindings: Env }>();


// Debug route to see bindings
app.get("/debug/env", (c) => {
  const env = c.env;
  // Only show non-sensitive info
  const info = {
    KV: !!env.KV,
    R2: !!env.R2,
    DB: !!env.DB,
    ENV: env.ENV,
    CHAT_ROOM: !!env.CHAT_ROOM,
  };
  return c.json(info);
});



app.use("*", cors({ origin: "*", allowHeaders: ["Content-Type", "Authorization"], allowMethods: ["GET","POST","PATCH","DELETE","OPTIONS"] }));

// ---------- Helpers ----------
const JWT_SECRET = (c: any) => c.env.JWT_SECRET;

const authMiddleware = createMiddleware(async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) return c.json({ error: "Unauthorized" }, 401);
  const token = header.slice(7);
  try {
    const secret = new TextEncoder().encode(JWT_SECRET(c));
    const { payload } = await jwtVerify(token, secret);
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid token" }, 401);
  }
});

// ---------- Routes ----------
app.get("/health", (c) => c.json({ ok: true, env: c.env.ENV }));

// ---- Auth: Magic Link ----
const magicLinkSchema = z.object({ email: z.string().email() });
app.post("/auth/magic-link", async (c) => {
  const body = await c.req.json();
  const parsed = magicLinkSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { email } = parsed.data;
  const token = crypto.randomUUID();
  await c.env.KV.put(`magic:${token}`, email, { expirationTtl: 900 });
  return c.json({ message: "Magic link sent (dev)", token });
});

const verifySchema = z.object({ token: z.string().uuid() });
app.post("/auth/verify", async (c) => {
  const body = await c.req.json();
  const parsed = verifySchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { token } = parsed.data;
  const email = await c.env.KV.get(`magic:${token}`);
  if (!email) return c.json({ error: "Invalid or expired token" }, 400);
  await c.env.KV.delete(`magic:${token}`);

  const stmt = c.env.DB.prepare(
    `INSERT INTO alumni (email, created_at) VALUES (?, datetime('now'))
     ON CONFLICT(email) DO UPDATE SET email=excluded.email
     RETURNING id, email, full_name, grad_year, faculty, membership_tier`
  );
  const { results } = await stmt.bind(email).all();
  const alumni = results[0];

  const jwtToken = await new SignJWT({ sub: alumni.id, email: alumni.email, tier: alumni.membership_tier })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(JWT_SECRET(c)));

  return c.json({ token: jwtToken, alumni });
});

app.get("/auth/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const stmt = c.env.DB.prepare(
    `SELECT id, email, full_name, grad_year, faculty, major, avatar_url, consent_contacts, membership_tier, created_at
     FROM alumni WHERE id = ?`
  );
  const { results } = await stmt.bind(user.sub).all();
  if (!results.length) return c.json({ error: "Not found" }, 404);
  return c.json(results[0]);
});

const profileSchema = z.object({
  full_name: z.string().optional(),
  phone: z.string().optional(),
  grad_year: z.number().int().optional(),
  faculty: z.string().optional(),
  major: z.string().optional(),
  avatar_url: z.string().url().optional(),
  consent_contacts: z.boolean().optional(),
});
app.patch("/auth/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const fields = Object.entries(parsed.data).filter(([,v]) => v !== undefined);
  if (!fields.length) return c.json({ error: "No fields" }, 400);
  const setClause = fields.map(([k]) => `${k}=?`).join(", ");
  const values = [...fields.map(([,v]) => v), user.sub];
  await c.env.DB.prepare(`UPDATE alumni SET ${setClause} WHERE id = ?`).bind(...values).run();
  return c.json({ ok: true });
});

// Mount feature routes
app.route("/posts", posts);
app.route("/events", events);
app.route("/jobs", jobs);
app.route("/donations", donations);
app.route("/banners", banners);
app.route("/analytics", analytics);

// Chat WebSocket endpoint (Durable Object)
app.get("/rooms/:roomId/ws", async (c) => {
  const roomId = c.req.param("roomId");
  const id = c.env.CHAT_ROOM.idFromName(roomId);
  const stub = c.env.CHAT_ROOM.get(id);
  return stub.fetch(c.req.raw);
});

app.get("/rooms/:roomId/messages", async (c) => {
  const roomId = c.req.param("roomId");
  const id = c.env.CHAT_ROOM.idFromName(roomId);
  const stub = c.env.CHAT_ROOM.get(id);
  return stub.fetch(new Request(`https://internal/messages`));
});

app.post("/rooms", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const { type = "direct", name, member_ids = [] } = body;
  if (!member_ids.includes(user.sub)) member_ids.push(user.sub);
  const { results } = await c.env.DB.prepare(
    `INSERT INTO chat_rooms (type, name) VALUES (?, ?) RETURNING id`
  ).bind(type, name).all();
  const roomId = results[0].id;
  for (const mid of member_ids) {
    await c.env.DB.prepare(`INSERT OR IGNORE INTO chat_members (room_id, alumni_id) VALUES (?, ?)`).bind(roomId, mid).run();
  }
  return c.json({ id: roomId, type, name });
});

app.get("/rooms", authMiddleware, async (c) => {
  const user = c.get("user");
  const { results } = await c.env.DB.prepare(
    `SELECT cr.*, cm.alumni_id FROM chat_rooms cr
     JOIN chat_members cm ON cr.id = cm.room_id
     WHERE cm.alumni_id = ?
     ORDER BY cr.created_at DESC`
  ).bind(user.sub).all();
  return c.json(results);
});

// Serve SPA static assets fallback (mobile web) when ASSETS binding is present
app.get("*", async (c) => {
  if (c.env.ASSETS) {
    return await c.env.ASSETS.fetch(c.req.raw);
  }
  return c.text("Not Found", 404);
});

// ---------- Export ----------
export default app;
export { ChatRoom };