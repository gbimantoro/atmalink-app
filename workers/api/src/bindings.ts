// Bindings definition for Cloudflare Workers & Assets
export interface Bindings {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  CHAT_ROOM: any;
  ASSETS?: Fetcher;
  ENV?: string;
  JWT_SECRET: string;
  EMAIL?: any;
  STRIPE_SECRET?: string;
  APNS_KEY_ID?: string;
  APNS_TEAM_ID?: string;
  APNS_PRIVATE_KEY?: string;
  FCM_SERVER_KEY?: string;
}