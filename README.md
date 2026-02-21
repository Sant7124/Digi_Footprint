# DigitalFootprint - Privacy Scanner

**Know What The Internet Knows About You**

A **100% genuine, free-to-start** privacy scanner for students & startups. Check if your personal info is exposed online using **real, verifiable APIs**—no fake data, no hidden fees.

## ✨ What Makes This Different

- ✅ **Real Data Only** — No fake profiles or simulated breaches
- ✅ **Verifiable** — Click links and confirm accounts yourself
- ✅ **Free Forever** — No charges to run, host, or deploy
- ✅ **Honest About Limits** — Clearly explains what can/cannot be checked
- ✅ **Student-Friendly** — Simple file-based storage (no expensive DB)
- ✅ **Admin Ready** — Manage settings & view scan history via dashboard

## 🎯 Features

### ✅ What We Check (with Real APIs)
- **Platform Accounts** — GitHub, Instagram, Twitter/X, LinkedIn, Reddit, TikTok, YouTube, Pinterest, Twitch
- **Gravatar** — Detects if your email is linked to a public avatar
- **Pwned Passwords** — Checks password leaks via HIBP k-anonymity (safe, no full password sent)
- **Email Breaches** — When HIBP API key is configured (get free tier at haveibeenpwned.com)
- **Confidence Scoring** — 0–100% based on verifiable signals only

### ⚠️ What We Honestly Can't Check (Without Budget)
- **Phone Breaches** — No free public database exists; we explain why
- **Dark Web Data** — Requires paid monitoring service

### 🚀 User Features
- **Real-time Scanning** — Check email, username, phone, password
- **Visual Results** — Confidence bars, platform links, breach timeline
- **CSV Export** — Download raw evidence for audits or sharing
- **Scan History** — Persistent records of all scans (for admins)
- **Admin Panel** — Manage HIBP API key and view usage trends

### 📚 Educational Content
- Privacy & security best practices
- Explanation of common threats
- Guidance on dealing with breaches
- Links to helpful resources

## 📁 Project Structure

