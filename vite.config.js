import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages - change this to match your repository name
// If your repo is at https://username.github.io/Budget-Report/, use '/Budget-Report/'
// If your repo is at https://username.github.io/, use '/'
const base = '/Budget-Report/';

export default defineConfig({
  base: base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
