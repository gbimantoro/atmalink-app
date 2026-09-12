import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@atmajaya/ui-core": path.resolve(__dirname, "../../packages/ui-core")
    }
  },
  server: { port: 3001, proxy: { "/api": "http://127.0.0.1:8787" } }
});