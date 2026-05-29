const jwt = require('jsonwebtoken');
const Challenge = require('../models/Challenge');
const Notification = require('../models/Notification');
const { createLog } = require('../utils/logger');

// Map: userId (string) -> Set of socket IDs (for personal notifications)
const userSockets = new Map();

const socketHandler = (io) => {
  // Authenticate every socket connection via JWT
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error('Authentication required'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.username = decoded.username;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] User connected: ${socket.username} (${socket.id})`);

    // Track socket by userId for personal notification delivery
    if (!userSockets.has(socket.userId)) {
      userSockets.set(socket.userId, new Set());
    }
    userSockets.get(socket.userId).add(socket.id);

    // --- JOIN CHALLENGE ROOM ---
    socket.on('joinChallenge', async (challengeId) => {
      if (!challengeId) return;
      const room = `challenge:${challengeId}`;
      socket.join(room);
      console.log(`[Socket] ${socket.username} joined room ${room}`);

      try {
        const challenge = await Challenge.findById(challengeId)
          .populate('participants.userId', 'username fitnessLevel');

        if (!challenge) {
          return socket.emit('error', { message: 'Challenge not found' });
        }

        // Send current leaderboard to the joining user
        socket.emit('leaderboardUpdated', {
          challengeId,
          leaderboard: buildLeaderboard(challenge),
        });
      } catch (err) {
        console.error('[Socket] joinChallenge error:', err.message);
        socket.emit('error', { message: 'Could not fetch challenge data' });
      }
    });

    // --- LEAVE CHALLENGE ROOM ---
    socket.on('leaveChallenge', (challengeId) => {
      if (!challengeId) return;
      const room = `challenge:${challengeId}`;
      socket.leave(room);
      console.log(`[Socket] ${socket.username} left room ${room}`);
    });

    // --- UPDATE PROGRESS ---
    socket.on('updateProgress', async ({ challengeId, progress }) => {
      if (!challengeId || progress === undefined) {
        return socket.emit('error', { message: 'challengeId and progress are required' });
      }

      const progressNum = Number(progress);
      if (isNaN(progressNum) || progressNum < 0) {
        return socket.emit('error', { message: 'Progress must be a non-negative number' });
      }

      try {
        // Load without populate first to modify and save efficiently
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
          return socket.emit('error', { message: 'Challenge not found' });
        }

        const participant = challenge.participants.find(
          (p) => p.userId.toString() === socket.userId
        );
        if (!participant) {
          return socket.emit('error', { message: 'You are not a participant in this challenge' });
        }

        // Track previous percent BEFORE update to detect milestone crossing
        const prevPercent = challenge.targetValue
          ? Math.round((participant.progress / challenge.targetValue) * 100)
          : 0;

        participant.progress = progressNum;
        const wasCompleted = participant.completed;
        participant.completed = progressNum >= challenge.targetValue;

        await challenge.save();

        // Re-fetch with populate so leaderboard has usernames
        const populated = await Challenge.findById(challengeId)
          .populate('participants.userId', 'username');

        const leaderboard = buildLeaderboard(populated);
        const room = `challenge:${challengeId}`;

        // Broadcast updated progress to entire room
        io.to(room).emit('progressUpdated', {
          challengeId,
          userId: socket.userId,
          username: socket.username,
          progress: progressNum,
          completed: participant.completed,
        });

        // Broadcast updated leaderboard
        io.to(room).emit('leaderboardUpdated', { challengeId, leaderboard });

        // Log the event
        await createLog({
          userId: socket.userId,
          action: 'PROGRESS_UPDATED',
          entityType: 'challenge',
          entityId: challenge._id,
          metadata: { progress: progressNum, challengeTitle: challenge.title },
        });

        // Send completion notification if newly completed
        if (!wasCompleted && participant.completed) {
          await sendNotification(io, userSockets, {
            userId: socket.userId,
            type: 'progress',
            message: `Congratulations! You completed the challenge "${challenge.title}"!`,
            relatedEntityId: challenge._id,
          });

          io.to(room).emit('challengeCompleted', {
            challengeId,
            userId: socket.userId,
            username: socket.username,
          });
        }

        // Notify others when crossing a milestone threshold (50% or 75%)
        // Use threshold crossing, not exact equality, to handle skipped values
        const newPercent = challenge.targetValue
          ? Math.round((progressNum / challenge.targetValue) * 100)
          : 0;
        const crossedMilestone = [50, 75].find(
          (m) => prevPercent < m && newPercent >= m
        );

        if (crossedMilestone) {
          const msg = `${socket.username} reached ${crossedMilestone}% of the "${challenge.title}" challenge!`;
          // Use sendNotification only — it delivers real-time AND persists to DB.
          // Do NOT also emit to the room to avoid double-delivery for in-room users.
          const otherParticipants = challenge.participants.filter(
            (p) => p.userId.toString() !== socket.userId
          );
          await Promise.all(
            otherParticipants.map((p) =>
              sendNotification(io, userSockets, {
                userId: p.userId.toString(),
                type: 'progress',
                message: msg,
                relatedEntityId: challenge._id,
              })
            )
          );
        }
      } catch (err) {
        console.error('[Socket] updateProgress error:', err.message);
        socket.emit('error', { message: 'Failed to update progress' });
      }
    });

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
      console.log(`[Socket] User disconnected: ${socket.username} (${socket.id})`);
      const sockets = userSockets.get(socket.userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) userSockets.delete(socket.userId);
      }
    });
  });
};

// Build a sorted leaderboard array from challenge participants
const buildLeaderboard = (challenge) => {
  return [...challenge.participants]
    .sort((a, b) => b.progress - a.progress)
    .map((p, i) => ({
      rank: i + 1,
      userId: p.userId._id || p.userId,
      username: p.userId.username || null,
      progress: p.progress,
      completed: p.completed,
      progressPercent: challenge.targetValue
        ? Math.min(100, Math.round((p.progress / challenge.targetValue) * 100))
        : 0,
    }));
};

// Persist a notification to DB and deliver it in real time if user is online
const sendNotification = async (io, userSockets, { userId, type, message, relatedEntityId }) => {
  try {
    const notification = await Notification.create({
      userId,
      type,
      message,
      relatedEntityId,
    });

    const sockets = userSockets.get(userId.toString());
    if (sockets && sockets.size > 0) {
      for (const socketId of sockets) {
        io.to(socketId).emit('newNotification', {
          _id: notification._id,
          type: notification.type,
          message: notification.message,
          isRead: false,
          createdAt: notification.createdAt,
        });
      }
    }

    await createLog({
      userId,
      action: 'NOTIFICATION_SENT',
      entityType: 'system',
      entityId: notification._id,
      metadata: { type, message },
    });
  } catch (err) {
    console.error('[Socket] sendNotification error:', err.message);
  }
};

module.exports = { socketHandler, sendNotification, userSockets };
