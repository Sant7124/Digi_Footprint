import express from 'express';
import { getConfig, setHIBPKey, getConfigStatus } from '../controllers/adminController.js';

const router = express.Router();

router.get('/config', getConfig);
router.get('/config/status', getConfigStatus);
router.post('/hibp-key', setHIBPKey);
router.get('/scans', (req, res) => import('../controllers/adminController.js').then(m => m.listScans(req, res)));

export default router;
