import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration for Awesome Digital Nepal.
 *
 * - `base` is set to the repo name so that built assets resolve correctly when
 *   the site is hosted at https://raazkhnl.github.io/awesome-digital-nepal/.
 *   If you fork the project, change this to match your repo name (or set to '/'
 *   for a custom domain or a user/org root site).
 * - HashRouter is used in `App.jsx` so that GitHub Pages does not 404 on deep
 *   links — no extra rewrites or 404.html shims required.
 */
export default defineConfig({
  plugins: [react()],
  base: '/awesome-digital-nepal/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: true,
  },
})
