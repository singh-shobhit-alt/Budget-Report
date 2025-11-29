# GitHub Pages Deployment Guide

## Quick Fix for White Screen

If you're seeing a white screen on GitHub Pages, follow these steps:

### Step 1: Check Your Repository Name

1. Go to your GitHub repository
2. Check the repository name (e.g., `Budget-Report`)
3. Your GitHub Pages URL will be: `https://username.github.io/Budget-Report/`

### Step 2: Update Base Path

Open `vite.config.js` and update the base path:

```javascript
// If your repo is: username/Budget-Report
const base = '/Budget-Report/';

// If your repo is: username/username.github.io (user pages)
const base = '/';
```

### Step 3: Build and Deploy

**Option A: Using GitHub Actions (Recommended)**

1. Create `.github/workflows/deploy.yml` (see below)
2. Push to main branch
3. Go to Settings → Pages → Source: GitHub Actions

**Option B: Manual Deployment**

1. Run: `npm run build`
2. Go to repository Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` or `gh-pages`
5. Folder: `/docs` or `/dist`

If using `/docs` folder, update `vite.config.js`:
```javascript
build: {
  outDir: 'docs',  // Change from 'dist' to 'docs'
}
```

### Step 4: Verify

1. Wait 1-2 minutes for GitHub Pages to update
2. Check browser console (F12) for errors
3. Check Network tab to see if assets are loading

## Common Issues

### White Screen
- **Cause**: Wrong base path
- **Fix**: Update `base` in `vite.config.js` to match your repo name

### 404 Errors
- **Cause**: Assets not found
- **Fix**: Ensure base path includes trailing slash: `/Budget-Report/`

### JavaScript Errors
- **Cause**: Build issues or missing dependencies
- **Fix**: 
  1. Delete `node_modules` and `package-lock.json`
  2. Run `npm install`
  3. Run `npm run build`
  4. Check `dist` folder has all files

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
```

## Testing Locally

Test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173/Budget-Report/` (adjust path to match your base)


