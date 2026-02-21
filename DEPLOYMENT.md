# Deployment & Startup Guide

Complete instructions for going from local development to production deployment.

## Phase 1: Local Development (Verify Everything Works)

### Start Servers
```bash
# Terminal 1: Backend
cd backend
npm start
# Should show: "Server running on http://localhost:5000"

# Terminal 2: Frontend
cd frontend
npm run dev
# Should show: "Local: http://localhost:5173"
```

### Test Core Features
✅ http://localhost:5173/scanner → Email scan
✅ http://localhost:5173/admin → View scan history
✅ http://localhost:5173/education → Education page
✅ CSV export works
✅ Scan appears in admin history

### (Optional) Add HIBP API Key

1. Get free key: https://haveibeenpwned.com/API/v3 → "Free Tier"
2. Admin panel: http://localhost:5173/admin
3. Paste key in "HIBP API Key" input
4. Click "Save & Persist to .env"
5. Restart backend: `npm start`
6. Email scans now show real breach data

---

## Phase 2: Build for Production

### Frontend Build
```bash
cd frontend
npm run build
# Creates: frontend/dist/ folder (ready to deploy)
```

### Backend Preparation
No build needed for Node.js, but verify:
```bash
cd backend
npm install --production  # Removes dev dependencies (optional)
```

---

## Phase 3: Deploy Frontend (3 Options)

### Option A: Vercel (Easiest - 5 min)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Create Vercel account:** https://vercel.com
3. **Import project:**
   - Click "New Project"
   - Select your GitHub repo
   - Root directory: `frontend`
   - Framework: Vite
   - Deploy
4. **Set environment variables:**
   - In Vercel dashboard: Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

**Result:** Your frontend is live at `https://your-site.vercel.app`

### Option B: Netlify (Also Easy - 5 min)

1. **Push to GitHub** (same as above)
2. **Create Netlify account:** https://netlify.com
3. **Deploy:**
   - Click "Add New Site"
   - Select your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy
4. **Set environment variables:**
   - Site settings → Build & Deploy → Environment
   - Add: `VITE_API_URL` = `https://your-backend-url.com`

**Result:** Your frontend is live at `https://your-site.netlify.app`

### Option C: Manual Server (AWS, GCP, etc.)

1. **Build:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload `dist/` folder to:**
   - AWS S3 + CloudFront
   - Google Cloud Storage
   - Any web server (Apache, Nginx)

3. **Configure web server to serve `index.html` for all routes** (SPA requirement)

---

## Phase 4: Deploy Backend (3 Options)

### Option A: Render (Easiest - 10 min)

1. **Create Render account:** https://render.com
2. **Create new Web Service:**
   - Connect GitHub repo
   - Choose Node.js
3. **Configure:**
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free tier OK for MVP
4. **Set environment variables:**
   - In Render dashboard: Environment
   - Add:
     ```
     NODE_ENV=production
     PORT=5000
     HIBP_API_KEY=your_key_here (if you have one)
     ```
5. **Deploy:** Click "Create Web Service"

**Result:** Your backend is live at `https://your-app.onrender.com`

### Option B: Railway (Also Easy - 10 min)

1. **Create Railway account:** https://railway.app
2. **Create new project:**
   - Select "GitHub Repo"
   - Choose your repo
3. **Configure:**
   - Root directory: `backend`
4. **Set environment variables:**
   - In Railway: Variables
   - Add: `NODE_ENV=production`, `HIBP_API_KEY=...`
5. **Deploy:** Railway auto-deploys on push

**Result:** Your backend is live at `https://your-app-production.up.railway.app`

### Option C: Heroku (Classic, but free tier ended)

If you prefer Heroku (paid):
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create your-app-name

# Set config
heroku config:set NODE_ENV=production HIBP_API_KEY=your_key

# Deploy
git push heroku main
```

---

## Phase 5: Connect Frontend to Backend

### Update Frontend API URL

**File:** `frontend/src/utils/api.js`

Change:
```javascript
const API_URL = 'http://localhost:5000';  // ❌ Local only
```

To (for deployed backend):
```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
```

### Set Environment Variable

**Vercel:**
- Settings → Environment Variables
- `VITE_API_URL=https://your-backend.onrender.com`

**Netlify:**
- Site settings → Build & Deploy → Environment
- `VITE_API_URL=https://your-backend.onrender.com`

**Redeploy frontend** after setting env var.

---

## Phase 6: Finalize & Monitor

### Test Production App

1. Open your live frontend URL
2. Scanner page → Scan test email
3. Admin page → Verify scan history
4. Education page → Verify content loads
5. Test CSV export

### Enable CORS (if needed)

**File:** `backend/src/index.js`

```javascript
const corsOptions = {
  origin: 'https://your-site.vercel.app',  // ← Update this
  credentials: true
};

app.use(cors(corsOptions));
```

