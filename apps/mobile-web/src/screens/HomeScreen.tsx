import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bannersApi, postsApi, eventsApi, jobsApi, campaignsApi } from "../api/client";
import { PostCard } from "../components/PostCard";
import { EventCard } from "../components/EventCard";
import { JobCard } from "../components/JobCard";
import { BannerCarousel } from "../components/BannerCarousel";
import { SectionHeader } from "../components/SectionHeader";
import { AtmaLinkLogo } from "@atmajaya/ui-core";

import { AppHeader } from "../components/AppHeader";

export function HomeScreen() {
  const { user } = useAuth();
  const [banners, setBanners] = useState<any[]>([]);
  const [whatsHappening, setWhatsHappening] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [bRes, pRes, eRes] = await Promise.all([
          bannersApi.list("home"),
          postsApi.list(undefined, 10),
          eventsApi.list(),
        ]);
        setBanners(bRes.data || []);
        // Featured posts for "What's Happening" - use posts with images
        const featured = (pRes.data || []).filter((p: any) => p.media_json && JSON.parse(p.media_json).length > 0).slice(0, 5);
        setWhatsHappening(featured);
        // Upcoming events
        const upcoming = (eRes.data || []).filter((e: any) => new Date(e.start_at) > new Date()).slice(0, 4);
        setUpcomingEvents(upcoming);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="pb-24 bg-gray-50/50 min-h-screen">
      {/* 1. Official Pure White Header with Brand Logo */}
      <AppHeader />

      {/* 2. Welcome Card & Quick Search Bar */}
      <div className="bg-white px-4 pt-4 pb-5 border-b border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">PERLUNI UAJ SuperApp</span>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              Halo, {user?.full_name?.split(" ")[0] || "Alumni Atma"} 👋
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {user?.faculty || "Fakultas Teknik"} {user?.grad_year ? `• Angkatan '${String(user.grad_year).slice(-2)}` : ""}
            </p>
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            KTA Digital
          </Link>
        </div>

        {/* Global Search Bar */}
        <Link
          to="/news"
          className="flex items-center gap-3 px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200 text-gray-400 text-sm transition-all"
        >
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="truncate">Cari alumni, lowongan, berita, atau event...</span>
        </Link>

        {/* Quick Service Icons */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-gray-100 text-center">
          <Link to="/alumni" className="flex flex-col items-center group">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1 group-hover:bg-emerald-100 transition-colors shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-gray-700">Direktori</span>
          </Link>

          <Link to="/jobs" className="flex flex-col items-center group">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1 group-hover:bg-blue-100 transition-colors shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-gray-700">Karir</span>
          </Link>

          <Link to="/donate" className="flex flex-col items-center group">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-1 group-hover:bg-rose-100 transition-colors shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-gray-700">Donasi</span>
          </Link>

          <Link to="/events" className="flex flex-col items-center group">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1 group-hover:bg-amber-100 transition-colors shadow-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[11px] font-medium text-gray-700">Event</span>
          </Link>
        </div>
      </div>

      {/* What's Happening - Horizontal Cards */}
      <div className="px-4 pt-6">
        <SectionHeader title="What's Happening" action={<Link to="/news" className="text-primary text-sm font-medium">See all &gt;</Link>} />
        <div className="mt-3">
          <div className="flex gap-3 overflow-x-auto pb-4 px-2 -mx-2">
            {whatsHappening.map((post) => {
              const media = post.media_json ? JSON.parse(post.media_json) : [];
              return (
                <Link key={post.id} to={`/news/${post.id}`} className="flex-shrink-0 w-64 relative group">
                  <div className="relative aspect-[4/3] rounded-card-lg overflow-hidden">
                    <img
                      src={media[0] || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 gradient-overlay" />
                    {post.tags_json && JSON.parse(post.tags_json).includes("sponsored") && (
                      <span className="absolute top-2 left-2 bg-white/90 text-primary text-xs font-medium px-2 py-1 rounded-full">Sponsored</span>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <time className="text-xs text-white/70 block mb-1">{new Date(post.published_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</time>
                      <h3 className="font-semibold text-sm line-clamp-2">{post.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
            {whatsHappening.length === 0 && (
              <div className="flex-shrink-0 w-64">
                <div className="aspect-[4/3] rounded-card-lg bg-surface flex items-center justify-center">
                  <span className="text-caption">Belum ada konten</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events - Vertical List */}
      <div className="px-4 pt-6">
        <SectionHeader title="Upcoming Events" action={<Link to="/events" className="text-primary text-sm font-medium">See all &gt;</Link>} />
        <div className="mt-3 space-y-3">
          {upcomingEvents.map((event) => (
            <Link key={event.id} to={`/events/${event.id}`} className="block card flex items-center gap-3 p-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface">
                {event.cover_url ? (
                  <img src={event.cover_url} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-secondary">📅</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <time className="text-caption block mb-0.5">{new Date(event.start_at).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" })}</time>
                <h3 className="font-semibold text-text-primary truncate">{event.title}</h3>
                <p className="text-caption truncate">{event.location || "Lokasi TBA"}</p>
              </div>
              <svg className="w-5 h-5 text-text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
          {upcomingEvents.length === 0 && <p className="text-center text-caption py-8">Belum ada event mendatang</p>}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pt-6 pb-8">
        <div className="grid grid-cols-3 gap-3">
          <Link to="/alumni" className="card p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span className="text-sm font-medium">Alumni</span>
          </Link>
          <Link to="/jobs" className="card p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span className="text-sm font-medium">Karir</span>
          </Link>
          <Link to="/donate" className="card p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </div>
            <span className="text-sm font-medium">Donasi</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useAuth } from "../context/AuthContext";