require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const { socketHandler } = require('./socket/socketHandler');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
    // Attach io to app so controllers can emit events if needed
  });

  // Make io accessible in routes/controllers via req.app.get('io')
  app.set('io', io);

  socketHandler(io);

  httpServer.listen(PORT, () => {
    console.log(`FitQuest server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
