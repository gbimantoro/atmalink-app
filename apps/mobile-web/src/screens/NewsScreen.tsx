import React, { useState, useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { PERLUNI_NEWS, PerluniNewsItem } from "../data/perluniData";
import { postsApi } from "../api/client";

export function NewsScreen() {
  const [posts, setPosts] = useState<PerluniNewsItem[]>(PERLUNI_NEWS);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("Semua");

  useEffect(() => {
    postsApi.list(undefined, 20).then((res) => {
      if (res.data && res.data.length > 0) {
        const merged = res.data.map((p: any, i: number) => ({
          ...PERLUNI_NEWS[i % PERLUNI_NEWS.length],
          id: p.id,
          title: p.title || PERLUNI_NEWS[i % PERLUNI_NEWS.length].title,
          body: p.body || PERLUNI_NEWS[i % PERLUNI_NEWS.length].body,
        }));
        setPosts(merged);
      }
    }).catch(() => {});
  }, []);

  const tags = ["Semua", "@perluni.uaj", "DiesNatalis66", "BeasiswaAbadi", "PelantikanKomda", "PERLUNIPeduli", "TechForum"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase());
    const postTags: string[] = post.tags_json ? JSON.parse(post.tags_json) : [];
    const matchesTag = selectedTag === "Semua" || postTags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* 1. Pure White Header */}
      <AppHeader
        title="Berita & Kegiatan"
        showSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari berita atau pengumuman alumni..."
      />

      {/* Tag Filters with Elevated Pills */}
      <div className="bg-white px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? "bg-primary text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* News Feed List with Visual Depth & Shadows */}
      <div className="p-4 space-y-4">
        {filteredPosts.map((post) => {
          const media = post.media_json ? JSON.parse(post.media_json) : [];
          const postTags: string[] = post.tags_json ? JSON.parse(post.tags_json) : [];

          return (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {media.length > 0 && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={media[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {postTags.slice(0, 2).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Instagram @perluni.uaj
                  </span>
                  <time>
                    {new Date(post.published_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <h2 className="text-sm font-bold text-gray-900 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {post.body}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.full_name}
                      className="w-5 h-5 rounded-full border border-emerald-200"
                    />
                    <span className="text-xs text-gray-600 font-medium truncate max-w-[180px]">
                      {post.author.full_name}
                    </span>
                  </div>

                  <a
                    href="https://www.instagram.com/perluni.uaj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Buka di IG ↗
                  </a>
                </div>
              </div>
            </article>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-6">
            <p className="text-sm text-gray-500">Tidak ada berita yang cocok dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
}