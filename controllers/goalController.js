// Goal controller (Stefan) — CRUD over Христофор's Goal model, scoped to the logged-in user.
const Goal = require('../models/Goal');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');

const VALID_UNITS = ['kg', 'steps', 'workouts', 'minutes', 'km'];

// Re-derive status from progress so the UI stays consistent.
const deriveStatus = (goal) => {
  if (goal.currentValue >= goal.targetValue) return 'completed';
  if (goal.deadline && new Date(goal.deadline) < new Date() && goal.currentValue < goal.targetValue) {
    return 'failed';
  }
  return goal.status === 'completed' ? 'active' : goal.status || 'active';
};

// GET /api/goals
const listGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: goals.length, goals });
});

// GET /api/goals/:id
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id });
  if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });
  res.json({ success: true, goal });
});

// POST /api/goals
const createGoal = asyncHandler(async (req, res) => {
  const { title, description, targetValue, currentValue, unit, deadline } = req.body;
  if (!title || targetValue === undefined || !unit) {
    return res.status(400).json({ success: false, message: 'title, targetValue and unit are required' });
  }
  if (!VALID_UNITS.includes(unit)) {
    return res.status(400).json({ success: false, message: `unit must be one of: ${VALID_UNITS.join(', ')}` });
  }

  const goal = await Goal.create({
    userId: req.user._id,
    title,
    description,
    targetValue,
    currentValue: currentValue || 0,
    unit,
    deadline: deadline || undefined,
  });
  goal.status = deriveStatus(goal);
  await goal.save();

  await createLog({
    userId: req.user._id,
    action: 'GOAL_CREATED',
    entityType: 'goal',
    entityId: goal._id,
    metadata: { title: goal.title },
  });

  res.status(201).json({ success: true, goal });
});

// PUT /api/goals/:id
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, userId: req.user._id });
  if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });

  const { title, description, targetValue, currentValue, unit, deadline, status } = req.body;
  if (title !== undefined) goal.title = title;
  if (description !== undefined) goal.description = description;
  if (targetValue !== undefined) goal.targetValue = targetValue;
  if (currentValue !== undefined) goal.currentValue = currentValue;
  if (unit !== undefined) {
    if (!VALID_UNITS.includes(unit)) {
      return res.status(400).json({ success: false, message: `unit must be one of: ${VALID_UNITS.join(', ')}` });
    }
    goal.unit = unit;
  }
  if (deadline !== undefined) goal.deadline = deadline || undefined;
  if (status !== undefined) goal.status = status;
  goal.status = deriveStatus(goal);

  await goal.save();
  await createLog({
    userId: req.user._id,
    action: 'GOAL_UPDATED',
    entityType: 'goal',
    entityId: goal._id,
    metadata: { currentValue: goal.currentValue },
  });

  res.json({ success: true, goal });
});

// DELETE /api/goals/:id
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!goal) return res.status(404).json({ success: false, message: 'Goal not found' });

  await createLog({
    userId: req.user._id,
    action: 'GOAL_DELETED',
    entityType: 'goal',
    entityId: goal._id,
    metadata: { title: goal.title },
  });

  res.json({ success: true, message: 'Goal deleted' });
});

module.exports = { listGoals, getGoal, createGoal, updateGoal, deleteGoal };
