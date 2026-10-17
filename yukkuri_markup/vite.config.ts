import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple'
import renderer from "vite-plugin-electron-renderer";
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: { entry: "src/electron/main.ts" },
      preload: {
        input: "src/preload/preload.ts",
        vite: {
          build: {
            rollupOptions: {
              output: {
                format: "cjs",
                entryFileNames: "preload.js"
              }
            }
          }
        }
      }
    }),
    renderer(),
  ],
  base: "./",
  build: {
    outDir: "dist-react"
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src")
    }
  }
})
