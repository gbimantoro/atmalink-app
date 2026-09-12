import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { chatApi } from "../api/client";

export function ChatScreen() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    chatApi.rooms().then((res) => { setRooms(res.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, [user]);

  const createDirectChat = async (otherId: number) => {
    // In a real app, you'd search for users and create DM
    // For now, navigate to a placeholder
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="pb-16">
      <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pesan</h1>
        <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center" onClick={() => createDirectChat(0)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      <div className="space-y-1 px-3 py-3">
        {rooms.map((room) => (
          <Link key={room.id} to={`/chat/${room.id}`} className="block bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {room.type === "group" ? (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4-4-4v12zm-2-12L7 10l4 4V4z"/></svg>
              ) : (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{room.name || room.members?.[0]?.full_name || "Chat"}</p>
              <p className="text-sm text-gray-500 truncate">{room.last_message?.content || "Belum ada pesan"}</p>
            </div>
            {room.last_message && (
              <time className="text-xs text-gray-400 whitespace-nowrap">{new Date(room.last_message.sent_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</time>
            )}
          </Link>
        ))}
        {rooms.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            <p>Belum ada percakapan</p>
            <p className="text-sm">Mulai chat dengan alumni lain</p>
          </div>
        )}
      </div>
    </div>
  );
}