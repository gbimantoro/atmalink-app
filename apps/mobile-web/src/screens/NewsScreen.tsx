import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { postsApi } from "../api/client";
import { PostCard } from "../components/PostCard";
import { SectionHeader } from "../components/SectionHeader";

export function NewsScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const loadPosts = useCallback(async (append = false) => {
    if (loading || (!append && !hasMore)) return;
    setLoading(true);
    try {
      const res = await postsApi.list(cursor, 20);
      const newPosts = res.data || [];
      if (append) setPosts((p) => [...p, ...newPosts]);
      else setPosts(newPosts);
      setCursor((res as any).meta?.cursor);
      setHasMore(newPosts.length === 20);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  useEffect(() => { loadPosts(false); }, [loadPosts]);

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h1 className="text-xl font-bold">Berita & Kegiatan</h1>
        <input
          type="text"
          placeholder="Cari berita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field mt-3"
        />
      </div>

      <div className="px-4 py-4 space-y-3">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
        {posts.length === 0 && <p className="text-center text-caption py-8">Belum ada berita</p>}
        {hasMore && (
          <button
            onClick={() => loadPosts(true)}
            disabled={loading}
            className="w-full py-3 text-primary font-medium border border-primary rounded-btn"
          >
            {loading ? "Memuat..." : "Muat lebih banyak"}
          </button>
        )}
      </div>
    </div>
  );
}