# Quick Command Reference

Essential commands for working with the YWC Dashboard

---

## 🚀 First Time Setup

```bash
# Navigate to project folder
cd ywc-dashboard

# Install all dependencies
npm install

# This takes 1-2 minutes
# You only need to run this once
```

---

## 🔨 Development Commands

```bash
# Start local development server
npm run dev
# Opens at: http://localhost:5173
# Hot reload: changes appear instantly
# Press Ctrl+C to stop

# Build for production
npm run build
# Creates optimized files in dist/ folder
# This is what you deploy to Netlify

# Preview production build locally
npm run preview
# Test the built version before deploying
```

---

## 📦 Deployment Commands

### Deploy to Netlify (Option 1: CLI)
```bash
# Install Netlify CLI (one time only)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist

# Your site is live!
```

### Deploy to Netlify (Option 2: Drag & Drop)
```bash
# Build the project
npm run build

# Then go to: https://app.netlify.com/drop
# Drag the dist/ folder onto the page
# Done! Instant URL
```

---

## 🧹 Maintenance Commands

```bash
# Update dependencies (optional, run periodically)
npm update

# Check for outdated packages
npm outdated

# Clean install (if something breaks)
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist
npm run build
```

---

## 🔍 Debugging Commands

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# Run with verbose output
npm run dev -- --debug

# Check for syntax errors
npm run lint
```

---

## 📁 File Management Commands

```bash
# Count lines of code
find src -name "*.jsx" -o -name "*.js" | xargs wc -l

# List all components
ls -la src/components/

# List all utilities
ls -la src/utils/

# Show project size
du -sh .
du -sh node_modules/
du -sh dist/
```

---

## 🔄 Git Commands (If Using Version Control)

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: YWC Dashboard"

# Add remote repository
git remote add origin YOUR_GITHUB_URL

# Push to GitHub
git push -u origin main

# Check status
git status

# View commit history
git log --oneline
```

---

## 🧪 Testing Workflow

```bash
# 1. Start development server
npm run dev

# 2. Open browser to http://localhost:5173

# 3. Upload sample-data.csv from project folder

# 4. Test all features

# 5. When satisfied, build for production
npm run build

# 6. Test production build
npm run preview

# 7. Deploy
netlify deploy --prod --dir=dist
```

---

## ⚡ Quick Deploy Workflow

```bash
# Full deploy in 4 commands:
cd ywc-dashboard
npm install
npm run build
# Then drag dist/ folder to netlify.com/drop
```

---

## 🆘 Troubleshooting Commands

```bash
# Port already in use? Use different port:
npm run dev -- --port 3000

# Can't install packages? Clear cache:
npm cache clean --force
npm install

# Build failing? Check for errors:
npm run build 2>&1 | grep -i error

# Check if localhost is accessible:
curl http://localhost:5173
```

---

## 📊 Project Stats Commands

```bash
# Count total files
find . -type f | wc -l

# Count React components
find src/components -name "*.jsx" | wc -l

# Count utilities
find src/utils -name "*.js" | wc -l

# Show directory structure
tree -L 3 -I node_modules

# Show file sizes
ls -lh dist/assets/
```

---

## 🔐 Security Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Update to secure versions
npm update
```

---

## 💡 Useful Shortcuts

While dev server is running:
- `Ctrl + C` - Stop server
- `r` - Restart server
- `o` - Open in browser
- `q` - Quit

In browser dev console:
- `Ctrl + Shift + I` - Open DevTools
- `Ctrl + Shift + C` - Inspect element
- `Ctrl + Shift + R` - Hard refresh (clear cache)

---

## 📝 Notes

- Always run `npm install` after downloading the project
- Run `npm run build` before deploying
- The `dist/` folder is what you deploy (not the whole project)
- `node_modules/` is large but necessary (don't deploy it)
- Keep `sample-data.csv` for testing

---

## 🎯 Common Tasks - Quick Reference

| Task | Command |
|------|---------|
| First time setup | `npm install` |
| Start development | `npm run dev` |
| Build for deployment | `npm run build` |
| Deploy to Netlify | Drag `dist/` to netlify.com/drop |
| Update dependencies | `npm update` |
| Check for issues | `npm audit` |
| Clean reinstall | `rm -rf node_modules && npm install` |

---

## 🌐 Useful URLs

- Local development: http://localhost:5173
- Netlify Drop: https://app.netlify.com/drop
- Netlify Dashboard: https://app.netlify.com
- React docs: https://react.dev
- Vite docs: https://vitejs.dev

---

**Save this file for quick reference!**

All commands assume you're in the `ywc-dashboard/` directory.
