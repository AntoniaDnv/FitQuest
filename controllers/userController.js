// User/profile controller (Stefan).
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const ALLOWED_FITNESS = ['beginner', 'intermediate', 'advanced'];
const ALLOWED_GOAL_TYPES = ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness'];

// GET /api/users/me  (protect)
const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// PUT /api/users/me  (protect)
const updateProfile = asyncHandler(async (req, res) => {
  const { username, age, fitnessLevel, goalType } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  if (username && username !== user.username) {
    const taken = await User.findOne({ username });
    if (taken) return res.status(409).json({ success: false, message: 'Username already taken' });
    user.username = username;
  }
  if (age !== undefined) user.age = age;
  if (fitnessLevel && ALLOWED_FITNESS.includes(fitnessLevel)) user.fitnessLevel = fitnessLevel;
  if (goalType && ALLOWED_GOAL_TYPES.includes(goalType)) user.goalType = goalType;

  await user.save();
  res.json({ success: true, user: user.toPublic() });
});

// PUT /api/users/me/password  (protect)
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, message: 'currentPassword and newPassword are required' });
  }
  if (String(newPassword).length < 6) {
    return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
  }

  const user = await User.findById(req.user._id);
  if (!user || !(await user.comparePassword(currentPassword))) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }

  user.passwordHash = newPassword; // re-hashed by the model's pre-save hook
  await user.save();
  res.json({ success: true, message: 'Password updated' });
});

module.exports = { getProfile, updateProfile, changePassword };