```
DigitalFootprint/
├── backend/                 # Node.js/Express server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── scanController.js     # Scan logic (email, username, phone, password)
│   │   │   └── adminController.js    # Admin endpoints (config, HIBP key, history)
│   │   ├── routes/
│   │   │   ├── scanRoutes.js         # /api/scan/* endpoints
│   │   │   └── adminRoutes.js        # /api/admin/* endpoints
│   │   ├── services/
│   │   │   └── breachService.js      # Real API calls (platform checks, HIBP, Gravatar)
│   │   ├── utils/
│   │   │   ├── db.js                 # File-based JSON persistence
│   │   │   ├── rateLimiters.js       # Rate limiting middleware
│   │   │   └── riskCalculator.js     # Confidence scoring logic
│   │   ├── data/
│   │   │   └── scans.json            # Persisted scan history (auto-created)
│   │   └── index.js                  # Express server setup
│   ├── package.json
│   └── .env                          # Environment config (HIBP_API_KEY, PORT, etc.)
│
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Home with CTA
│   │   │   ├── ScannerPage.jsx       # Input forms (email, username, phone, password)
│   │   │   ├── ResultsPage.jsx       # Scan results, evidence, CSV export
│   │   │   ├── EducationPage.jsx     # Privacy tips & resources
│   │   │   └── AdminPage.jsx         # Admin dashboard (HIBP key + scan history)
│   │   ├── components/               # Reusable components (ExposureScore, AccountDiscovery, etc.)
│   │   ├── hooks/
│   │   │   └── useScan.js            # Scan API hook
│   │   ├── utils/
│   │   │   └── api.js                # Axios instance
│   │   ├── styles/
│   │   │   └── index.css             # Tailwind + custom styles
│   │   ├── App.jsx                   # Router with all routes
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

## 🚀 Quick Start

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- **Node.js** 14+ (download from https://nodejs.org/)
- **npm** 6+ (included with Node.js)
- **Windows Terminal** (or PowerShell)

### Step 1: Install Dependencies

```bash
# Navigate to project
cd c:\Users\sant7\OneDrive\Desktop\Digi_Footprint

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (in new terminal)
cd ../frontend
npm install
```

### Step 2: Start Both Servers

**Terminal 1 - Backend (Port 5000):**
```bash
cd backend
npm start
# Expected output: "Server running on http://localhost:5000"
```

**Terminal 2 - Frontend (Port 5173):**
```bash
cd frontend
npm run dev
# Expected output: "Local: http://localhost:5173"
```

### Step 3: Open in Browser
Navigate to http://localhost:5173

**You should see:**
- Landing page with "Start Your Scan" button
- Navigation menu: Scanner, Education, Admin (top right)
- Clean dark theme UI

### Step 4: Test a Scan
1. Click **Scanner** in top menu
2. Enter an email: `test@example.com`
3. Click **Scan Email**
4. View results with confidence score & found accounts
5. Click **Download Report** to get CSV
6. Click **Admin** to see scan history

## 📚 Pages & Routes

| Route | Purpose | What You'll See |
|-------|---------|---|
| `/` | Landing page | Hero section with CTA buttons |
| `/scanner` | Main scanning interface | Input forms (email, username, phone, password) |
| `/results` | Results dashboard | Accounts found, confidence %, breach info, CSV download |
| `/education` | Privacy & security guide | Best practices, threat explanations, resources |
| `/admin` | Admin panel | HIBP key management, scan history table |

## 🔧 API Endpoints

### Scan Endpoints

**Email Scan**
```
POST /api/scan/email
Body: { "email": "user@example.com" }
Returns: { 
  success: true, 
  data: {
    breaches: [...],
    accountsFound: 4,
    confidenceScore: 80,
    gravatarFound: true,
    breachCheckStatus: "No breaches found / API not configured"
  }
}
```

**Username Scan**
```
POST /api/scan/username
Body: { "username": "myusername" }
Returns: { 
  success: true, 
  data: { 
    accountsFound: [
      { platform: "GitHub", url: "https://github.com/myusername", exists: true },
      ...
    ],
    confidenceScore: 75
  }
}
```

**Phone Scan**
```
POST /api/scan/phone
Body: { "phone": "+919876543210" }
Returns: { 
  success: true, 
  data: { 
    warning: "No reliable public phone breach database exists",
    limitations: [...],
    recommendation: "Check individual accounts for phone-based recovery..."
  }
}
```

**Password Check (Pwned Passwords k-anonymity - SAFE)**
```
POST /api/scan/password
Body: { "password": "mypassword123" }
Returns: { 
  success: true, 
  data: { 
    pwned: false,
    count: 0,
    message: "Password not found in known breaches"
  }
}
```

**Export Report (CSV)**
```
POST /api/scan/report
Body: { "scanResult": { ...all scan data from results... } }
Returns: CSV file with columns: Input, Username, Confidence, Gravatar, Platforms, Breaches
Download: scan-report-{timestamp}.csv
```

### Admin Endpoints

**Get Config**
```
GET /api/admin/config
Returns: { 
  success: true, 
  data: { 
    HIBP_API_KEY: "set" or "not-set"
  }
}
```

**Set HIBP API Key**
```
POST /api/admin/hibp-key
Body: { "key": "your_actual_hibp_api_key" }
Returns: { 
  success: true, 
  data: { message: "HIBP API key configured and persisted to .env" }
}
```

**List All Scans**
```
GET /api/admin/scans
Returns: { 
  success: true, 
  data: [
    {
      id: 1771603280484,
      createdAt: "2026-02-20T16:01:20.484Z",
      scan: { input, username, accountsFound, confidenceScore, ... }
    },
    ...
  ]
}
```

## 🧠 How It Works

### The Real Data Pipeline

1. **User enters email/username** → Frontend sends to backend
2. **Platform checks** → Backend makes HTTP requests to 9 platforms (GitHub, Instagram, etc.)
3. **HTTP status parsing** → If 404 = doesn't exist, if 200/301 = found
4. **Gravatar lookup** → MD5 hash of email sent to gravatar.com API
5. **Pwned Passwords k-anonymity** → First 5 chars of SHA-1 sent to HIBP (password never exposed)
6. **Email breaches** → (If HIBP API key configured) Full HIBP database check
7. **Confidence calculation** → Score based on verified signals only
8. **Persistence** → Scan auto-saved to `backend/data/scans.json`
9. **Results returned** → Frontend displays with clickable evidence links

### Confidence Score Algorithm

Score (0-100) based on:
- ✅ Each platform account found: **+10 per account** (max 90)
- ✅ Gravatar presence: **+10**
- ✅ Pwned password match: **+20**
- ✅ Email breaches detected: **+20 per breach** (max 50, when HIBP configured)

**Examples:**
- 0 accounts found, no breaches → **0%** (SAFE)
- 4 accounts found, gravatar, no breaches → **50%** (MODERATE)
- 5 accounts found, gravatar, pwned password, 1 breach → **90%** (CRITICAL)

### What Makes Each Check Real

| Check | API Used | Proof of Reality |
|-------|----------|------------------|
| GitHub | `https://api.github.com/users/{username}` | **200 = exists, 404 = not found** (HTTP status) |
| Instagram | Platform page load test | **200 = account found** (searchable user profile) |
| Twitter/X | `https://api.twitter.com/1.1/users/show.json?screen_name={username}` | **200 = exists, 404 = not found** (official API) |
| LinkedIn | Page search via public profile endpoint | **200 = accessible profile** (LinkedIn public profiles) |
| Gravatar | `https://www.gravatar.com/{md5_email}.json` | **200 = avatar found, 404 = not set** (direct API) |
| Pwned Passwords | HIBP k-anonymity: `https://api.pwnedpasswords.com/range/{sha1_first_5}` | **Safe prefix matching** (password never sent) |
| Email Breaches | HIBP v3 API (requires key) | **Official "Have I Been Pwned" database** (haveibeenpwned.com) |

