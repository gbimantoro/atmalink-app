import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const banners = new Hono<{ Bindings: Bindings }>();

const createSchema = z.object({
  image_url: z.string().url(),
  link_url: z.string().url().optional(),
  placement: z.enum(["home","feed","event","job"]).default("home"),
  priority: z.number().default(0),
  start_at: z.string().optional(),
  end_at: z.string().optional(),
});

banners.get("/", async (c) => {
  const placement = c.req.query("placement");
  let sql = `SELECT * FROM banners WHERE (start_at IS NULL OR start_at <= datetime('now')) AND (end_at IS NULL OR end_at >= datetime('now'))`;
  const params: any[] = [];
  if (placement) { sql += ` AND placement = ?`; params.push(placement); }
  sql += ` ORDER BY priority DESC, created_at DESC`;
  const { results } = await c.env.DB.prepare(sql).bind(...params).all();
  return c.json(results);
});

banners.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.tier !== "atma_key") return c.json({ error: "Forbidden" }, 403);
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { results } = await c.env.DB.prepare(
    `INSERT INTO banners (image_url, link_url, placement, priority, start_at, end_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(parsed.data.image_url, parsed.data.link_url, parsed.data.placement, parsed.data.priority, parsed.data.start_at, parsed.data.end_at).all();
  return c.json(results[0], 201);
});

export default banners;