/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#D85826", light: "#E87542", dark: "#B8451D" },
        background: "#FFFFFF",
        surface: "#F2F2F7",
        "text-primary": "#1C1C1E",
        "text-secondary": "#8E8E93",
        overlay: "rgba(0,0,0,0.4)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
      },
      borderRadius: {
        "card": "12px",
        "card-lg": "16px",
        "input": "8px",
        "btn": "8px",
      },
      boxShadow: {
        "card": "0 2px 8px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};