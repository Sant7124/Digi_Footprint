# DigitalFootprint - Real Data API Integration

## 🔐 Overview

DigitalFootprint now integrates with **real-world APIs** to provide genuine privacy scanning. This document explains what APIs are integrated and how to use them.

## 🚀 Real APIs Integrated

### 1. **Have I Been Pwned (HIBP) API** ✅
**Status**: Active (No API key required)
**Purpose**: Detect if email has been in known data breaches
**Data**: Real breach information with:
- Breach name
- Breach date
- Data classes compromised
- Verification status
- Number of affected accounts

**How it works**:
```javascript
// Real API call to HIBP
await checkBreachesForEmail('yoursemail@gmail.com')
// Returns: Array of real breaches containing this email
```

**Endpoint**: `https://haveibeenpwned.com/api/v3/breachedaccount/{email}`

### 2. **GitHub API** ✅
**Status**: Active (No auth required for checks)
**Purpose**: Check if username exists on GitHub
**Data**: User existence verification

**How it works**:
```javascript
await checkGitHub('username')
// Returns: true/false if user exists
```

### 3. **Social Platform APIs** ⚙️
**Supported Platforms**:
- ✅ GitHub - API available
- ✅ Reddit - API available  
- ✅ Twitter/X - Requires OAuth (Premium)
- 🔄 Instagram - Requires rate limiting
- 🔄 LinkedIn - Requires authentication
- 🔄 TikTok - Requires authentication

**Current Implementation**: Uses HEAD requests to check profile existence

## 📊 Real Data Features

### Email Scanning
```bash
POST /api/scan/email
{
  "email": "yourmail@example.com"
}
```

**Real Response Example**:
```json
{
  "success": true,
  "data": {
    "input": "yourmail@example.com",
    "username": "yourmail",
    "breaches": [
      {
        "website": "LinkedIn",
        "year": 2021,
        "dataLeaked": ["email", "password", "phone"],
        "severity": "critical",
        "isVerified": true,
        "affectedCount": 700000000
      }
    ],
    "accountsFound": [
      {
        "platform": "GitHub",
        "url": "https://github.com/yourmail",
        "icon": "🐙",
        "status": "found"
      }
    ],
    "dataSource": "Real-time API checks (Have I Been Pwned + Platform APIs)"
  }
}
```

### Username Scanning
```bash
POST /api/scan/username
{
  "username": "johndoe"
}
```

Checks across multiple platforms in real-time.

## 🔧 Setting Up Optional Enhanced APIs

### Optional: Twitter API (For Real Twitter Checks)
1. Visit: https://developer.twitter.com/en/portal/dashboard
2. Create an app and get API credentials
3. Add to `.env`:
```env
TWITTER_API_KEY=your_key
TWITTER_API_SECRET=your_secret
TWITTER_BEARER_TOKEN=your_token
```

### Optional: Instagram API (Advanced)
1. Register at: https://developers.facebook.com/
2. Create Meta App
3. Add credentials to `.env`

### Optional: LinkedIn API
LinkedIn has strict policies. For production:
1. Apply for LinkedIn Official API access
2. Follow their approval process
3. Implement OAuth flow

## 📈 Risk Scoring - Real Data Based

### Scoring Algorithm
```
+30 per breach detected
+20 per verified breach
+15 per public account found
+25 if phone is exposed
+20 if email is exposed
+20 if username reused (3+ platforms)
+5 per additional platform (after 5)
+5 per old breach (3+ years)
```

### Result Levels
- **SAFE** (0): No breaches detected
- **LOW** (1-15): Minor exposure
- **MODERATE** (16-40): Action recommended
- **HIGH** (41-70): Urgent action needed
- **CRITICAL** (71+): Severe exposure

## 🔄 API Rate Limiting

All API calls are rate-limited in production:
- **Window**: 15 minutes
- **Max requests**: 100 per window
- **Per email**: 1 check per request

The app respects HIBP rate limits:
- Maximum 1 request per 1500ms

## 🛡️ Security Features

✅ **Rate Limiting** - Prevents abuse
✅ **CORS Protection** - Only frontend can access
✅ **Error Handling** - Safe error messages
✅ **Data Privacy** - No data stored on server
✅ **HTTPS Ready** - Production deployment ready
✅ **Request Timeout** - 10 second timeout on all APIs

## 📝 Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": {
    // Actual scan results
    "breaches": [],
    "accountsFound": [],
    "timestamp": "2026-02-20T10:30:00Z",
    "dataSource": "Real-time API checks"
  }
}
```

Error responses:

```json
{
  "error": "Error message here",
  "details": "Technical details (dev mode only)"
}
```

## 🚀 Deploying to Production

### Environment Variables Needed
```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# API Configuration
HIBP_API_URL=https://haveibeenpwned.com/api/v3
API_TIMEOUT=10000
```

### Deployment Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure correct `CORS_ORIGIN`
- [ ] Add SSL/HTTPS certificate
- [ ] Set up monitoring/logging
- [ ] Configure database (future)
- [ ] Add analytics (future)
- [ ] Set up automated backups (future)

## 📊 Future API Integrations

### Planned
- **Phone number breach database** - Real phone leak detection
- **Email domain verification** - Check if email is truly valid
- **Password strength analysis** - Real-time Zxcvbn integration
- **Credit freeze status** - Integration with credit bureaus
- **Dark web scanning** - Monitor dark web for credentials

### Advanced Future Features
- User accounts & scan history
- Email alerts for new breaches
- API for third-party integrations
- Bulk scanning for organizations
- Custom risk models
- OAuth login integration

## 🧪 Testing APIs Locally

### Test Email Scan
```bash
curl -X POST http://localhost:5000/api/scan/email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com"}'
```

### Test Username Scan
```bash
curl -X POST http://localhost:5000/api/scan/username \
  -H "Content-Type: application/json" \
  -d '{"username":"github"}'
```

### Test Health Endpoint
```bash
curl http://localhost:5000/api/health
```

## 🔒 Legal & Compliance

- ✅ GDPR Compliant (no data storage)
- ✅ CCPA Compliant (privacy-first)
- ✅ HIPAA considerations (no health data)
- ✅ Fair use with HIBP API
- ✅ Respects robots.txt on platforms

## 📞 Support & Issues

For API issues:
1. Check `.env` configuration
2. Verify internet connection
3. Check HIBP service status: https://haveibeenpwned.com/
4. Review error logs in console
5. Test individual API endpoints

---

**Last Updated**: February 20, 2026
**Version**: 1.0.0 - Real Data Edition
