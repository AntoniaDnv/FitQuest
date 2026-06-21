// Auth controller (Stefan) — built on Христофор's User model, JWT secret and Log helper.
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');

const ALLOWED_FITNESS = ['beginner', 'intermediate', 'advanced'];
const ALLOWED_GOAL_TYPES = ['weight_loss', 'muscle_gain', 'endurance', 'general_fitness'];

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { username, email, password, age, fitnessLevel, goalType } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'username, email and password are required' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
  if (exists) {
    return res.status(409).json({ success: false, message: 'Email or username already in use' });
  }

  // NB: the User model hashes passwordHash in a pre-save hook, so we pass the raw password here.
  const user = await User.create({
    username,
    email,
    passwordHash: password,
    age,
    fitnessLevel: ALLOWED_FITNESS.includes(fitnessLevel) ? fitnessLevel : undefined,
    goalType: ALLOWED_GOAL_TYPES.includes(goalType) ? goalType : undefined,
  });

  await createLog({
    userId: user._id,
    action: 'USER_REGISTERED',
    entityType: 'user',
    entityId: user._id,
    metadata: { username: user.username },
    ip: req.ip,
  });

  const token = generateToken(user);
  res.status(201).json({ success: true, token, user: user.toPublic() });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  if (user.isBanned) {
    return res.status(403).json({ success: false, message: 'Account is banned' });
  }

  await createLog({
    userId: user._id,
    action: 'USER_LOGIN',
    entityType: 'auth',
    metadata: { email: user.email },
    ip: req.ip,
  });

  const token = generateToken(user);
  res.json({ success: true, token, user: user.toPublic() });
});

// GET /api/auth/me  (protect)
const me = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// POST /api/auth/logout  (protect) — stateless JWT, we just log the event
const logout = asyncHandler(async (req, res) => {
  await createLog({
    userId: req.user._id,
    action: 'USER_LOGOUT',
    entityType: 'auth',
    ip: req.ip,
  });
  res.json({ success: true, message: 'Logged out' });
});

module.exports = { register, login, me, logout };
