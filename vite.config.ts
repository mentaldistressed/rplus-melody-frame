import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    allowedHosts: ['rpluslb.ru', '0f31f3a0-944b-401d-a322-8385570dd2c3.lovableproject.com', 'where.d1.test.destinations.yandex2go.cookie.kitchen-helper.fye.rpluslb.ru'],
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
