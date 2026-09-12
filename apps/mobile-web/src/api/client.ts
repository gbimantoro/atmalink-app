import createClient from "openapi-fetch";
import type { paths } from "./schema";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8787";

export const api = createClient<paths>({ baseUrl: API_BASE });

// Convenience methods
export const authApi = {
  magicLink: (email: string) => api.POST("/auth/magic-link", { body: { email } }),
  verify: (token: string) => api.POST("/auth/verify", { body: { token } }),
  me: (init?: RequestInit) => api.GET("/auth/me", init),
  updateMe: (data: any, init?: RequestInit) => api.PATCH("/auth/me", { body: data, ...init }),
};

export const postsApi = {
  list: (cursor?: string, limit = 20) => api.GET("/posts", { params: { query: { cursor, limit } } }),
  create: (data: any, init?: RequestInit) => api.POST("/posts", { body: data, ...init }),
};

export const eventsApi = {
  list: () => api.GET("/events"),
  rsvp: (id: number, init?: RequestInit) => api.POST(`/events/${id}/rsvp`, init),
  unrsvp: (id: number, init?: RequestInit) => api.DELETE(`/events/${id}/rsvp`, init),
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
  create: (data: any, init?: RequestInit) => api.POST("/donations", { body: data, ...init }),
  myDonations: (init?: RequestInit) => api.GET("/donations/me", init),
};

export const chatApi = {
  rooms: (init?: RequestInit) => api.GET("/rooms", init),
  create: (data: any, init?: RequestInit) => api.POST("/rooms", { body: data, ...init }),
  messages: (roomId: number, init?: RequestInit) => api.GET(`/rooms/${roomId}/messages`, init),
};

export const analyticsApi = {
  track: (eventName: string, props: any) => api.POST("/analytics/event", { body: { eventName, props } }),
};