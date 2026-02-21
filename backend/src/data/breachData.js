// Breach database - public sources
export const breachDatabase = [
  {
    id: 1,
    website: 'LinkedIn',
    year: 2021,
    dataLeaked: ['email', 'password', 'phone'],
    affectedCount: 700000000,
    severity: 'critical'
  },
  {
    id: 2,
    website: 'Facebook',
    year: 2021,
    dataLeaked: ['email', 'phone', 'location'],
    affectedCount: 533000000,
    severity: 'critical'
  },
  {
    id: 3,
    website: 'Twitter',
    year: 2022,
    dataLeaked: ['email', 'username'],
    affectedCount: 5400000,
    severity: 'high'
  },
  {
    id: 4,
    website: 'Twitch',
    year: 2021,
    dataLeaked: ['email', 'password', 'oauth'],
    affectedCount: 5600000,
    severity: 'high'
  },
  {
    id: 5,
    website: 'Uber',
    year: 2022,
    dataLeaked: ['email', 'phone', 'location'],
    affectedCount: 57000000,
    severity: 'critical'
  },
  {
    id: 6,
    website: 'Pinterest',
    year: 2023,
    dataLeaked: ['email', 'username'],
    affectedCount: 3000000,
    severity: 'high'
  },
  {
    id: 7,
    website: 'GitHub',
    year: 2020,
    dataLeaked: ['email', 'token'],
    affectedCount: 1000000,
    severity: 'high'
  },
  {
    id: 8,
    website: 'Instagram',
    year: 2021,
    dataLeaked: ['email', 'phone'],
    affectedCount: 49000000,
    severity: 'critical'
  },
  {
    id: 9,
    website: 'Amazon',
    year: 2022,
    dataLeaked: ['email', 'password'],
    affectedCount: 2000000,
    severity: 'high'
  },
  {
    id: 10,
    website: 'Shopify',
    year: 2021,
    dataLeaked: ['email', 'payment'],
    affectedCount: 500000,
    severity: 'critical'
  }
];

// Popular social platforms
export const socialPlatforms = [
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
  { name: 'Twitter', icon: '𝕏', url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
  { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
  { name: 'Facebook', icon: '👥', url: 'https://facebook.com' },
  { name: 'TikTok', icon: '🎵', url: 'https://tiktok.com' },
  { name: 'YouTube', icon: '📺', url: 'https://youtube.com' },
  { name: 'Reddit', icon: '🔴', url: 'https://reddit.com' },
  { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com' },
  { name: 'Telegram', icon: '✈️', url: 'https://telegram.org' },
  { name: 'Twitch', icon: '🎮', url: 'https://twitch.tv' },
  { name: 'Discord', icon: '💬', url: 'https://discord.com' }
];

// Privacy risks template
export const privacyRisksTemplate = [
  {
    risk: 'Email exposed on public sites',
    level: 'high',
    description: 'Your email is visible on multiple public platforms'
  },
  {
    risk: 'Same username everywhere',
    level: 'medium',
    description: 'Using identical usernames makes account linking easier'
  },
  {
    risk: 'Phone number leaked',
    level: 'critical',
    description: 'Phone number has been compromised in data breaches'
  },
  {
    risk: 'Reused passwords',
    level: 'high',
    description: 'Using same password across multiple sites increases risk'
  },
  {
    risk: 'Public profile visibility',
    level: 'medium',
    description: 'Personal information visible to anyone on the internet'
  }
];

// Fix suggestions template
export const suggestionsTemplate = [
  {
    title: 'Change Password',
    description: 'Update password on breached accounts',
    priority: 1,
    icon: '🔐'
  },
  {
    title: 'Enable 2FA',
    description: 'Add two-factor authentication for extra security',
    priority: 1,
    icon: '🔒'
  },
  {
    title: 'Remove Phone Number',
    description: 'Delete phone number from public profiles',
    priority: 2,
    icon: '📱'
  },
  {
    title: 'Delete Unused Accounts',
    description: 'Close accounts you no longer use',
    priority: 2,
    icon: '🗑️'
  },
  {
    title: 'Privacy Settings Audit',
    description: 'Review and restrict profile visibility',
    priority: 2,
    icon: '👁️'
  },
  {
    title: 'Use Password Manager',
    description: 'Store complex, unique passwords safely',
    priority: 1,
    icon: '🔑'
  }
];
