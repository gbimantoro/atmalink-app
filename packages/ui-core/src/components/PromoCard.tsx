import React from "react";

export interface PromoCardProps {
  discount: string;
  title: string;
  partnerName: string;
  description: string;
  imageUrl?: string;
  onClaim?: () => void;
  className?: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({
  discount,
  title,
  partnerName,
  description,
  imageUrl,
  onClaim,
  className = "",
}) => {
  return (
    <div
      onClick={onClaim}
      className={`bg-white rounded-card p-3 flex items-center gap-3.5 border border-neutral-100 shadow-sm hover:shadow transition duration-200 cursor-pointer ${className}`}
    >
      {/* Visual / Discount Badge Box */}
      <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={partnerName} className="w-full h-full object-cover" />
        ) : (
          <>
            <span className="text-xs uppercase font-extrabold tracking-wider opacity-80">DISKON</span>
            <span className="text-lg font-black leading-none">{discount}</span>
          </>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-bold text-orange-600 block">{partnerName}</span>
        <h4 className="font-bold text-xs text-neutral-900 line-clamp-1">{title}</h4>
        <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">{description}</p>
      </div>

      <div className="flex-shrink-0 text-neutral-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
