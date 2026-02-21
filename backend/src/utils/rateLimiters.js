import rateLimit from 'express-rate-limit';

export const passwordLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 password checks per minute
  message: { error: 'Too many password checks. Please wait a minute and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});

export const platformLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 platform/username checks per minute
  message: { error: 'Too many platform checks. Please wait a minute and try again.' },
  standardHeaders: true,
  legacyHeaders: false
});
