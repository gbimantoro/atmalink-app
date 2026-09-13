import React from "react";

export type ButtonVariant =
  | "primary"        // Solid Atma Green pill (e.g. "Daftar")
  | "secondary"      // White pill with subtle border (e.g. "Masuk")
  | "accent"         // Solid PERLUNI Orange pill (e.g. "Reservasi Now", "Apply ->")
  | "outline-green"  // Outline with Atma Green stroke
  | "outline-orange" // Outline with Orange stroke
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface AtmaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const AtmaButton: React.FC<AtmaButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-full gap-1.5 min-h-[36px]",
    md: "px-5 py-2.5 text-sm rounded-full gap-2 min-h-[44px]",
    lg: "px-6 py-3.5 text-base rounded-full gap-2.5 min-h-[50px]",
  };

  const variantStyles = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow focus:ring-emerald-500",
    secondary:
      "bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 shadow-sm focus:ring-neutral-400",
    accent:
      "bg-[#F15A24] hover:bg-[#EA580C] text-white shadow-sm hover:shadow-md focus:ring-orange-400 shadow-orange-500/20",
    "outline-green":
      "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500",
    "outline-orange":
      "border border-[#F15A24] text-[#F15A24] hover:bg-orange-50 focus:ring-orange-400",
    ghost:
      "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-400",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};
