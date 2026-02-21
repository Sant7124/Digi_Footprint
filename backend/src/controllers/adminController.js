import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

export const getConfig = async (req, res) => {
  try {
    res.json({ success: true, data: { HIBP_API_KEY: process.env.HIBP_API_KEY || null } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getConfigStatus = async (req, res) => {
  try {
    const configured = !!(process.env.HIBP_API_KEY && process.env.HIBP_API_KEY.trim());
    res.json({ success: true, data: { hibpConfigured: configured } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const setHIBPKey = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ success: false, error: 'Key is required' });

    // Update runtime
    process.env.HIBP_API_KEY = key;

    // Persist to backend/.env - replace existing HIBP_API_KEY line or append
    const envFilePath = envPath;
    let content = '';
    try { content = fs.readFileSync(envFilePath, 'utf8'); } catch (e) { content = ''; }
    const re = /^HIBP_API_KEY=.*$/m;
    if (re.test(content)) {
      content = content.replace(re, `HIBP_API_KEY=${key}`);
    } else {
      if (content && !content.endsWith('\n')) content += '\n';
      content += `HIBP_API_KEY=${key}\n`;
    }
    fs.writeFileSync(envFilePath, content, 'utf8');

    res.json({ success: true, data: { message: 'HIBP API key set (persisted to backend/.env). Restart backend to fully apply.' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

import { getAllScans } from '../utils/db.js';

export const listScans = async (req, res) => {
  try {
    const scans = getAllScans();
    res.json({ success: true, data: scans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
