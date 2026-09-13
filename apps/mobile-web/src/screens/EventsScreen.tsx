import React, { useState, useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { PERLUNI_EVENTS, PerluniEventItem } from "../data/perluniData";
import { eventsApi } from "../api/client";
import { useAuth } from "../context/AuthContext";

export function EventsScreen() {
  const { user } = useAuth();
  const [events, setEvents] = useState<PerluniEventItem[]>(PERLUNI_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [rsvpedIds, setRsvpedIds] = useState<number[]>([1]); // Event 1 pre-RSVP'd for demo

  useEffect(() => {
    eventsApi.list().then((res) => {
      if (res.data && res.data.length > 0) {
        const merged = res.data.map((e: any, i: number) => ({
          ...PERLUNI_EVENTS[i % PERLUNI_EVENTS.length],
          id: e.id,
          title: e.title || PERLUNI_EVENTS[i % PERLUNI_EVENTS.length].title,
          description: e.description || PERLUNI_EVENTS[i % PERLUNI_EVENTS.length].description,
          location: e.location || PERLUNI_EVENTS[i % PERLUNI_EVENTS.length].location,
        }));
        setEvents(merged);
      }
    }).catch(() => {});
  }, []);

  const categories = ["Semua", "Olahraga & Charity", "Olahraga & Komunitas", "Reuni & Gathering", "Karir & Mentoring", "Webinar & Edukasi"];

  const handleToggleRsvp = (eventId: number) => {
    if (rsvpedIds.includes(eventId)) {
      setRsvpedIds((prev) => prev.filter((id) => id !== eventId));
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, rsvp_count: e.rsvp_count - 1 } : e))
      );
    } else {
      setRsvpedIds((prev) => [...prev, eventId]);
      setEvents((prev) =>
        prev.map((e) => (e.id === eventId ? { ...e, rsvp_count: e.rsvp_count + 1 } : e))
      );
    }
  };

  const filteredEvents = events.filter((e) =>
    selectedCategory === "Semua" ? true : e.category === selectedCategory
  );

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 1. Header with Clean White Background */}
      <AppHeader title="Agenda Kegiatan Alumni" />

      {/* Category Pills */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-primary text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Feed with Elevated Cards & Depth */}
      <div className="p-4 space-y-4">
        {filteredEvents.map((event) => {
          const startDate = new Date(event.start_at);
          const endDate = new Date(event.end_at);
          const isAttending = rsvpedIds.includes(event.id);

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Event Cover Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <img
                  src={event.cover_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                    {event.category}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-sm">
                    @perluni.uaj
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                  <span>📅</span>
                  <span>
                    {startDate.toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>
                    {startDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
                  </span>
                </div>

                <h2 className="text-sm font-bold text-gray-900 leading-snug">
                  {event.title}
                </h2>

                <p className="text-xs text-gray-600 mt-1.5 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100">
                  <span className="flex-shrink-0">📍</span>
                  <span className="truncate">{event.location}</span>
                </div>

                {/* Bottom Action Row */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-gray-700">
                      {event.rsvp_count.toLocaleString()} alumni hadir
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleRsvp(event.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                      isAttending
                        ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-primary hover:bg-primary/95 text-white"
                    }`}
                  >
                    {isAttending ? "✓ Hadir (Batal?)" : "+ Hadiri Event"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500">Tidak ada agenda kegiatan di kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}