import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages
// IMPORTANT: Change this to match your repository name EXACTLY
// 
// Find your GitHub Pages URL:
// - If it's: https://username.github.io/Budget-Report/
//   Then use: '/Budget-Report/'
// - If it's: https://username.github.io/ (user/organization pages)
//   Then use: '/'
// - If your repo has a different name, use: '/Your-Repo-Name/'
//
// REPLACE 'Budget-Report' below with your actual repository name:
const REPO_NAME = 'Budget-Report'; // ← Your repo name (matches https://singh-shobhit-alt.github.io/Budget-Report/)
const base = `/${REPO_NAME}/`; // Always use base path for GitHub Pages

export default defineConfig({
  base: base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser (faster and included by default)
  },
  server: {
    port: 5173,
  },
})
