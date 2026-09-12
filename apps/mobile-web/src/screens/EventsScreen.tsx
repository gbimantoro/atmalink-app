import { useEffect, useState } from "react";
import { eventsApi } from "../api/client";
import { EventCard } from "../components/EventCard";
import { SectionHeader } from "../components/SectionHeader";

export function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsApi.list().then((res) => { setEvents(res.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="pb-16">
      <SectionHeader title="Event Alumni" />
      <div className="px-4 space-y-3">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
        {events.length === 0 && <p className="text-center text-gray-500 py-8">Belum ada event</p>}
      </div>
    </div>
  );
}