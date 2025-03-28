import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://20.244.56.144/test/primes",  // Replace with your API
        changeOrigin: true,
        secure: false
      }
    }
  }
});
