import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/auth": {
        target: "http://192.168.1.44:8000",
        changeOrigin: true,
      },
    },
  },
});
