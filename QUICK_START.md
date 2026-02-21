# Quick Start Guide - DigitalFootprint

Get up and running in **5 minutes**.

## Prerequisites

- ✅ **Node.js** 14+ (download from https://nodejs.org/)
- ✅ **npm** 6+ (comes with Node.js)
- ✅ **Windows Terminal** or **PowerShell**

## Step 1: Navigate to Project (1 minute)

```powershell
cd c:\Users\sant7\OneDrive\Desktop\Digi_Footprint
```

## Step 2: Install Dependencies (2-3 minutes)

### Backend
```powershell
cd backend
npm install
```

### Frontend (in new terminal)
```powershell
cd frontend
npm install
```

## Step 3: Start Both Servers (1 minute)

### Terminal 1 - Backend (stays running)
```powershell
cd backend
npm start
```

**Expected output:**
```
Server running on http://localhost:5000
```

### Terminal 2 - Frontend (in new terminal)
```powershell
cd frontend
npm run dev
```

**Expected output:**
```
Local:   http://localhost:5173
```

## Step 4: Open in Browser (1 minute)

Click or navigate to: **http://localhost:5173**

You should see:
- Dark theme landing page
- "Start Your Scan" button
- Top menu: Scanner, Education, Admin

## First Test Scan

1. Click **Scanner** in top menu
2. Enter test email: `test@example.com`
3. Click **Scan Email**
4. View results:
   - Accounts found (GitHub, Instagram, etc.)
   - Confidence score (%)
   - Gravatar status
   - Message: "Email breach check not configured (get free HIBP API key)"

5. Try **Download Report** → downloads CSV
6. Try **Admin** page → see scan history

## What Works Out of the Box

✅ Email scanning (platform account detection + Gravatar)
✅ Username scanning (checks 9 platforms)
✅ Phone scanning (explains limitations)
✅ Password checking (Pwned Passwords k-anonymity)
✅ CSV export (download evidence)
✅ Admin panel (view scan history)
✅ Education page (privacy tips)

## What Needs Configuration (Optional)

⚠️ **Email breach checking** — Requires free HIBP API key
- Visit: https://haveibeenpwned.com/API/v3
- Click "Free Tier" (no credit card)
- Verify your email
- Copy key → paste in Admin panel
- Restart backend

**Without it:** Email breach checking shows helpful message, but all other features work 100%.

### How to add the HIBP API key (Admin endpoint)

You can add the HIBP key via the Admin page in the app or by calling the admin API directly. After adding the key, restart the backend so the service picks it up.

PowerShell example:
```powershell
# Replace with your real key
$body = @{ key = 'YOUR_REAL_HIBP_KEY' } | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:5000/api/admin/hibp-key -Method POST -Body $body -ContentType 'application/json'

# Restart backend (if running in another terminal, stop and start again)
Get-Process node | Stop-Process -Force -ErrorAction Ignore
cd backend
npm start
```

curl example:
```bash
curl -X POST http://localhost:5000/api/admin/hibp-key \
  -H "Content-Type: application/json" \
  -d '{"key":"YOUR_REAL_HIBP_KEY"}'
```

## Common Issues

### Port Already in Use

```powershell
# Kill existing Node process
Get-Process node | Stop-Process -Force -ErrorAction Ignore

# Restart backend
cd backend
npm start
```

### Module Not Found Error

```powershell
# Reinstall dependencies
rm -r node_modules
npm install
```

### Can't Connect to Backend

Check:
1. Backend terminal shows "Server running on http://localhost:5000"
2. Frontend terminal shows "Local: http://localhost:5173"
3. No error messages in either terminal
4. Ports 5000 and 5173 are not blocked

### Scans Show "API Error"

This usually means:
- Platform API is temporarily down
- Internet connection issue
- Too many requests (rate limited)

**Solution:**
- Wait a minute and try again
- Check backend console for details
- Check https://status.github.com (if GitHub scan failing)

## Next Steps

### For Testing
- Scan your own email/username
- Try password checking
- Export and review CSV
- View scan history in Admin panel

### For Deployment (Later)
- Follow [README.md](README.md) deployment section
- Consider Render, Vercel, or Railway
- Add HIBP API key before going live

### For Customization
- Edit [frontend/src/styles/index.css](frontend/src/styles/index.css) for colors
- Modify [frontend/src/pages/EducationPage.jsx](frontend/src/pages/EducationPage.jsx) for tips
- Add more platforms in [backend/src/services/breachService.js](backend/src/services/breachService.js)

## Useful Commands

### Development
```bash
# Backend: Watch mode (auto-restart)
cd backend && npm start

# Frontend: Dev mode (hot reload)
cd frontend && npm run dev

# Both: Build for production
cd frontend && npm run build
cd backend && npm start
```

### Testing APIs (PowerShell)
```powershell
# Test backend health
Invoke-WebRequest -Uri http://localhost:5000/api/health

# Test email scan
$body = @{ email = "test@example.com" } | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:5000/api/scan/email `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

# Test admin scans list
Invoke-WebRequest -Uri http://localhost:5000/api/admin/scans
```

## Architecture Overview

```
Frontend (React + Vite)
    ↓ API calls
Backend (Express + Node.js)
    ↓ Real APIs
GitHub, Instagram, Twitter, LinkedIn, Gravatar, HIBP, etc.

Persistence: backend/data/scans.json (auto-created, no DB needed)
```

## What This System Does

1. **Scans** your email/username/phone
2. **Checks 9 real platforms** (GitHub, Instagram, Twitter, etc.)
3. **Verifies** with actual HTTP requests (not fake data)
4. **Calculates** confidence score (0-100%)
5. **Saves** each scan to history (for admins)
6. **Exports** reports as CSV
7. **Shows** honest limitations (e.g., no phone breach DB)

## What This System Does NOT Do

❌ Store personal data (scans kept for admin only)
❌ Access dark web (requires paid service)
❌ Hack anything (OSINT only - public data)
❌ Require signup (scan anonymously)
❌ Cost money (free forever)

## Support

1. Check [README.md](README.md) for detailed docs
2. Look at [API_INTEGRATION.md](API_INTEGRATION.md) for API details
3. Check browser DevTools console (F12) for errors
4. Check backend terminal for server logs
5. Review [TESTING_GUIDE.md](TESTING_GUIDE.md) for test cases

---

**That's it!** Your privacy scanner is now running.
Start scanning and let me know if you hit any issues. ✅
