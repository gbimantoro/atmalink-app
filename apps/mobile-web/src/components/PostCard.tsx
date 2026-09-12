import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

interface Post {
  id: number;
  title: string;
  body?: string;
  media_json?: string;
  published_at: string;
  author?: { full_name?: string; avatar_url?: string };
}

export function PostCard({ post }: { post: Post }) {
  const media = post.media_json ? JSON.parse(post.media_json) : [];
  const hasImage = media.length > 0;

  return (
    <Link to={`/news/${post.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {hasImage && (
        <img src={media[0]} alt={post.title} className="w-full h-40 object-cover" loading="lazy" />
      )}
      <div className="p-4">
        <time className="text-xs text-gray-500 block mb-1">
          {formatDistanceToNow(new Date(post.published_at), { addSuffix: true, locale: id })}
        </time>
        <h3 className="font-semibold text-gray-900 line-clamp-2">{post.title}</h3>
        {post.body && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.body}</p>}
        {post.author && (
          <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
            {post.author.avatar_url && (
              <img src={post.author.avatar_url} alt="" className="w-6 h-6 rounded-full" />
            )}
            <span className="ml-2 text-xs text-gray-500">{post.author.full_name}</span>
          </div>
        )}
      </div>
    </Link>
  );
}