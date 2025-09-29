# Deployment Guide - Netlify

## Quick Deployment (5 minutes)

### Method 1: Netlify Drop (Easiest - No Account Needed Initially)

1. **Build the project locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Go to Netlify Drop:**
   Visit https://app.netlify.com/drop

3. **Drag and drop:**
   Drag the entire `dist` folder onto the Netlify Drop page

4. **Done!**
   Your site is live with a random URL like `random-name-12345.netlify.app`

5. **Optional - Claim your site:**
   - Sign up for a free Netlify account
   - Claim the site from your account
   - Set a custom subdomain (e.g., `ywc-dashboard.netlify.app`)

---

### Method 2: Netlify CLI (For Ongoing Updates)

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

3. **Login to Netlify:**
   ```bash
   netlify login
   ```

4. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Your site is live!**
   Netlify will give you the URL

---

### Method 3: Git-Based Continuous Deployment (Best for Teams)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Automatic deployments:**
   - Every push to `main` branch automatically deploys
   - Pull requests get preview URLs

---

## Custom Domain Setup

### Free Netlify Subdomain
1. Go to Site settings → Domain management
2. Click "Options" → "Edit site name"
3. Choose your subdomain: `your-name.netlify.app`

### Custom Domain (yourdomain.com)
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain name
4. Follow Netlify's DNS instructions
5. SSL certificate is automatic and free!

---

## Environment Variables (Optional)

If you add any API keys or secrets later:

1. Go to Site settings → Build & deploy → Environment
2. Click "Add variable"
3. Add your key-value pairs
4. Redeploy for changes to take effect

---

## Monitoring and Analytics

### Built-in Netlify Analytics
1. Go to your site dashboard
2. Enable Netlify Analytics ($9/month)
3. See page views, popular pages, bandwidth usage

### Free Google Analytics (Alternative)
1. Get your GA4 tracking ID
2. Add it to `index.html` in the `<head>` section
3. Redeploy

---

## Troubleshooting Deployment

### Build Fails

**Problem:** "Command failed: npm run build"

**Solutions:**
- Ensure `package.json` has correct scripts
- Check Node version: Should be 18+
- Run `npm install` locally first to verify

### 404 Errors After Deployment

**Problem:** Routes don't work, getting 404

**Solution:**
- Check that `netlify.toml` exists with redirect rules
- Should redirect `/*` to `/index.html`

### Large Bundle Size Warning

**Problem:** "Large page size"

**Solution:**
- This is normal for data-heavy dashboards
- Charts and PDF libraries are large
- Consider code splitting if needed later

---

## Cost Estimate

**Netlify Free Tier includes:**
- ✅ 100GB bandwidth/month (plenty for small teams)
- ✅ Unlimited sites
- ✅ Automatic SSL
- ✅ CDN
- ✅ Form handling
- ✅ 300 build minutes/month

**This dashboard will fit comfortably in free tier for typical use!**

---

## Performance Optimization

Your site is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression (automatic on Netlify)

---

## Updating the Site

### If using Netlify Drop:
1. Make your changes locally
2. Run `npm run build`
3. Go to your site dashboard
4. Click "Deploys" → "Deploy manually"
5. Drag the new `dist` folder

### If using Git:
1. Make your changes locally
2. Commit and push to GitHub
3. Netlify automatically rebuilds and deploys!

---

## Security Considerations

✅ **This app is secure because:**
- All data processing is client-side
- No backend or database
- No user authentication needed
- No API keys or secrets
- HTTPS by default on Netlify

⚠️ **Note:** Since data is stored in browser localStorage:
- Users should not use incognito/private mode for persistent data
- Clearing browser data will delete stored indicators
- Data is not shared between devices

---

## Backup Strategy

Since this is a client-side app:
1. Users should keep their CSV files as backups
2. Consider periodic CSV exports as snapshots
3. If using Git, all code is backed up automatically

---

## Support and Maintenance

**Netlify Status:** https://www.netlifystatus.com

**Netlify Support:**
- Free tier: Community forum
- Paid tier: Email support
- Documentation: https://docs.netlify.com

---

## Next Steps After Deployment

1. ✅ Test with sample CSV file
2. ✅ Verify all features work (upload, filters, reports, PDF generation)
3. ✅ Set custom domain (if desired)
4. ✅ Share URL with team
5. ✅ Bookmark for easy access
6. ✅ Train users with Quick Start Guide

---

**Your dashboard is ready to go!** 🚀

Questions? Check the README.md for more details.
