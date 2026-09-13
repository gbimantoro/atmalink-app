import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8787";

export const api = createClient<paths>({ baseUrl: API_BASE });

// Convenience methods
export const authApi = {
  magicLink: (email: string) => api.POST("/auth/magic-link", { body: { email } }),
  verify: (token: string) => api.POST("/auth/verify", { body: { token } }),
  me: (init?: RequestInit) => api.GET("/auth/me", init as any),
  updateMe: (data: any, init?: RequestInit) => api.PATCH("/auth/me", { body: data, ...(init as any) }),
};

export const postsApi = {
  list: (cursor?: string, limit = 20) => api.GET("/posts", { params: { query: { cursor, limit } } }),
  create: (data: any, init?: RequestInit) => api.POST("/posts", { body: data, ...(init as any) }),
};

export const eventsApi = {
  list: () => api.GET("/events"),
  rsvp: (id: number, init?: RequestInit) => api.POST(`/events/${id}/rsvp` as any, init as any),
  unrsvp: (id: number, init?: RequestInit) => api.DELETE(`/events/${id}/rsvp` as any, init as any),
};

export const jobsApi = {
  list: (status = "verified") => api.GET("/jobs", { params: { query: { status } } }),
};

export const bannersApi = {
  list: (placement: string) => api.GET("/banners", { params: { query: { placement } } }),
};

export const campaignsApi = {
  list: () => api.GET("/campaigns"),
};

export const donationsApi = {
  create: (data: any, init?: RequestInit) => api.POST("/donations", { body: data, ...(init as any) }),
  myDonations: (init?: RequestInit) => api.GET("/donations/me", init as any),
};

export const chatApi = {
  rooms: (init?: RequestInit) => api.GET("/rooms", init as any),
  create: (data: any, init?: RequestInit) => api.POST("/rooms", { body: data, ...(init as any) }),
  messages: (roomId: number, init?: RequestInit) => api.GET(`/rooms/${roomId}/messages` as any, init as any),
};

export const analyticsApi = {
  track: (eventName: string, props: any) => api.POST("/analytics/event", { body: { eventName, props } }),
};