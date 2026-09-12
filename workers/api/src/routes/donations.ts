import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";
import type { Bindings } from "../bindings";

const donations = new Hono<{ Bindings: Bindings }>();

const createSchema = z.object({
  campaign_id: z.number(),
  amount: z.number().min(10000),
});

donations.get("/campaigns", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT * FROM campaigns ORDER BY created_at DESC`).all();
  return c.json(results);
});

donations.post("/", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);
  const { results } = await c.env.DB.prepare(
    `INSERT INTO donations (donor_id, campaign_id, amount, status) VALUES (?, ?, ?, 'pending') RETURNING *`
  ).bind(user.sub, parsed.data.campaign_id, parsed.data.amount).all();
  const donation = results[0];
  // TODO: create payment intent with Stripe/MPGS, return client_token
  return c.json({ donation, client_token: "todo_payment_client_token" });
});

donations.get("/me", authMiddleware, async (c) => {
  const user = c.get("user");
  const { results } = await c.env.DB.prepare(
    `SELECT d.*, c.title as campaign_title FROM donations d JOIN campaigns c ON d.campaign_id = c.id WHERE d.donor_id = ? ORDER BY d.created_at DESC`
  ).bind(user.sub).all();
  return c.json(results);
});

export default donations;