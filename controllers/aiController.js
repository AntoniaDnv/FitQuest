// AI workout plan controller (Stefan) — persists to Христофор's AIWorkoutPlan model.
const AIWorkoutPlan = require('../models/AIWorkoutPlan');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');
const { generatePlan, buildPrompt } = require('../services/aiService');

const ALLOWED_FITNESS = ['beginner', 'intermediate', 'advanced'];

// POST /api/ai/generate
const generate = asyncHandler(async (req, res) => {
  const { goal, fitnessLevel, availableDays, workoutDurationMinutes, limitations } = req.body;
  if (!goal || !fitnessLevel || availableDays === undefined) {
    return res.status(400).json({ success: false, message: 'goal, fitnessLevel and availableDays are required' });
  }
  if (!ALLOWED_FITNESS.includes(fitnessLevel)) {
    return res.status(400).json({ success: false, message: `fitnessLevel must be one of: ${ALLOWED_FITNESS.join(', ')}` });
  }
  const days = Number(availableDays);
  if (Number.isNaN(days) || days < 1 || days > 7) {
    return res.status(400).json({ success: false, message: 'availableDays must be between 1 and 7' });
  }

  const params = {
    goal,
    fitnessLevel,
    availableDays: days,
    workoutDurationMinutes: workoutDurationMinutes || 45,
    limitations,
  };
  const response = generatePlan(params);

  const plan = await AIWorkoutPlan.create({
    userId: req.user._id,
    goal,
    fitnessLevel,
    availableDays: days,
    workoutDurationMinutes: params.workoutDurationMinutes,
    limitations,
    prompt: buildPrompt(params),
    response,
    isValidated: false,
  });

  await createLog({
    userId: req.user._id,
    action: 'AI_PLAN_GENERATED',
    entityType: 'ai',
    entityId: plan._id,
    metadata: { goal, fitnessLevel },
  });

  res.status(201).json({ success: true, plan });
});

// GET /api/ai/plans
const listPlans = asyncHandler(async (req, res) => {
  const plans = await AIWorkoutPlan.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: plans.length, plans });
});

// GET /api/ai/plans/:id
const getPlan = asyncHandler(async (req, res) => {
  const plan = await AIWorkoutPlan.findOne({ _id: req.params.id, userId: req.user._id });
  if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
  res.json({ success: true, plan });
});

module.exports = { generate, listPlans, getPlan };
