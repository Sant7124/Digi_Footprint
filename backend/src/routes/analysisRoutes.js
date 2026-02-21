import express from 'express';
import { analyzeRisk, getSuggestions, getBreachTimeline } from '../controllers/analysisController.js';

const router = express.Router();

router.post('/risk', analyzeRisk);
router.post('/suggestions', getSuggestions);
router.post('/timeline', getBreachTimeline);

export default router;
