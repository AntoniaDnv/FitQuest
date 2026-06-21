// Admin controller (Stefan) — all routes behind Христофор's protect + adminOnly middleware.
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Workout = require('../models/Workout');
const Goal = require('../models/Goal');
const Log = require('../models/Log');
const AIWorkoutPlan = require('../models/AIWorkoutPlan');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');

// GET /api/admin/stats
const getStats = asyncHandler(async (req, res) => {
  const [users, activeChallenges, workouts, aiPlans, goals] = await Promise.all([
    User.countDocuments(),
    Challenge.countDocuments({ status: 'active' }),
    Workout.countDocuments(),
    AIWorkoutPlan.countDocuments(),
    Goal.countDocuments(),
  ]);
  res.json({ success: true, stats: { users, activeChallenges, workouts, aiPlans, goals } });
});

// GET /api/admin/users
const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, users });
});

// PUT /api/admin/users/:id/ban  — toggles ban state
const toggleBan = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  if (user._id.toString() === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: 'You cannot ban yourself' });
  }

  user.isBanned = !user.isBanned;
  await user.save();

  await createLog({
    userId: req.user._id,
    action: 'ADMIN_USER_BANNED',
    entityType: 'user',
    entityId: user._id,
    metadata: { banned: user.isBanned, target: user.username },
  });

  res.json({ success: true, user: user.toPublic() });
});

// DELETE /api/admin/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({ success: false, message: 'You cannot delete yourself' });
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  await createLog({
    userId: req.user._id,
    action: 'ADMIN_USER_DELETED',
    entityType: 'user',
    entityId: user._id,
    metadata: { target: user.username },
  });

  res.json({ success: true, message: 'User deleted' });
});

// GET /api/admin/challenges
const listChallenges = asyncHandler(async (req, res) => {
  const challenges = await Challenge.find()
    .populate('createdBy', 'username')
    .sort({ createdAt: -1 });
  res.json({
    success: true,
    count: challenges.length,
    challenges: challenges.map((c) => ({
      _id: c._id,
      title: c.title,
      status: c.status,
      participants: c.participants.length,
      createdBy: c.createdBy?.username || null,
      startDate: c.startDate,
      endDate: c.endDate,
    })),
  });
});

// DELETE /api/admin/challenges/:id
const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findByIdAndDelete(req.params.id);
  if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found' });

  await createLog({
    userId: req.user._id,
    action: 'CONTENT_MODERATED',
    entityType: 'challenge',
    entityId: challenge._id,
    metadata: { title: challenge.title, action: 'deleted' },
  });

  res.json({ success: true, message: 'Challenge deleted' });
});

// GET /api/admin/logs
const listLogs = asyncHandler(async (req, res) => {
  const logs = await Log.find()
    .populate('userId', 'username email')
    .sort({ createdAt: -1 })
    .limit(100);
  res.json({ success: true, count: logs.length, logs });
});

// GET /api/admin/ai-outputs
const listAiOutputs = asyncHandler(async (req, res) => {
  const plans = await AIWorkoutPlan.find()
    .populate('userId', 'username email')
    .sort({ createdAt: -1 });
  res.json({ success: true, count: plans.length, plans });
});

// PUT /api/admin/ai-outputs/:id/validate  — toggles validation; flag=true also marks isFlagged
const reviewAiOutput = asyncHandler(async (req, res) => {
  const { isValidated, isFlagged } = req.body;
  const plan = await AIWorkoutPlan.findById(req.params.id);
  if (!plan) return res.status(404).json({ success: false, message: 'AI plan not found' });

  if (isValidated !== undefined) plan.isValidated = Boolean(isValidated);
  if (isFlagged !== undefined) plan.isFlagged = Boolean(isFlagged);
  await plan.save();

  // Re-populate the maker so the response keeps their name (frontend reads
  // userId.username); without this the validated row would show "unknown".
  await plan.populate('userId', 'username email');

  await createLog({
    userId: req.user._id,
    action: 'CONTENT_MODERATED',
    entityType: 'ai',
    entityId: plan._id,
    metadata: { isValidated: plan.isValidated, isFlagged: plan.isFlagged },
  });

  res.json({ success: true, plan });
});

module.exports = {
  getStats,
  listUsers,
  toggleBan,
  deleteUser,
  listChallenges,
  deleteChallenge,
  listLogs,
  listAiOutputs,
  reviewAiOutput,
};
