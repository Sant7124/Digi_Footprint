import axios from 'axios';

const API_BASE = 'http://localhost:5050/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const scanAPI = {
  email: (email) => api.post('/scan/email', { email }),
  username: (username) => api.post('/scan/username', { username }),
  phone: (phone) => api.post('/scan/phone', { phone })
};

export const analysisAPI = {
  risk: (scanResult) => api.post('/analysis/risk', { scanResult }),
  suggestions: (scanResult) => api.post('/analysis/suggestions', { scanResult }),
  timeline: (breaches) => api.post('/analysis/timeline', { breaches })
};

export default api;
