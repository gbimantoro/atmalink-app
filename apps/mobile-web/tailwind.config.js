/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui-core/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006633", // Official Atma Jaya Forest Green
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#00A859", // Action Green
          600: "#008040",
          700: "#006633",
          800: "#004D26",
          900: "#00331A",
          dark: "#00331A",
          light: "#00A859",
        },
        secondary: {
          DEFAULT: "#EF5B2A", // Official PERLUNI Link Orange
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FA7343",
          500: "#EF5B2A",
          600: "#D84A1B",
          700: "#BF3B11",
          800: "#9A2F0D",
          900: "#7C260A",
        },
        atma: {
          forest: "#006633",
          action: "#00A859",
          dark: "#00331A",
          light: "#E8F5E9",
        },
        link: {
          orange: "#EF5B2A",
          dark: "#D84A1B",
          light: "#FFF7ED",
        },
        background: "#F8FAF8",
        surface: "#FFFFFF",
        "surface-subtle": "#F1F5F9",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",
        overlay: "rgba(15, 23, 42, 0.65)",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        "card-lg": "16px",
        "card-xl": "24px",
        input: "10px",
        btn: "9999px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.05)",
        "card-elevated": "0 10px 25px -5px rgba(0, 104, 55, 0.12), 0 8px 10px -6px rgba(241, 90, 36, 0.08)",
        "orange-glow": "0 8px 20px -4px rgba(241, 90, 36, 0.35)",
        "green-glow": "0 8px 20px -4px rgba(0, 168, 89, 0.35)",
        nav: "0 -4px 16px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};