import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";
import { eventsApi } from "../api/client";

interface Event {
  id: number;
  title: string;
  description?: string;
  start_at: string;
  end_at?: string;
  location?: string;
  cover_url?: string;
  rsvp_count: number;
}

export function EventCard({ event }: { event: Event }) {
  const { user } = useAuth();
  const [rsvped, setRsvped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRsvp = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (rsvped) {
        await eventsApi.unrsvp(event.id);
        setRsvped(false);
      } else {
        await eventsApi.rsvp(event.id);
        setRsvped(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const startDate = new Date(event.start_at);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {event.cover_url && <img src={event.cover_url} alt={event.title} className="w-full h-40 object-cover" />}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>📅</span>
          <span>{format(startDate, "EEEE, d MMMM yyyy", { locale: id })}</span>
          {event.end_at && <span>• {format(new Date(event.end_at), "HH:mm", { locale: id })}</span>}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
        {event.location && <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">📍 {event.location}</p>}
        {event.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{event.rsvp_count} hadir</span>
          <button
            onClick={handleRsvp}
            disabled={loading}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              rsvped
                ? "bg-gray-100 text-gray-700"
                : "bg-primary text-white hover:bg-primary-light"
            }`}
          >
            {loading ? "..." : rsvped ? "Batal" : "Hadir"}
          </button>
        </div>
      </div>
    </div>
  );
}