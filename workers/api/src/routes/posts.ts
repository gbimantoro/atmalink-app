import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const posts = new Hono<{ Bindings: Bindings }>();

const createSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().optional(),
  media_json: z.string().optional(),
  tags_json: z.string().optional(),
  visibility: z.enum(["public", "alumni"]).default("alumni"),
});

posts.get("/", async (c) => {
  const cursor = c.req.query("cursor");
  const limit = Math.min(parseInt(c.req.query("limit") || "20"), 50);
  let sql = `SELECT p.*, a.full_name, a.avatar_url FROM posts p JOIN alumni a ON p.author_id = a.id WHERE p.visibility IN ('public','alumni')`;
  const params: any[] = [];
  if (cursor) {
    sql += ` AND p.published_at < ?`;
    params.push(cursor);
  }
  sql += ` ORDER BY p.published_at DESC LIMIT ?`;
  params.push(limit + 1);
  const { results } = await c.env.DB.prepare(sql).bind(...params).all();
  const hasMore = results.length > limit;
  const items = hasMore ? results.slice(0, -1) : results;
  const nextCursor = hasMore ? items[items.length - 1].published_at : undefined;
  return c.json({ data: items, meta: { cursor: nextCursor } });
});

posts.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { title, body: postBody, media_json, tags_json, visibility } = parsed.data;
  const stmt = c.env.DB.prepare(
    `INSERT INTO posts (author_id, title, body, media_json, tags_json, visibility) VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
  );
  const { results } = await stmt.bind(user.sub, title, postBody, media_json, tags_json, visibility).all();
  return c.json(results[0], 201);
});

posts.patch("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const body = await c.req.json();
  const allowed = ["title", "body", "media_json", "tags_json", "visibility"];
  const fields = Object.entries(body).filter(([k]) => allowed.includes(k));
  if (!fields.length) return c.json({ error: "No fields" }, 400);
  const setClause = fields.map(([k]) => `${k}=?`).join(", ");
  const values = [...fields.map(([, v]) => v), id, user.sub];
  const { results } = await c.env.DB.prepare(
    `UPDATE posts SET ${setClause} WHERE id = ? AND author_id = ? RETURNING *`
  ).bind(...values).all();
  if (!results.length) return c.json({ error: "Not found" }, 404);
  return c.json(results[0]);
});

posts.delete("/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  await c.env.DB.prepare(`DELETE FROM posts WHERE id = ? AND author_id = ?`).bind(id, user.sub).run();
  return c.json({ ok: true });
});

export default posts;