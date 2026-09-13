import React from "react";

export type LogoVariant = "official" | "horizontal" | "vertical" | "mark" | "white" | "icon";

export interface AtmaLinkLogoProps {
  variant?: LogoVariant;
  size?: number | string;
  className?: string;
  showTagline?: boolean;
  alt?: string;
}

/**
 * ATMALINK Logo Component
 * Renders official brand SVG assets directly from the asset suite.
 */
export const AtmaLinkLogo: React.FC<AtmaLinkLogoProps> = ({
  variant = "horizontal",
  size,
  className = "",
  showTagline = true,
  alt = "ATMALINK - Platform Alumni Unika Atma Jaya",
}) => {
  // 1. Official Full Vertical Logo (as provided in atmalink-logo.svg)
  if (variant === "official" || variant === "vertical") {
    const width = size || 160;
    return (
      <img
        src="/atmalink-logo.svg"
        alt={alt}
        width={width}
        style={{ width, height: "auto" }}
        className={`inline-block select-none object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // 2. Official Horizontal Lockup (Mark on left, Wordmark on right)
  if (variant === "horizontal") {
    const width = size || 190;
    return (
      <img
        src="/atmalink-logo-horizontal.svg"
        alt={alt}
        width={width}
        style={{ width, height: "auto" }}
        className={`inline-block select-none object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // 3. Official Mark Emblem Only (Green A + Orange Dove)
  if (variant === "mark") {
    const defaultSize = size || 44;
    return (
      <img
        src="/atmalink-mark.svg"
        alt="ATMALINK Emblem"
        width={defaultSize}
        height={defaultSize}
        style={{ width: defaultSize, height: defaultSize }}
        className={`inline-block select-none object-contain ${className}`}
        loading="lazy"
      />
    );
  }

  // 4. Official App Icon (512x512 squircle)
  if (variant === "icon") {
    const defaultSize = size || 64;
    return (
      <img
        src="/atmalink-app-icon.svg"
        alt="ATMALINK App Icon"
        width={defaultSize}
        height={defaultSize}
        style={{ width: defaultSize, height: defaultSize }}
        className={`inline-block select-none object-contain rounded-2xl shadow-sm ${className}`}
        loading="lazy"
      />
    );
  }

  // 5. Inverted White Logo (for Dark / Forest Green backdrops)
  const width = size || 180;
  return (
    <svg
      viewBox="0 0 420 100"
      width={width}
      height="auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none ${className}`}
    >
      <g transform="translate(6, 4) scale(0.78)">
        <path d="M 50 16 L 22 96 L 38 96 L 47 70 L 58 70 L 61 60 L 49 60 L 56 38 Z" fill="#FFFFFF" />
        <path d="M 64 16 L 98 96 L 82 96 L 75 74 L 66 74 L 63 64 L 79 64 L 61 22 Z" fill="#FFFFFF" />
        <path d="M 50 16 L 64 16 L 60 26 L 54 26 Z" fill="#FFFFFF" />
        <path d="M 58 46 C 54 36 52 24 58 14 C 61 22 66 30 67 36 C 65 40 62 44 58 46 Z" fill="#FFFFFF" opacity="0.85" />
        <path d="M 32 72 C 34 68 38 64 44 63 C 50 62 55 58 60 52 C 64 47 69 44 75 42 C 77 41.5 80 41 83 42 C 86 43 89 45 92 46 C 94 44 97 43 99 44 C 98 46 95 48 94 50 C 97 51 98 53 97 55 C 95 55.5 91 54 88 56 C 82 60 76 68 68 73 C 60 78 52 79 45 77 C 40 76 35 74 32 72 Z" fill="#FFFFFF" />
        <path d="M 55 56 C 60 48 68 34 82 20 C 83 23 81 28 78 32 C 84 27 89 24 94 22 C 92 27 87 32 83 36 C 88 33 93 31 96 31 C 94 35 88 40 84 43 C 80 47 72 53 66 57 Z" fill="#FFFFFF" />
        <path d="M 32 72 C 27 75 22 80 18 86 C 24 83 30 80 36 78 C 30 83 26 88 23 93 C 30 88 37 84 43 81 C 38 85 35 89 33 94 C 40 88 47 82 52 79 Z" fill="#FFFFFF" opacity="0.9" />
      </g>
      <g transform="translate(100, 52)">
        <text
          fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontSize="36"
          letterSpacing="0.5"
        >
          <tspan fill="#FFFFFF">ATMA</tspan>
          <tspan fill="#FFB088">LINK</tspan>
        </text>
      </g>
      {showTagline && (
        <g transform="translate(101, 74)">
          <text
            fontFamily="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif"
            fontWeight="500"
            fontSize="11"
            letterSpacing="0.8"
            fill="#FFFFFF"
            opacity="0.85"
          >
            Menjalin Akar, Membangun Karya Global
          </text>
        </g>
      )}
    </svg>
  );
};
