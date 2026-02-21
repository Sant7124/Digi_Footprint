// Scan username endpoint - Uses IntelX (primary) or local fallback
export const scanUsername = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    // IntelX username breach check
    let intelx = await checkIntelxBreaches(username, 'username');
    let breaches = [];
    let breachResult;
    if (intelx && intelx.found) {
      breachResult = {
        hasData: true,
        isRealTime: true,
        dataSource: 'IntelX API',
        breaches: intelx.breaches.map(b => ({
          website: b.bucket || b.name || 'Unknown',
          year: b.date ? new Date(b.date).getFullYear() : undefined,
          dataLeaked: b.dataType ? [b.dataType] : [],
          severity: 'unknown',
          affectedCount: 1,
          raw: b
        })),
        warning: null
      };
      breaches = breachResult.breaches;
    } else {
      // fallback: no local username breach DB, so just return empty
      breachResult = {
        hasData: false,
        isRealTime: false,
        dataSource: 'LOCAL (no username breach DB)',
        breaches: [],
        warning: 'No username breach DB available.'
      };
    }
    res.json({ success: true, data: breachResult });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scan username', details: error.message });
  }
};
// Scan password endpoint - uses HIBP Pwned Passwords k-anonymity (no password leak)
export const scanPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: 'Password is required' });
    const result = await checkPwnedPassword(password);
    res.json({ success: true, data: { pwned: result.pwned, count: result.count, note: 'Checked via k-anonymity Pwned Passwords (no password sent in full)' } });
  } catch (err) {
    console.error('Error scanning password:', err);
    res.status(500).json({ error: 'Failed to scan password', details: err.message });
  }
};
import {
  checkBreachesForEmail,
  checkIntelxBreaches,
  checkUsernameAcrossPlatforms,
  isValidEmail,
  isValidPhone,
  extractUsername,
  checkGravatar,
  checkPwnedPassword,
  computeConfidenceScore
} from '../services/breachService.js';
import { calculateExposureScore, getExposureLevel, getExposureColor } from '../utils/riskCalculator.js';
import { saveScan } from '../utils/db.js';

// Scan email endpoint - Uses IntelX (primary) or HIBP/local fallback
// Scan username endpoint - Uses IntelX (primary) or local fallback

// Scan phone endpoint - Uses IntelX (primary) or local fallback
export const scanPhone = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }
    // IntelX phone breach check
    let intelx = await checkIntelxBreaches(phone, 'phone');
    let breaches = [];
    let breachResult;
    if (intelx && intelx.found) {
      breachResult = {
        hasData: true,
        isRealTime: true,
        dataSource: 'IntelX API',
        breaches: intelx.breaches.map(b => ({
          website: b.bucket || b.name || 'Unknown',
          year: b.date ? new Date(b.date).getFullYear() : undefined,
          dataLeaked: b.dataType ? [b.dataType] : [],
          severity: 'unknown',
          affectedCount: 1,
          raw: b
        })),
        warning: null
      };
      breaches = breachResult.breaches;
    } else {
      // fallback: no local phone breach DB, so just return empty
      breachResult = {
        hasData: false,
        isRealTime: false,
        dataSource: 'LOCAL (no phone breach DB)',
        breaches: [],
        warning: 'No phone breach DB available.'
      };
    }
    res.json({ success: true, data: breachResult });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scan phone', details: error.message });
  }
};
export const scanEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const username = extractUsername(email);
    
    // Use IntelX for breach check (primary), fallback to HIBP/local if error
    let breachResult;
    let breaches = [];
    let intelx = await checkIntelxBreaches(email, 'email');
    if (intelx && intelx.found) {
      breachResult = {
        hasData: true,
        isRealTime: true,
        dataSource: 'IntelX API',
        breaches: intelx.breaches.map(b => ({
          website: b.bucket || b.name || 'Unknown',
          year: b.date ? new Date(b.date).getFullYear() : undefined,
          dataLeaked: b.dataType ? [b.dataType] : [],
          severity: 'unknown',
          affectedCount: 1,
          raw: b
        })),
        warning: null
      };
      breaches = breachResult.breaches;
    } else {
      breachResult = await checkBreachesForEmail(email);
      breaches = breachResult.breaches || [];
    }
    
    // Check username across platforms
    const accounts = await checkUsernameAcrossPlatforms(username);

    // Check Gravatar as an additional public signal
    const gravatarExists = await checkGravatar(email);
    const confidence = computeConfidenceScore(accounts, gravatarExists);

    // Build scan result with real data
    const scanResult = {
      input: email,
      username: username,
      breaches: breaches,
      breachCheckStatus: {
        hasRealData: breachResult.hasData,
        isRealTime: breachResult.isRealTime,
        dataSource: breachResult.dataSource,
        warning: breachResult.warning || null,
        instructions: breachResult.instructions || null
      },
      accountsFound: accounts,
      gravatarFound: gravatarExists,
      confidenceScore: confidence.score,
      confidenceDetails: confidence.details,
      emailExposed: breaches.some(b => b.dataLeaked?.includes('email') || b.dataLeaked?.includes('Email')),
      phoneExposed: breaches.some(b => b.dataLeaked?.includes('phone') || b.dataLeaked?.includes('Phone')),
      reusedUsername: accounts.length > 0,
      publicVisibility: Math.max(0, accounts.length - 5),
      timestamp: new Date(),
      dataSource: breachResult.isRealTime ? 'Real-time HIBP API + Platform APIs' : 'Platform APIs only'
    };

    // Persist scan result (best-effort)
    try {
      saveScan(scanResult);
    } catch (e) {
      console.warn('Failed to persist scan:', e.message);
    }

    res.json({
      success: true,
      data: scanResult
    });
  } catch (error) {
    console.error('Error scanning email:', error);
    res.status(500).json({ 
      error: 'Failed to scan email. Please try again.',
      details: error.message 
    });
  }
};

// Export scan result as CSV for download (client posts scanResult)
export const exportReportCSV = async (req, res) => {
  try {
    const { scanResult } = req.body;
    if (!scanResult) return res.status(400).json({ error: 'scanResult required' });

    // Build CSV rows
    const rows = [];
    rows.push(['Input', scanResult.input || ''].join(','));
    rows.push(['Username', scanResult.username || ''].join(','));
    rows.push(['Confidence', scanResult.confidenceScore ?? ''].join(','));
    rows.push(['Gravatar', scanResult.gravatarFound ? 'Yes' : 'No'].join(','));
    rows.push([]);
    rows.push(['Platform','URL'].join(','));
    (scanResult.accountsFound || []).forEach(a => rows.push([a.platform, a.url].join(',')));
    rows.push([]);
    rows.push(['Breaches','Year','Data Leaked','Description'].join(','));
    (scanResult.breaches || []).forEach(b => rows.push([b.website, b.year || '', (b.dataLeaked || []).join('|'), (b.title || '')].join(',')));

    const csv = rows.join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="scan-report-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    console.error('Export CSV error:', err);
    res.status(500).json({ error: err.message });
  }
};
