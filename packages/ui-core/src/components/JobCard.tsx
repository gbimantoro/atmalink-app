import React from "react";
import { AtmaBadge } from "./AtmaBadge";
import { AtmaButton } from "./AtmaButton";

export interface JobCardProps {
  title: string;
  company: string;
  location: string;
  isRemote?: boolean;
  type?: string;
  tags?: string[];
  logoUrl?: string;
  featured?: boolean;
  onApply?: () => void;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  isRemote = false,
  type = "Full-time",
  tags = [],
  logoUrl,
  featured = false,
  onApply,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-card p-4 border border-neutral-100 shadow-sm hover:shadow-md transition duration-200 ${
        featured ? "ring-1 ring-amber-300 bg-amber-50/20" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Company Logo or Initial */}
          <div className="w-11 h-11 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden flex-shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={company} className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-base text-neutral-600">{company.charAt(0)}</span>
            )}
          </div>

          <div>
            {featured && (
              <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider block mb-0.5">
                ★ FEATURED JOB
              </span>
            )}
            <h4 className="font-bold text-sm text-neutral-900 leading-snug">{title}</h4>
            <p className="text-xs text-neutral-600 mt-0.5">{company} • {location}</p>
          </div>
        </div>

        {/* Apply CTA */}
        <AtmaButton variant="accent" size="sm" onClick={onApply}>
          Apply →
        </AtmaButton>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-neutral-100 flex-wrap">
        {isRemote && <AtmaBadge size="sm" variant="neutral">Remote</AtmaBadge>}
        {type && <AtmaBadge size="sm" variant="neutral">{type}</AtmaBadge>}
        {tags.map((tag, idx) => (
          <AtmaBadge key={idx} size="sm" variant="outline">{tag}</AtmaBadge>
        ))}
      </div>
    </div>
  );
};