## 🔐 Privacy & Security

- ✅ **No User Accounts Needed** — Scan without signing up
- ✅ **No Data Stored** — Scans saved only for admins to see trend
- ✅ **OSINT Only** — Uses only publicly available information
- ✅ **No Hacking** — Never attempts unauthorized access
- ✅ **Passwords Safe** — Uses k-anonymity, never sends full passwords
- ✅ **No Tracking** — No ads, no monetization, no third-party tracking

## 💻 Technology Stack

### Backend
- **Node.js 18+** — Server runtime
- **Express 4.18** — Web framework
- **Axios** — HTTP requests to real APIs
- **express-rate-limit** — Abuse protection
- **dotenv** — Environment configuration

### Frontend
- **React 18.2** — UI library
- **Vite 4.5** — Lightning-fast build tool
- **Tailwind CSS 3.3** — Styling
- **React Router v6** — Client-side routing
- **Axios** — API calls

### Data & Persistence
- **JSON file** (`backend/data/scans.json`) — Scan history (no DB needed)
- **In-memory caching** — Username checks (10 min TTL), pwned-passwords (5 min TTL)
- **.env file** — Configuration (HIBP API key, etc.)

### Real APIs Integrated
- ✅ GitHub API (free)
- ✅ Twitter/X Search (free)
- ✅ LinkedIn Public Profiles (free)
- ✅ Reddit OSINT (free)
- ✅ TikTok User Search (free)
- ✅ Gravatar API (free)
- ✅ Pwned Passwords k-anonymity (free)
- ✅ Have I Been Pwned v3 API (free tier + paid for email checks)

## 🌟 Key Features Implemented

✅ Real platform account detection (9 platforms)
✅ Gravatar presence verification
✅ Pwned Passwords k-anonymity check (safe, secure)
✅ Email breach checking (when HIBP configured)
✅ Confidence scoring (0-100%)
✅ CSV export with evidence
✅ Admin panel with scan history
✅ Persistent file-based storage
✅ Rate limiting (abuse protection)
✅ Dark theme UI with Tailwind
✅ Responsive mobile-friendly design
✅ Educational content page
✅ Real HTTP verification (not fake data)
✅ Clickable account links for verification