### Check Server Logs

- **Render:** Click app → Logs
- **Railway:** Click app → Logs
- **Vercel:** Click deployment → Logs

### Monitor Uptime

- Uptime monitoring: UptimeRobot (free, monitors 50 URLs)
- Error tracking: Sentry (free tier available)

---

## Phase 7: Claim Your Startup

### Domain Name
- Get `.com` from Namecheap or GoDaddy (~$10/year)
- Point DNS to Vercel/Netlify

### Custom Domain Setup

**Vercel:**
1. Settings → Domains
2. Add your domain
3. Add DNS records (Vercel shows them)

**Netlify:**
1. Domain settings → Add custom domain
2. Update DNS at registrar

### Branding
- Update logo in `frontend/src/App.jsx`
- Change site title in `frontend/index.html`
- Customize colors in `frontend/tailwind.config.js`

---

## Phase 8: Scale As You Grow

### When You Need Authentication
```bash
npm install jsonwebtoken bcryptjs
# Update scanController.js to require JWT token
```

### When You Need Database
```bash
# Option 1: MongoDB (Atlas free tier)
npm install mongoose

# Option 2: PostgreSQL
npm install pg
```

### When You Have Traffic
- Upgrade Render/Railway to paid plan
- Add caching layer (Redis)
- Optimize database queries

### When You Get HIBP Budget
1. Upgrade to paid HIBP API
2. Paste key in admin panel
3. Restart backend
4. Email breach checking activates automatically

---

## Production Checklist

Before going live:

- [ ] Both servers start without errors locally
- [ ] Email/username/password scanning works
- [ ] CSV export works
- [ ] Email scan saves to scan history
- [ ] Frontend builds successfully (`npm run build`)
- [ ] No console errors in browser DevTools
- [ ] Backend starts with all dependencies installed
- [ ] Environment variables set in deployment platform
- [ ] Frontend points to correct backend URL
- [ ] CORS configured for your domain
- [ ] Scan history persists across restarts
- [ ] Rate limiting active (password: 10/min, platform: 30/min)
- [ ] Admin panel loads and shows scan history
- [ ] CSV download works (desktop test)
- [ ] Mobile responsive (check on phone)
- [ ] Education page loads without errors
- [ ] Landing page has correct CTA links

---

## Troubleshooting Deployment

### Frontend Won't Load

**Error:** Blank page or 404
- Check browser console (F12)
- Verify `VITE_API_URL` environment variable is set
- Check Vercel/Netlify deployment logs

**Fix:**
```bash
# Rebuild locally
cd frontend
npm run build

# Preview locally
npm run preview
```

### Backend API Calls Fail

**Error:** "CORS error" or "Network error"
- Check `corsOptions.origin` in `backend/src/index.js`
- Verify environment variables set in deployment
- Check backend logs for errors

**Fix:**
```bash
# Restart backend
npm start

# Check logs
# Should see: "Server running on http://localhost:5000"
```

### Scans Not Persisting

**Problem:** Admin page shows empty history
- File-based storage may not persist on some platforms
- Need to migrate to MongoDB/PostgreSQL for production

**Quick fix (local):**
```bash
# Verify file exists
ls backend/data/scans.json

# Check contents
cat backend/data/scans.json
```

### Rate Limiting Too Strict

**Error:** "Too many requests" after few scans
- Increase limits in `backend/src/utils/rateLimiters.js`
- Consider disabling for internal testing

### HIBP Key Not Working

**Error:** "Unauthorized" or "Invalid key"
- Verify key was copied exactly (no spaces)
- Check HIBP API status: https://status.haveibeenpwned.com
- Free tier has rate limits (1 req/sec)

---

## Cost Summary

| Service | Tier | Cost/Month | Use |
|---------|------|----------|-----|
| Vercel | Free | $0 | Frontend hosting |
| Render | Free | $0 | Backend hosting (sleeps after 15 min inactivity) |
| Railway | Free | $0 | Alternative backend |
| Domain | .com | ~$10/year | Custom domain |
| HIBP API | Free | $0 | Email breach checking |
| **Total** | **MVP** | **~$1/month** | **All features** |

**Note:** Free tiers have limitations:
- Render/Railway may sleep after inactivity → use paid tier ($5-7/month) for always-on
- Consider paying for backend once you have traffic

---

## Next Steps

1. **Test locally** (QUICK_START.md)
2. **Deploy frontend** (Option A: Vercel - 5 min)
3. **Deploy backend** (Option A: Render - 10 min)
4. **Connect them** (update VITE_API_URL)
5. **Test production** (scan, export, admin)
6. **Get domain** (Namecheap ~$10/year)
7. **Claim it** (add to Vercel/Netlify DNS)
8. **Launch!** (share with friends)

---

**Your privacy scanner is production-ready. Good luck! 🚀**
