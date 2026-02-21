// Risk scoring algorithm - Professional grade
export const calculateExposureScore = (scanResult) => {
  // Defensive programming - ensure scanResult has required fields
  if (!scanResult) {
    return {
      score: 0,
      factors: ['No scan data provided'],
      level: 'SAFE',
      recommendation: 'Please provide a valid scan result.'
    };
  }

  let score = 0;
  let factors = [];

  // Safely access breaches array
  const breaches = Array.isArray(scanResult.breaches) ? scanResult.breaches : [];
  const accounts = Array.isArray(scanResult.accountsFound) ? scanResult.accountsFound : [];

  // Breach detection: +30 points per breach (critical impact)
  const breachCount = breaches.length || 0;
  score += breachCount * 25; // Adjusted weight
  if (breachCount > 0) {
    factors.push(`${breachCount} data breach(es) detected - Critical privacy risk`);
  }

  // Severe breaches: +20 bonus if any breach is marked as verified
  const severeBreaches = breaches.filter(b => b && b.isVerified)?.length || 0;
  if (severeBreaches > 0) {
    score += severeBreaches * 15;
    factors.push(`${severeBreaches} verified breach(es) with confirmed data exposure`);
  }

  // Accounts found: +15 points per account (increased due to real data)
  const accountCount = accounts.length || 0;
  score += accountCount * 12;
  if (accountCount > 0) {
    factors.push(`${accountCount} linked public profile(s) discovered`);
  }

  // Phone exposed in breaches: +25 points
  if (scanResult.phoneExposed === true) {
    score += 30;
    factors.push('Phone number identified in compromised datasets');
  }

  // Email exposed in breaches: +20 points
  if (scanResult.emailExposed === true) {
    score += 20;
    factors.push('Email address identified in compromised datasets');
  }

  // Reused username across multiple platforms: +20 points
  if (scanResult.reusedUsername === true && accounts.length > 2) {
    score += 25;
    factors.push('High identity linkage risk: Identical username across multiple services');
  }

  // Public visibility per platform: +5 per platform
  if (accounts.length > 5) {
    const publicCount = Math.min(accounts.length - 5, 10);
    score += publicCount * 8;
    factors.push('Extended digital footprint: Multiple active public profiles');
  }

  // Gravatar presence
  if (scanResult.gravatarFound) {
    score += 10;
    factors.push('Public Gravatar profile detected (confirms active email usage)');
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(Math.round(score), 100);

  return {
    score: normalizedScore,
    factors: factors.length > 0 ? factors : ['Minimal digital footprint detected'],
    level: getExposureLevel(normalizedScore),
    recommendation: getRecommendation(normalizedScore)
  };
};

// Map score to exposure level
export const getExposureLevel = (score) => {
  if (score === 0) return 'SAFE';
  if (score <= 15) return 'LOW';
  if (score <= 40) return 'MODERATE';
  if (score <= 70) return 'HIGH';
  return 'CRITICAL';
};

// Get actionable recommendation based on score
export const getRecommendation = (score) => {
  if (score === 0) return 'Your data appears to be safe. Continue monitoring.';
  if (score <= 15) return 'Minor exposure detected. Review suggestions to improve security.';
  if (score <= 40) return 'Moderate exposure. Follow the recommended actions promptly.';
  if (score <= 70) return 'Significant exposure. Act on urgent recommendations immediately.';
  return 'Critical exposure. High-priority action required. Change passwords and enable 2FA now.';
};

// Get color for exposure level
export const getExposureColor = (level) => {
  const colors = {
    'SAFE': '#10b981',
    'LOW': '#3b82f6',
    'MODERATE': '#f59e0b',
    'HIGH': '#ef4444',
    'CRITICAL': '#7c2d12'
  };
  return colors[level] || '#6b7280';
};
