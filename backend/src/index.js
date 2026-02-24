import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import scanRoutes from './routes/scanRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Security headers (Production protection)
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "DigitalFootprint");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rate limiting - Protect API from abuse
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit to 100 requests per windowMs
  message: 'Too many requests. Please try again later.',
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  skip: (req) => req.path === '/api/health' // Don't rate limit health checks
});

// Apply rate limiting to all api routes
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// API Routes
app.get('/', (req, res) => {
  res.send('<h1>🔐 DigitalFootprint API is running in production.</h1>');
});

app.use('/api/scan', scanRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/admin', adminRoutes);

// 404 handling
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.status === 429) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: err.retryAfter
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🔐 DigitalFootprint Privacy Scanner`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend: http://localhost:5173`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health\n`);
});
