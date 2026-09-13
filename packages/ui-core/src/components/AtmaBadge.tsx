import React from "react";

export type BadgeVariant =
  | "active"       // Solid Green "Aktif"
  | "verified"     // Emerald/Green Verified Alumnus
  | "featured"     // Amber / Gold "Featured Job"
  | "promo"        // Orange Discount / Offer
  | "neutral"      // Subtle gray
  | "outline";     // Border only

export interface AtmaBadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AtmaBadge: React.FC<AtmaBadgeProps> = ({
  variant = "neutral",
  size = "md",
  icon,
  children,
  className = "",
}) => {
  const base = "inline-flex items-center font-semibold rounded-full select-none";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  const variantStyles = {
    active: "bg-emerald-500 text-white shadow-xs",
    verified: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    featured: "bg-amber-50 text-amber-800 border border-amber-200 font-bold",
    promo: "bg-orange-500 text-white font-bold shadow-xs",
    neutral: "bg-neutral-100 text-neutral-700",
    outline: "border border-neutral-300 text-neutral-700 bg-white",
  };

  return (
    <span className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
