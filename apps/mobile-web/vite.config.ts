import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "PERLUNI UAJ Alumni",
        short_name: "PERLUNI",
        description: "Komunitas Alumni Universitas Katolik Atma Jaya Jakarta",
        theme_color: "#003366",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@atmajaya/ui-core": path.resolve(__dirname, "../../packages/ui-core/src")
    }
  },
  server: { port: 3000, proxy: { "/api": "http://127.0.0.1:8787" } }
});