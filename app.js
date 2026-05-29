const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// CORS — allow frontend dev server
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ----- Routes (Стефан adds these) -----
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/goals', require('./routes/goals'));
// app.use('/api/workouts', require('./routes/workouts'));
// app.use('/api/challenges', require('./routes/challenges'));
// app.use('/api/ai', require('./routes/ai'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/notifications', require('./routes/notifications'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
