/**
 * ATMALINK Design System Tokens
 * Platform Alumni Universitas Katolik Indonesia Atma Jaya (PERLUNI UAJ)
 * "Menjalin Akar, Membangun Karya Global"
 */

export const tokens = {
  // Brand Identity Colors
  colors: {
    // Primary: Atma Jaya Institutional Forest & Emerald Green
    atma: {
      50: "#ECFDF5",
      100: "#D1FAE5",
      200: "#A7F3D0",
      300: "#6EE7B7",
      400: "#34D399",
      500: "#00A859", // Action Green (Buttons, Active states, Badges)
      600: "#008040",
      700: "#006633", // Official Atma Jaya Brand Forest Green (From official SVG)
      800: "#004D26",
      900: "#00331A",
      950: "#001A0D",
    },

    // Secondary Accent: PERLUNI Warm & Energetic Orange
    link: {
      50: "#FFF7ED",
      100: "#FFEDD5",
      200: "#FED7AA",
      300: "#FDBA74",
      400: "#FA7343",
      500: "#EF5B2A", // Official PERLUNI Accent Orange (From official SVG)
      600: "#D84A1B",
      700: "#BF3B11",
      800: "#9A2F0D",
      900: "#7C260A",
      950: "#431204",
    },

    // Semantic Status Colors
    semantic: {
      success: "#10B981",
      successLight: "#ECFDF5",
      warning: "#F59E0B",
      warningLight: "#FFFBEB",
      error: "#EF4444",
      errorLight: "#FEF2F2",
      info: "#2563EB",
      infoLight: "#EFF6FF",
      verified: "#00A859", // Verified Alumnus badge
    },

    // Neutral Grayscale (Slate / Zinc hybrid for optimal legibility)
    neutral: {
      0: "#FFFFFF",
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
      950: "#020617",
    },

    // UI Surface / Layout Tones
    surface: {
      background: "#F8FAF8", // Subtle warm green-tinted canvas
      card: "#FFFFFF",
      cardElevated: "#FFFFFF",
      subtle: "#F3F4F6",
      divider: "#E5E7EB",
      overlay: "rgba(15, 23, 42, 0.65)",
    },

    // Text hierarchy
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
      tertiary: "#94A3B8",
      inverse: "#FFFFFF",
      brandGreen: "#006837",
      brandOrange: "#F15A24",
    },

    // Gradients
    gradients: {
      header: "linear-gradient(135deg, #007A3D 0%, #005A2C 100%)",
      headerCurve: "linear-gradient(180deg, #F15A24 0%, #EA580C 100%)",
      alumniCard: "linear-gradient(135deg, #FFFDFB 0%, #FFF5ED 45%, #EBF8F1 100%)",
      alumniCardDark: "linear-gradient(135deg, #064E3B 0%, #006837 50%, #022C22 100%)",
      orangeCta: "linear-gradient(135deg, #FF6A13 0%, #F15A24 100%)",
      greenCta: "linear-gradient(135deg, #00A859 0%, #007A3D 100%)",
      cardBorder: "linear-gradient(135deg, rgba(241, 90, 36, 0.3) 0%, rgba(0, 104, 55, 0.3) 100%)",
    },
  },

  // Typography System
  typography: {
    fontFamily: {
      sans: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    fontSize: {
      "display": { size: "2rem", lineHeight: "2.5rem", weight: "800" }, // 32px
      "h1": { size: "1.5rem", lineHeight: "2rem", weight: "700" }, // 24px
      "h2": { size: "1.25rem", lineHeight: "1.75rem", weight: "700" }, // 20px
      "h3": { size: "1.125rem", lineHeight: "1.5rem", weight: "600" }, // 18px
      "body-lg": { size: "1rem", lineHeight: "1.5rem", weight: "400" }, // 16px
      "body-md": { size: "0.875rem", lineHeight: "1.25rem", weight: "400" }, // 14px
      "body-sm": { size: "0.75rem", lineHeight: "1rem", weight: "400" }, // 12px
      "caption": { size: "0.6875rem", lineHeight: "0.875rem", weight: "500" }, // 11px
      "button": { size: "0.9375rem", lineHeight: "1.25rem", weight: "600" }, // 15px
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
  },

  // Spacing (8pt grid with 4pt half-steps)
  spacing: {
    "3xs": "0.125rem", // 2px
    "2xs": "0.25rem",  // 4px
    "xs": "0.5rem",    // 8px
    "sm": "0.75rem",   // 12px
    "md": "1rem",      // 16px
    "lg": "1.25rem",   // 20px
    "xl": "1.5rem",    // 24px
    "2xl": "2rem",     // 32px
    "3xl": "2.5rem",   // 40px
    "4xl": "3rem",     // 48px
  },

  // Border Radius
  radii: {
    none: "0px",
    xs: "4px",
    sm: "6px",
    md: "8px",   // Inputs, secondary buttons
    lg: "12px",  // Cards, content blocks
    xl: "16px",  // Featured cards, bottom sheets
    "2xl": "24px", // Digital Alumni Card
    pill: "9999px", // Pills, badges, primary CTA buttons
    full: "50%",
  },

  // Elevation & Shadows
  shadows: {
    none: "none",
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    alumniCard: "0 10px 25px -5px rgba(0, 104, 55, 0.15), 0 8px 10px -6px rgba(241, 90, 36, 0.1)",
    orangeGlow: "0 8px 20px -4px rgba(241, 90, 36, 0.35)",
    greenGlow: "0 8px 20px -4px rgba(0, 168, 89, 0.35)",
    bottomNav: "0 -4px 16px 0 rgba(0, 0, 0, 0.06)",
  },

  // Motion & Animation
  motion: {
    duration: {
      fast: "150ms",
      normal: "250ms",
      slow: "350ms",
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
  },

  // Component Sizing Specs
  components: {
    touchTargetMin: "48px",
    headerHeight: "64px",
    bottomNavHeight: "68px",
    alumniCardAspect: "1.586", // ISO/IEC 7810 standard ID card aspect ratio
    maxMobileWidth: "440px",
  }
} as const;

export type DesignTokens = typeof tokens;
