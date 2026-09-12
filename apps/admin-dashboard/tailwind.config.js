/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#D85826", light: "#E87542", dark: "#B8451D" },
        background: "#F8F9FA",
        surface: "#FFFFFF",
        "text-primary": "#1C1C1E",
        "text-secondary": "#8E8E93",
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};