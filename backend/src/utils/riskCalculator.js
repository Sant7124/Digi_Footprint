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

  // 1. Breach exposure (Capped impact)
  const breachCount = breaches.length || 0;
  if (breachCount > 0) {
    score += 15; // Base risk for any breach
    score += Math.min(breachCount * 5, 25); // Gradual increase capped at +25
    factors.push(`${breachCount} data breach(es) detected`);
  }

  // 2. Verified severe data (Capped impact)
  const severeBreaches = breaches.filter(b => b && b.isVerified)?.length || 0;
  if (severeBreaches > 0) {
    score += Math.min(severeBreaches * 10, 20); // Bonus for verified data capped at +20
    factors.push(`${severeBreaches} verified breach(es) with confirmed data exposure`);
  }

  // 3. Digital footprint (Logarithmic-style scaling)
  const accountCount = accounts.length || 0;
  if (accountCount > 0) {
    score += Math.min(accountCount * 2, 15); // Footprint points capped at +15
    factors.push(`${accountCount} linked public profile(s) discovered`);
  }

  // 4. Critical identity links (Static weights)
  if (scanResult.phoneExposed === true) {
    score += 10;
    factors.push('Phone number identified in compromised datasets');
  }

  if (scanResult.emailExposed === true) {
    score += 5;
    factors.push('Email address identified in compromised datasets');
  }

  if (scanResult.reusedUsername === true && accounts.length > 2) {
    score += 5;
    factors.push('Identity linkage: Similar username across multiple services');
  }

  if (scanResult.gravatarFound) {
    score += 5;
    factors.push('Public Gravatar profile detected');
  }

  // Normalize score to 0-100 (Now harder to hit 100)
  const normalizedScore = Math.min(Math.max(Math.round(score), 0), 100);

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
