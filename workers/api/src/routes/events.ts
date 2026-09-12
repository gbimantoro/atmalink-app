import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const events = new Hono<{ Bindings: Bindings }>();

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  start_at: z.string(),
  end_at: z.string().optional(),
  location: z.string().optional(),
  cover_url: z.string().url().optional(),
});

events.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT e.*, a.full_name as organizer_name FROM events e JOIN alumni a ON e.organizer_id = a.id WHERE e.start_at >= datetime('now') ORDER BY e.start_at ASC`
  ).all();
  return c.json(results);
});

events.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { title, description, start_at, end_at, location, cover_url } = parsed.data;
  const { results } = await c.env.DB.prepare(
    `INSERT INTO events (organizer_id, title, description, start_at, end_at, location, cover_url) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(user.sub, title, description, start_at, end_at, location, cover_url).all();
  return c.json(results[0], 201);
});

events.post("/:id/rsvp", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  await c.env.DB.prepare(
    `INSERT OR IGNORE INTO event_rsvps (event_id, alumni_id) VALUES (?, ?)`
  ).bind(id, user.sub).run();
  await c.env.DB.prepare(`UPDATE events SET rsvp_count = rsvp_count + 1 WHERE id = ? AND (SELECT changes() > 0)`).bind(id).run();
  return c.json({ ok: true });
});

events.delete("/:id/rsvp", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const { changes } = await c.env.DB.prepare(`DELETE FROM event_rsvps WHERE event_id = ? AND alumni_id = ?`).bind(id, user.sub).run();
  if (changes) await c.env.DB.prepare(`UPDATE events SET rsvp_count = rsvp_count - 1 WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

export default events;