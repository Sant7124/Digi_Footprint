import express from 'express';
import { scanEmail, scanUsername, scanPhone, scanPassword, exportReportCSV } from '../controllers/scanController.js';
import { passwordLimiter, platformLimiter } from '../utils/rateLimiters.js';

const router = express.Router();

router.post('/email', scanEmail);
// Apply platform-specific limiter to username checks
router.post('/username', platformLimiter, scanUsername);
router.post('/phone', scanPhone);
// Apply tighter limiter for password k-anonymity checks
router.post('/password', passwordLimiter, scanPassword);
router.post('/report', exportReportCSV);

export default router;
