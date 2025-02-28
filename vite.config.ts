import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3001,
  },
  plugins: [TanStackRouterVite({}), react()],
});
