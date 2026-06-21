// Challenge controller (Stefan) — REST side of challenges.
// Live progress + leaderboard broadcasting stays in Христофор's socket/socketHandler.js;
// here we reuse his exported sendNotification() so REST actions also deliver real-time alerts.
const Challenge = require('../models/Challenge');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');
const { sendNotification, userSockets } = require('../socket/socketHandler');

const VALID_UNITS = ['steps', 'workouts', 'minutes', 'km'];

// Build a username-resolved leaderboard from a populated challenge.
const buildLeaderboard = (challenge) =>
  [...challenge.participants]
    .sort((a, b) => b.progress - a.progress)
    .map((p, i) => ({
      rank: i + 1,
      userId: p.userId?._id || p.userId,
      username: p.userId?.username || null,
      progress: p.progress,
      completed: p.completed,
      progressPercent: challenge.targetValue
        ? Math.min(100, Math.round((p.progress / challenge.targetValue) * 100))
        : 0,
    }));

const decorate = (challenge, userId) => {
  const me = challenge.participants.find(
    (p) => (p.userId?._id || p.userId).toString() === userId.toString()
  );
  const obj = challenge.toObject({ virtuals: true });
  return {
    ...obj,
    participantCount: challenge.participants.length,
    isJoined: Boolean(me),
    myProgress: me ? me.progress : 0,
    leaderboard: buildLeaderboard(challenge),
  };
};

// GET /api/challenges — public challenges + any the user is part of
const listChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find({
    $or: [{ isPublic: true }, { 'participants.userId': req.user._id }, { createdBy: req.user._id }],
  })
    .populate('participants.userId', 'username fitnessLevel')
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 });

  res.json({ success: true, count: challenges.length, challenges: challenges.map((c) => decorate(c, req.user._id)) });
});

// GET /api/challenges/:id
const getChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id)
    .populate('participants.userId', 'username fitnessLevel')
    .populate('createdBy', 'username');
  if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });
  res.json({ success: true, challenge: decorate(challenge, req.user._id) });
});

// POST /api/challenges — creator auto-joins
const createChallenge = asyncHandler(async (req, res) => {
  const { title, description, targetValue, unit, startDate, endDate, isPublic } = req.body;
  if (!title || targetValue === undefined || !unit || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'title, targetValue, unit, startDate and endDate are required',
    });
  }
  if (!VALID_UNITS.includes(unit)) {
    return res.status(400).json({ success: false, message: `unit must be one of: ${VALID_UNITS.join(', ')}` });
  }

  const challenge = await Challenge.create({
    title,
    description,
    createdBy: req.user._id,
    participants: [{ userId: req.user._id, progress: 0, completed: false }],
    targetValue,
    unit,
    startDate,
    endDate,
    isPublic: isPublic !== undefined ? isPublic : true,
  });

  await createLog({
    userId: req.user._id,
    action: 'CHALLENGE_CREATED',
    entityType: 'challenge',
    entityId: challenge._id,
    metadata: { title: challenge.title },
  });

  const populated = await Challenge.findById(challenge._id)
    .populate('participants.userId', 'username fitnessLevel')
    .populate('createdBy', 'username');
  res.status(201).json({ success: true, challenge: decorate(populated, req.user._id) });
});

// POST /api/challenges/:id/join
const joinChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

  const already = challenge.participants.some((p) => p.userId.toString() === req.user._id.toString());
  if (already) return res.status(409).json({ success: false, message: 'Already joined this challenge' });

  challenge.participants.push({ userId: req.user._id, progress: 0, completed: false });
  await challenge.save();

  await createLog({
    userId: req.user._id,
    action: 'CHALLENGE_JOINED',
    entityType: 'challenge',
    entityId: challenge._id,
    metadata: { title: challenge.title },
  });

  // Real-time notify the creator (reuses Христофор's notification pipeline)
  const io = req.app.get('io');
  if (io && challenge.createdBy.toString() !== req.user._id.toString()) {
    await sendNotification(io, userSockets, {
      userId: challenge.createdBy.toString(),
      type: 'challenge',
      message: `${req.user.username} joined your "${challenge.title}" challenge!`,
      relatedEntityId: challenge._id,
    });
  }

  const populated = await Challenge.findById(challenge._id)
    .populate('participants.userId', 'username fitnessLevel')
    .populate('createdBy', 'username');
  res.json({ success: true, challenge: decorate(populated, req.user._id) });
});

// POST /api/challenges/:id/leave
const leaveChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

  const before = challenge.participants.length;
  challenge.participants = challenge.participants.filter(
    (p) => p.userId.toString() !== req.user._id.toString()
  );
  if (challenge.participants.length === before) {
    return res.status(409).json({ success: false, message: 'You are not a participant' });
  }
  await challenge.save();

  await createLog({
    userId: req.user._id,
    action: 'CHALLENGE_LEFT',
    entityType: 'challenge',
    entityId: challenge._id,
    metadata: { title: challenge.title },
  });

  res.json({ success: true, message: 'Left challenge' });
});

// DELETE /api/challenges/:id — creator or admin only
const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);
  if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

  const isOwner = challenge.createdBy.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Only the creator or an admin can delete this challenge' });
  }

  await challenge.deleteOne();
  await createLog({
    userId: req.user._id,
    action: 'CHALLENGE_DELETED',
    entityType: 'challenge',
    entityId: challenge._id,
    metadata: { title: challenge.title },
  });

  res.json({ success: true, message: 'Challenge deleted' });
});

module.exports = {
  listChallenges,
  getChallenge,
  createChallenge,
  joinChallenge,
  leaveChallenge,
  deleteChallenge,
};
