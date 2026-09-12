import { DurableObject } from "cloudflare:workers";

export interface Env {
  DB: D1Database;
  KV: KVNamespace;
}

export class ChatRoom extends DurableObject<Env> {
  sql: any;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;
    this.init();
  }

  init() {
    this.sql.exec(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_id INTEGER NOT NULL,
      content TEXT,
      media_json TEXT,
      sent_at TEXT DEFAULT (datetime('now'))
    )`);
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (request.headers.get("Upgrade") === "websocket") {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      this.handleSession(server);
      return new Response(null, { status: 101, webSocket: client });
    }
    if (url.pathname === "/messages") {
      const { results } = await this.env.DB.prepare(
        `SELECT m.*, a.full_name, a.avatar_url FROM messages m JOIN alumni a ON m.sender_id = a.id WHERE m.room_id = ? ORDER BY m.sent_at DESC LIMIT 50`
      ).bind(this.ctx.id.toString()).all();
      return Response.json(results.reverse());
    }
    return new Response("Not found", { status: 404 });
  }

  handleSession(ws: WebSocket) {
    ws.accept();
    ws.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data as string);
      if (data.type === "send") {
        await this.env.DB.prepare(
          `INSERT INTO messages (room_id, sender_id, content, media_json) VALUES (?, ?, ?, ?)`
        ).bind(this.ctx.id.toString(), data.sender_id, data.content, data.media_json || null).run();
        // broadcast
        const msg = { ...data, sent_at: new Date().toISOString() };
        this.ctx.getWebSockets().forEach(s => s.send(JSON.stringify(msg)));
      }
    });
  }
}