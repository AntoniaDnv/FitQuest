// =============================================================================
// FitQuest — integrated entry point (Stefan)
//
// Goal: run the FULL app (Христофор's untouched core + Stefan's REST API + Socket.IO)
// WITHOUT modifying ANY of Христофор's files.
//
// How it works:
//   - We build our OWN Express app here and mount Stefan's API routers on it.
//   - For everything we don't handle (e.g. GET /api/health, 404), we delegate to
//     Христофор's untouched app.js by mounting it as a sub-app: `app.use(coreApp)`.
//   - Socket.IO is wired exactly like Христофор's server.js (his socketHandler, his
//     `app.set('io', io)` convention) so his real-time challenge engine runs unchanged.
//
// Run with:  node index.js        — leaves Христофор's `npm start` (server.js) fully intact.
// =============================================================================
require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');

const connectDB = require('./config/db');                 // Христофор
const coreApp = require('./app');                          // Христофор (UNTOUCHED)
const { socketHandler } = require('./socket/socketHandler'); // Христофор

const app = express();

// Same CORS / body-parsing config as Христофор's app so Stefan's routes behave identically.
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// ----- Stefan's REST API (the part Христофор left commented for "Стефан" in app.js) -----
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/challenges', require('./routes/challengeRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// ----- Delegate everything else to Христофор's untouched app (health check, 404, errors) -----
app.use(coreApp);

// Error handler for anything thrown inside Stefan's routers above (coreApp's own error
// handler only catches errors raised inside coreApp).
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  console.error('[API Error]', err.stack || err.message);
  // Surface Mongoose validation errors cleanly for the frontend.
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message).join(', '),
    });
  }
  res.status(err.status || err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Христофор's controllers/handlers read io via req.app.get('io'); expose it on BOTH
  // our app and his sub-app so either lookup path resolves.
  app.set('io', io);
  coreApp.set('io', io);

  socketHandler(io); // Христофор's untouched real-time engine

  httpServer.listen(PORT, () => {
    console.log(`FitQuest (integrated) running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    console.log('Mounted: /api/auth /api/users /api/goals /api/workouts /api/challenges /api/notifications /api/ai /api/admin');
  });
};

start().catch((err) => {
  console.error('Failed to start integrated server:', err.message);
  process.exit(1);
});
