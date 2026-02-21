import fs from 'fs';
import path from 'path';

const DB_DIR = path.resolve(process.cwd(), 'backend', 'data');
const SCANS_FILE = path.join(DB_DIR, 'scans.json');

function ensureDir() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(SCANS_FILE)) fs.writeFileSync(SCANS_FILE, JSON.stringify([]), 'utf8');
  } catch (err) {
    console.error('DB init error:', err.message);
  }
}

export const saveScan = (scan) => {
  try {
    ensureDir();
    const raw = fs.readFileSync(SCANS_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.unshift({ id: Date.now(), createdAt: new Date().toISOString(), scan });
    fs.writeFileSync(SCANS_FILE, JSON.stringify(arr.slice(0, 1000), null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('saveScan error:', err.message);
    return false;
  }
};

export const getAllScans = () => {
  try {
    ensureDir();
    const raw = fs.readFileSync(SCANS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('getAllScans error:', err.message);
    return [];
  }
};