## 🔑 Enable Email Breach Checking (Optional)

By default, email breach checking is disabled with a helpful message. To enable it:

### Option A: Free Tier (No Credit Card)

1. Visit https://haveibeenpwned.com/API/v3
2. Click **"Free Tier"** at bottom
3. Enter your email (you'll receive a link)
4. Verify your email
5. Copy the API key from the confirmation page

### Option B: Via Admin Panel

1. Open http://localhost:5173/admin
2. Scroll to "HIBP API Key" section
3. Paste your key in the input field
4. Click **Save & Persist to .env**
5. Restart backend: `npm start`

**Verification:**
- Go back to scanner
- The "Enable HIBP" modal should now say "✅ HIBP API Key is Configured"
- Email scans will now show real breach data

## 🚀 Deployment (Beyond Local)

### Option 1: Quick Deploy to Render (Free)

**Backend:**
```bash
# Create Render account at https://render.com
# Connect GitHub repo
# Create Web Service with:
Command: cd backend && npm install && npm start
Environment: NODE_ENV=production, HIBP_API_KEY=(your key)
```

**Frontend:**
```bash
# Create another Web Service with:
Command: cd frontend && npm install && npm run build && npm run preview
```

### Option 2: Vercel + Railway

**Frontend on Vercel:**
1. Push code to GitHub
2. https://vercel.com/import → select repo → deploy
3. Set env vars in Vercel dashboard

**Backend on Railway:**
1. https://railway.app → new project → GitHub repo
2. Select `/backend` as root directory
3. Add env vars (HIBP_API_KEY, NODE_ENV)
4. Deploy

### Option 3: Docker (Advanced)

```dockerfile
# Dockerfile (root directory)
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN cd backend && npm install && cd ../frontend && npm install && npm run build
CMD cd backend && npm start
```

## 📊 Project Roadmap (Future Enhancements)

- [ ] User authentication & personal dashboards
- [ ] Dark web monitoring alerts
- [ ] Email notifications for new breaches
- [ ] API for third-party integrations
- [ ] PDF report generation
- [ ] Real-time scan scheduling
- [ ] PostgreSQL database (for scale)
- [ ] Multi-language support

## 🛡️ Security Considerations

- Rate limiting prevents brute force / DoS
- No passwords stored anywhere
- Only public information accessed
- CORS configured for your domain
- Input validation on all endpoints

## 🚦 Troubleshooting

### Servers Won't Start

**Problem:** `Port 5000 already in use`
```bash
# Kill existing Node process
Get-Process node | Stop-Process -Force
# Try again
npm start
```

**Problem:** `Module not found`
```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

### Scans Show "API Error"

**Issue:** CORS, network, or API downtime
- Check backend console for error messages
- Verify internet connection
- Platforms might be temporarily unavailable

### HIBP Key Not Working

**Issue:** Key format or API limit exceeded
- Verify key copied correctly (no spaces)
- Check https://haveibeenpwned.com API status
- Free tier has rate limit (1 req/sec)

## 📞 Support & Questions

For bugs, features, or questions:
1. Check existing issues on GitHub
2. Review console logs (browser DevTools + terminal)
3. Open a GitHub issue with:
   - What you were scanning
   - Error message (if any)
   - Browser & OS info

## 🚦 Getting Help

Check our Education page (`/education`) for:
- Understanding risk levels
- Common threats explained
- Security best practices
- Recommended tools
- What to do if breached
- Helpful resources

## 📝 Future Enhancements

- [ ] Integration with Have I Been Pwned API
- [ ] Real email/phone validation
- [ ] Account linking and cross-platform analysis
- [ ] Download privacy report as PDF
- [ ] Email alerts for new breaches
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Dashboard for monitoring over time
- [ ] Browser extension
- [ ] Mobile app

## 📄 License

MIT License - Feel free to use, modify, and distribute

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

---

**Stay Safe Online! 🔐**

Your privacy matters. Know your exposure. Take action.
