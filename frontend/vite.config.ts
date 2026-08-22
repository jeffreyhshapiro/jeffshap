import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is deliberately split into its own chunk and loaded after the
    // hero text paints, so the warning about its size is expected.
    chunkSizeWarningLimit: 600,
  },
})
