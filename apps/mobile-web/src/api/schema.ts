// Generated from backend OpenAPI spec - update after backend changes
export interface paths {
  "/auth/magic-link": {
    post: {
      requestBody: { content: { "application/json": { email: string } } };
      responses: { 200: { content: { "application/json": { message: string; token?: string } } } };
    };
  };
  "/auth/verify": {
    post: {
      requestBody: { content: { "application/json": { token: string } } };
      responses: { 200: { content: { "application/json": { token: string; alumni: Alumni } } } };
    };
  };
  "/auth/me": {
    get: {
      responses: { 200: { content: { "application/json": Alumni } } };
    };
    patch: {
      requestBody: { content: { "application/json": Partial<Alumni> } };
      responses: { 200: { content: { "application/json": { ok: boolean } } } };
    };
  };
  "/posts": {
    get: { parameters: { query: { cursor?: string; limit?: number } }; responses: { 200: { content: { "application/json": Post[] } } } };
    post: { requestBody: { content: { "application/json": { title: string; body?: string; media_json?: string; tags_json?: string; visibility?: string } } }; responses: { 200: { content: { "application/json": Post } } } };
  };
  "/events": {
    get: { responses: { 200: { content: { "application/json": Event[] } } } };
  };
  "/events/{id}/rsvp": {
    post: { parameters: { path: { id: number } }; responses: { 200: { content: { "application/json": { ok: boolean } } } } };
    delete: { parameters: { path: { id: number } }; responses: { 200: { content: { "application/json": { ok: boolean } } } } };
  };
  "/jobs": {
    get: { parameters: { query: { status?: string } }; responses: { 200: { content: { "application/json": Job[] } } } };
  };
  "/banners": {
    get: { parameters: { query: { placement?: string } }; responses: { 200: { content: { "application/json": Banner[] } } } };
  };
  "/campaigns": {
    get: { responses: { 200: { content: { "application/json": Campaign[] } } } };
  };
  "/donations": {
    post: { requestBody: { content: { "application/json": { donor_id: number; campaign_id: number; amount: number } } }; responses: { 200: { content: { "application/json": Donation } } } };
  };
  "/donations/me": {
    get: { responses: { 200: { content: { "application/json": Donation[] } } } };
  };
  "/rooms": {
    get: { responses: { 200: { content: { "application/json": ChatRoom[] } } } };
    post: { requestBody: { content: { "application/json": { type: string; name?: string; member_ids: number[] } } }; responses: { 200: { content: { "application/json": ChatRoom } } } };
  };
  "/rooms/{id}/messages": {
    get: { parameters: { path: { id: number } }; responses: { 200: { content: { "application/json": Message[] } } } };
  };
  "/analytics/event": {
    post: { requestBody: { content: { "application/json": { eventName: string; props: any } } }; responses: { 200: { content: { "application/json": { ok: boolean } } } } };
  };
}

export interface Alumni {
  id: number;
  email: string;
  full_name?: string;
  grad_year?: number;
  faculty?: string;
  major?: string;
  avatar_url?: string;
  consent_contacts: boolean;
  membership_tier: "free" | "atma_key";
  created_at: string;
}

export interface Post {
  id: number;
  author_id: number;
  title: string;
  body?: string;
  media_json?: string;
  tags_json?: string;
  visibility: "public" | "alumni";
  published_at: string;
  created_at: string;
}

export interface Event {
  id: number;
  organizer_id: number;
  title: string;
  description?: string;
  start_at: string;
  end_at?: string;
  location?: string;
  cover_url?: string;
  rsvp_count: number;
  created_at: string;
}

export interface Job {
  id: number;
  company_id: number;
  title: string;
  description?: string;
  requirements?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  status: "draft" | "verified" | "published" | "closed";
  posted_at: string;
  created_at: string;
}

export interface Banner {
  id: number;
  image_url: string;
  link_url?: string;
  placement: "home" | "feed" | "event" | "job";
  priority: number;
  start_at?: string;
  end_at?: string;
  created_at: string;
}

export interface Campaign {
  id: number;
  title: string;
  goal_amount: number;
  collected_amount: number;
  banner_url?: string;
  created_at: string;
}

export interface Donation {
  id: number;
  donor_id: number;
  campaign_id: number;
  amount: number;
  status: "pending" | "paid" | "failed" | "refunded";
  payment_ref?: string;
  paid_at?: string;
  created_at: string;
}

export interface ChatRoom {
  id: number;
  type: "direct" | "group";
  name?: string;
  created_at: string;
  members?: Alumni[];
  last_message?: Message;
}

export interface Message {
  id: number;
  room_id: number;
  sender_id: number;
  content?: string;
  media_json?: string;
  sent_at: string;
  sender?: Alumni;
}