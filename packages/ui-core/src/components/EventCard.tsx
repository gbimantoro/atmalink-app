import React from "react";
import { AtmaButton } from "./AtmaButton";

export interface EventCardProps {
  day: string | number;
  month: string;
  title: string;
  location: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  day,
  month,
  title,
  location,
  actionText = "Reservasi Now",
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-card p-3.5 flex items-center justify-between border border-neutral-100 shadow-sm hover:shadow transition duration-200 ${className}`}
    >
      <div className="flex items-center gap-3.5">
        {/* Date Box: Bold number + month pill */}
        <div className="flex flex-col items-center justify-center w-12 h-14 rounded-lg bg-orange-50/80 border border-orange-100 flex-shrink-0">
          <span className="text-lg font-black text-[#F15A24] leading-tight">{day}</span>
          <span className="text-[10px] uppercase font-bold text-[#F15A24] tracking-wider">{month}</span>
        </div>

        {/* Event Meta */}
        <div>
          <h4 className="font-bold text-sm text-neutral-900 line-clamp-1">{title}</h4>
          <div className="flex items-center gap-1 mt-0.5 text-neutral-500 text-xs">
            <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-shrink-0 pl-2">
        <AtmaButton variant="accent" size="sm" onClick={onAction}>
          {actionText}
        </AtmaButton>
      </div>
    </div>
  );
};
