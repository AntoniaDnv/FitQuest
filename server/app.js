/**
 * FitQuest — Express Application
 * Registers all routes, middleware and Socket.IO handlers.
 */

const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const { createServer } = require("http");
const { Server }       = require("socket.io");

const app    = express();
const server = createServer(app);

// ── Socket.IO ────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", methods: ["GET", "POST"] },
});

// Attach io to every request so controllers can emit events
app.use((req, _res, next) => { req.io = io; next(); });

// ── Core middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────────────────────
const authRoutes      = require("./routes/authRoutes");
const userRoutes      = require("./routes/userRoutes");
const goalRoutes      = require("./routes/goalRoutes");
const workoutRoutes   = require("./routes/workoutRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const adminRoutes     = require("./routes/adminRoutes");
const aiRoutes        = require("./routes/aiRoutes");

app.use("/api/auth",       authRoutes);
app.use("/api/users",      userRoutes);
app.use("/api/goals",      goalRoutes);
app.use("/api/workouts",   workoutRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/ai",         aiRoutes);

// ── Health-check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);

// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// ── Central error handler ────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal server error" });
});

// ── Socket.IO handlers ────────────────────────────────────────────────────────
const registerSocketHandlers = require("./socket/socketHandlers");
registerSocketHandlers(io);

// ── Database + boot ───────────────────────────────────────────────────────────
const PORT      = process.env.PORT      || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fitquest";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected");
    server.listen(PORT, () =>
      console.log(`🚀  Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });

module.exports = { app, io };
