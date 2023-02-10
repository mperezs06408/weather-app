import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, '/src'),
      "@components": resolve(__dirname, '/src/components'),
      "@pages": resolve(__dirname, '/src/pages'),
      "@styles": resolve(__dirname, '/src/styles'),
    }
  },
  plugins: [react()],
})
