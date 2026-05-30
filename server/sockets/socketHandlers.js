/**
 * FitQuest — Socket.IO Handlers
 * Real-time challenge rooms, live progress and notifications.
 */

const Challenge    = require("../models/Challenge");
const Notification = require("../models/Notification");
const Log          = require("../models/Log");

/**
 * Build a sorted leaderboard from a Challenge document.
 */
function buildLeaderboard(challenge) {
  return [...challenge.participants]
    .sort((a, b) => b.progress - a.progress)
    .map((p, i) => ({
      rank:      i + 1,
      userId:    p.userId,
      progress:  p.progress,
      completed: p.completed,
    }));
}

module.exports = function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log(`🔌  Socket connected: ${socket.id}`);

    // ── joinChallenge ──────────────────────────────────────────────────────
    socket.on("joinChallenge", ({ challengeId, userId, username }) => {
      socket.join(`challenge-${challengeId}`);
      console.log(`   ${username} joined room challenge-${challengeId}`);

      // Notify others in the room
      socket.to(`challenge-${challengeId}`).emit("userJoined", {
        userId,
        username,
        message: `${username} joined the challenge!`,
      });
    });

    // ── leaveChallenge ─────────────────────────────────────────────────────
    socket.on("leaveChallenge", ({ challengeId, username }) => {
      socket.leave(`challenge-${challengeId}`);
      console.log(`   ${username} left room challenge-${challengeId}`);
    });

    // ── updateProgress ─────────────────────────────────────────────────────
    // Client emits: { challengeId, userId, username, newProgress }
    socket.on("updateProgress", async ({ challengeId, userId, username, newProgress }) => {
      try {
        // 1. Persist to DB
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return socket.emit("error", { message: "Challenge not found" });

        const participant = challenge.participants.find(
          (p) => p.userId.toString() === userId.toString()
        );
        if (!participant) return socket.emit("error", { message: "You are not a participant" });

        const oldProgress = participant.progress;
        participant.progress  = newProgress;
        participant.completed = newProgress >= challenge.targetValue;
        await challenge.save();

        // 2. Build fresh leaderboard
        const leaderboard = buildLeaderboard(challenge);

        // 3. Log the event
        await Log.create({
          userId,
          action:     "PROGRESS_UPDATED",
          entityType: "challenge",
          entityId:   challengeId,
          metadata:   { oldProgress, newProgress, unit: challenge.unit },
        });

        // 4. Broadcast to everyone in the room (including sender)
        io.to(`challenge-${challengeId}`).emit("progressUpdated", {
          userId,
          username,
          oldProgress,
          newProgress,
          unit:        challenge.unit,
          targetValue: challenge.targetValue,
          completed:   participant.completed,
        });

        io.to(`challenge-${challengeId}`).emit("leaderboardUpdated", {
          challengeId,
          leaderboard,
        });

        // 5. Notification if the user just completed the challenge
        if (participant.completed) {
          const notif = await Notification.create({
            userId,
            type:    "challenge",
            title:   "Challenge completed! 🎉",
            message: `You reached ${newProgress} ${challenge.unit} and completed "${challenge.title}"!`,
            isRead:  false,
          });

          io.to(`challenge-${challengeId}`).emit("challengeCompleted", {
            userId,
            username,
            challengeTitle: challenge.title,
          });

          // Also send to the user's personal room
          io.to(`user-${userId}`).emit("newNotification", notif);
        }

        // 6. Progress notification to others
        const pct = Math.round((newProgress / challenge.targetValue) * 100);
        if (pct >= 70 && pct < 100) {
          const notif = await Notification.create({
            userId,
            type:    "progress",
            title:   "Great progress!",
            message: `${username} reached ${pct}% of the daily target in "${challenge.title}".`,
            isRead:  false,
          });

          socket.to(`challenge-${challengeId}`).emit("newNotification", notif);
        }

        console.log(`   ✅  ${username} progress updated: ${oldProgress} → ${newProgress}`);
      } catch (err) {
        console.error("updateProgress error:", err.message);
        socket.emit("error", { message: "Failed to update progress" });
      }
    });

    // ── joinUserRoom (personal notifications) ─────────────────────────────
    socket.on("joinUserRoom", ({ userId }) => {
      socket.join(`user-${userId}`);
      console.log(`   User ${userId} joined personal room`);
    });

    // ── disconnect ────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔌  Socket disconnected: ${socket.id}`);
    });
  });
};
