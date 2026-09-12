import { useState, useEffect, useRef } from "react";

interface Banner {
  id: number;
  image_url: string;
  link_url?: string;
}

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative mx-4 mt-4 rounded-xl overflow-hidden">
      <div
        ref={containerRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <a key={banner.id} href={banner.link_url || "#"} className="w-full flex-shrink-0 block relative">
            <img
              src={banner.image_url}
              alt={`Banner ${i + 1}`}
              className="w-full h-48 object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </a>
        ))}
      </div>
      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}