# Budget Report

A React-based budget tracking and expense management application with team member expense sheets, visualizations, and invoice generation.

## Features

- 📊 Budget tracking dashboard
- 👥 Team member expense management
- 📈 Interactive pie chart visualization
- 🧾 Invoice/claim slip generation
- 🔐 Login authentication for editing
- 💾 Auto-save to localStorage
- 🖨️ Print functionality

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment to GitHub Pages

1. Update `vite.config.js` - change the `base` path to match your repository name:
   - If repo is `username/Budget-Report`, use `'/Budget-Report/'`
   - If repo is `username/username.github.io`, use `'/'`

2. Build the project:
```bash
npm run build
```

3. Deploy the `dist` folder to GitHub Pages:
   - Go to repository Settings → Pages
   - Select source: GitHub Actions (recommended) or deploy from branch
   - The GitHub Actions workflow will automatically deploy on push to main

## Default Login Credentials

- **User ID:** `admin`
- **Password:** `qwerty@12345`

## Technologies

- React 18
- Vite
- Tailwind CSS
- Recharts
- Lucide React Icons

