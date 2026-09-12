import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const jobs = new Hono<{ Bindings: Bindings }>();

const createSchema = z.object({
  company_id: z.number(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  requirements: z.string().optional(),
  location: z.string().optional(),
  salary_min: z.number().optional(),
  salary_max: z.number().optional(),
  job_type: z.string().optional(),
  remote_type: z.string().optional(),
});

jobs.get("/", async (c) => {
  const status = c.req.query("status") || "published";
  const { results } = await c.env.DB.prepare(
    `SELECT j.*, c.name as company_name, c.logo_url FROM jobs j JOIN companies c ON j.company_id = c.id WHERE j.status = ? ORDER BY j.posted_at DESC`
  ).bind(status).all();
  return c.json(results);
});

jobs.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  // verify company ownership? skip for now
  const { results } = await c.env.DB.prepare(
    `INSERT INTO jobs (company_id, title, description, requirements, location, salary_min, salary_max, job_type, remote_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    parsed.data.company_id,
    parsed.data.title,
    parsed.data.description,
    parsed.data.requirements,
    parsed.data.location,
    parsed.data.salary_min,
    parsed.data.salary_max,
    parsed.data.job_type,
    parsed.data.remote_type
  ).all();
  return c.json(results[0], 201);
});

jobs.patch("/:id/verify", authMiddleware, async (c) => {
  // admin only - check tier
  const user = c.get("user");
  if (user.tier !== "atma_key") return c.json({ error: "Forbidden" }, 403);
  const id = c.req.param("id");
  await c.env.DB.prepare(`UPDATE jobs SET status = 'verified' WHERE id = ?`).bind(id).run();
  return c.json({ ok: true });
});

export default jobs;