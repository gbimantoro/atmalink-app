import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { bannersApi, postsApi, eventsApi } from "../api/client";
import { AtmaLinkLogo } from "@atmajaya/ui-core";
import { PERLUNI_NEWS, PERLUNI_EVENTS, PerluniNewsItem, PerluniEventItem } from "../data/perluniData";

export function HomeScreen() {
  const { user } = useAuth();
  const [newsList, setNewsList] = useState<PerluniNewsItem[]>(PERLUNI_NEWS);
  const [eventsList, setEventsList] = useState<PerluniEventItem[]>(PERLUNI_EVENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Optionally merge with live API if available
    Promise.all([postsApi.list(undefined, 10), eventsApi.list()])
      .then(([pRes, eRes]) => {
        if (pRes.data && pRes.data.length > 0) {
          const apiNews = pRes.data.map((p: any, i: number) => ({
            ...PERLUNI_NEWS[i % PERLUNI_NEWS.length],
            id: p.id,
            title: p.title || PERLUNI_NEWS[i % PERLUNI_NEWS.length].title,
            body: p.body || PERLUNI_NEWS[i % PERLUNI_NEWS.length].body,
          }));
          setNewsList(apiNews);
        }
        if (eRes.data && eRes.data.length > 0) {
          const apiEvents = eRes.data.map((e: any, i: number) => ({
            ...PERLUNI_EVENTS[i % PERLUNI_EVENTS.length],
            id: e.id,
            title: e.title || PERLUNI_EVENTS[i % PERLUNI_EVENTS.length].title,
            location: e.location || PERLUNI_EVENTS[i % PERLUNI_EVENTS.length].location,
          }));
          setEventsList(apiEvents);
        }
      })
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50/60 min-h-screen">
      {/* 1. Restored Curved Orange Hero Header (As Previously Loved) */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#EF5B2A] to-[#D64417]"
          style={{ clipPath: "ellipse(100% 80% at 50% 0%)" }}
        />
        <div className="relative px-6 pt-10 pb-16">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-white/80 text-xs font-semibold tracking-wider uppercase block mb-0.5">
                PERLUNI UAJ SuperApp
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight leading-none">
                Welcome Home,
              </h1>
              <p className="text-white text-lg font-bold mt-1 opacity-95">
                {user?.full_name || "Alumni Atma Jaya"}
              </p>
            </div>
            {/* White Squircle Box with Official AtmaLink Mark Logo */}
            <div className="w-14 h-14 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-xl border border-white/40 transform active:scale-95 transition-transform">
              <AtmaLinkLogo variant="mark" size={38} />
            </div>
          </div>

          {/* Search Bar - Frosted Glass Container */}
          <Link
            to="/news"
            className="block bg-white/20 hover:bg-white/25 active:scale-99 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 text-white transition-all shadow-inner border border-white/25"
          >
            <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-white/85 text-sm font-medium truncate">
              Cari berita, agenda kegiatan, atau alumni...
            </span>
          </Link>
        </div>
      </div>

      {/* NO DUPLICATE MENU (Direktori, Karir, Donasi, Event, Alumni). Navigation is strictly handled via Bottom Navigation Bar */}

      {/* 2. What's Happening - Berita Resmi Instagram @perluni.uaj (5 News) */}
      <div className="px-4 pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight">What's Happening</h2>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              @perluni.uaj
            </span>
          </div>
          <Link to="/news" className="text-primary hover:text-primary-light text-xs font-bold transition-colors">
            Lihat Semua &gt;
          </Link>
        </div>

        {/* Horizontal Card Carousel with Visual Depth & Shadows */}
        <div className="flex gap-3.5 overflow-x-auto pb-4 px-1 -mx-1 scrollbar-none">
          {newsList.map((post) => {
            const media = post.media_json ? JSON.parse(post.media_json) : [];
            const tags = post.tags_json ? JSON.parse(post.tags_json) : [];
            return (
              <Link
                key={post.id}
                to={`/news`}
                className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-200 group active:scale-98"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={media[0]}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-emerald-600/90 text-white text-[10px] font-bold rounded-lg shadow-sm">
                    {tags[0] || "@perluni.uaj"}
                  </span>
                  <span className="absolute bottom-2.5 left-3 right-3 text-white">
                    <time className="text-[11px] text-white/80 block mb-0.5">
                      {new Date(post.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <h3 className="font-bold text-xs line-clamp-2 leading-snug drop-shadow-xs">
                      {post.title}
                    </h3>
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {post.body}
                  </p>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                    <span className="font-semibold text-primary">Baca selengkapnya</span>
                    <span className="text-[10px] text-gray-400">Instagram PERLUNI</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. Upcoming Events - Agenda Kegiatan Resmi @perluni.uaj (5 Events) */}
      <div className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base font-extrabold text-gray-900 tracking-tight">Upcoming Events</h2>
            <span className="text-[11px] font-bold text-primary bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              Agenda PERLUNI
            </span>
          </div>
          <Link to="/events" className="text-primary hover:text-primary-light text-xs font-bold transition-colors">
            Lihat Semua &gt;
          </Link>
        </div>

        {/* Vertical Event Cards with Depth and Elevated Borders */}
        <div className="space-y-3">
          {eventsList.map((event) => {
            const dateObj = new Date(event.start_at);
            return (
              <Link
                key={event.id}
                to={`/events`}
                className="block bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-99"
              >
                <div className="flex items-start gap-3">
                  {/* Event Thumbnail with Date Badge */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <img src={event.cover_url} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-1 left-1 bg-black/75 backdrop-blur-xs text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {event.category.split(" ")[0]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <time className="text-[11px] font-bold text-primary">
                        📅 {dateObj.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </time>
                      <span className="text-[10px] font-semibold text-gray-400">
                        {event.rsvp_count} Hadir
                      </span>
                    </div>

                    <h3 className="font-bold text-xs text-gray-900 leading-snug mt-1 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-[11px] text-gray-500 mt-1 truncate flex items-center gap-1">
                      <span>📍</span>
                      <span className="truncate">{event.location}</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}