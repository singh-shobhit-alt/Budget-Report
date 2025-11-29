import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages
// IMPORTANT: Change this to match your repository name
// If your repo URL is: https://username.github.io/Budget-Report/
// Then use: '/Budget-Report/'
// If your repo URL is: https://username.github.io/ (user pages)
// Then use: '/'
const base = process.env.NODE_ENV === 'production' ? '/Budget-Report/';

export default defineConfig({
  base: base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    port: 5173,
  },
})
