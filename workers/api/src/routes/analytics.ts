import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const analytics = new Hono<{ Bindings: Bindings }>();

const eventSchema = z.object({
  eventName: z.string().min(1),
  props: z.record(z.any()).optional(),
});

analytics.post("/event", async (c) => {
  const body = await c.req.json();
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const userId = c.get("user")?.sub;
  await c.env.DB.prepare(
    `INSERT INTO analytics_events (user_id, event_name, props_json) VALUES (?, ?, ?)`
  ).bind(userId || null, parsed.data.eventName, JSON.stringify(parsed.data.props || {})).run();
  return c.json({ ok: true });
});

// Admin dashboard summary
analytics.get("/admin/summary", authMiddleware, async (c) => {
  const user = c.get("user");
  if (user.tier !== "atma_key") return c.json({ error: "Forbidden" }, 403);
  const [alumniCount, postsCount, eventsCount, jobsCount, donationsSum] = await Promise.all([
    c.env.DB.prepare(`SELECT COUNT(*) as c FROM alumni`).first(),
    c.env.DB.prepare(`SELECT COUNT(*) as c FROM posts`).first(),
    c.env.DB.prepare(`SELECT COUNT(*) as c FROM events`).first(),
    c.env.DB.prepare(`SELECT COUNT(*) as c FROM jobs`).first(),
    c.env.DB.prepare(`SELECT SUM(amount) as total FROM donations WHERE status='paid'`).first(),
  ]);
  return c.json({
    alumni: alumniCount?.c || 0,
    posts: postsCount?.c || 0,
    events: eventsCount?.c || 0,
    jobs: jobsCount?.c || 0,
    donations_total: donationsSum?.total || 0,
  });
});

export default analytics;