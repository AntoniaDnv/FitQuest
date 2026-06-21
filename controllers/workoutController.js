// Workout controller (Stefan) — CRUD over Христофор's Workout model, scoped to the user.
const Workout = require('../models/Workout');
const asyncHandler = require('../utils/asyncHandler');
const { createLog } = require('../utils/logger');

const VALID_TYPES = ['strength', 'cardio', 'flexibility', 'mixed'];

// GET /api/workouts
const listWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, count: workouts.length, workouts });
});

// GET /api/workouts/:id
const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });
  if (!workout) return res.status(404).json({ success: false, message: 'Workout not found' });
  res.json({ success: true, workout });
});

// POST /api/workouts
const createWorkout = asyncHandler(async (req, res) => {
  const { title, type, durationMinutes, caloriesBurned, exercises, notes } = req.body;
  if (!title || !type || durationMinutes === undefined) {
    return res.status(400).json({ success: false, message: 'title, type and durationMinutes are required' });
  }
  if (!VALID_TYPES.includes(type)) {
    return res.status(400).json({ success: false, message: `type must be one of: ${VALID_TYPES.join(', ')}` });
  }

  const workout = await Workout.create({
    userId: req.user._id,
    title,
    type,
    durationMinutes,
    caloriesBurned,
    exercises: Array.isArray(exercises) ? exercises : [],
    notes,
  });

  await createLog({
    userId: req.user._id,
    action: 'WORKOUT_CREATED',
    entityType: 'workout',
    entityId: workout._id,
    metadata: { title: workout.title, type: workout.type },
  });

  res.status(201).json({ success: true, workout });
});

// PUT /api/workouts/:id
const updateWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id, userId: req.user._id });
  if (!workout) return res.status(404).json({ success: false, message: 'Workout not found' });

  const { title, type, durationMinutes, caloriesBurned, exercises, notes } = req.body;
  if (title !== undefined) workout.title = title;
  if (type !== undefined) {
    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({ success: false, message: `type must be one of: ${VALID_TYPES.join(', ')}` });
    }
    workout.type = type;
  }
  if (durationMinutes !== undefined) workout.durationMinutes = durationMinutes;
  if (caloriesBurned !== undefined) workout.caloriesBurned = caloriesBurned;
  if (exercises !== undefined) workout.exercises = Array.isArray(exercises) ? exercises : workout.exercises;
  if (notes !== undefined) workout.notes = notes;

  await workout.save();
  await createLog({
    userId: req.user._id,
    action: 'WORKOUT_UPDATED',
    entityType: 'workout',
    entityId: workout._id,
  });

  res.json({ success: true, workout });
});

// DELETE /api/workouts/:id
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!workout) return res.status(404).json({ success: false, message: 'Workout not found' });

  await createLog({
    userId: req.user._id,
    action: 'WORKOUT_DELETED',
    entityType: 'workout',
    entityId: workout._id,
    metadata: { title: workout.title },
  });

  res.json({ success: true, message: 'Workout deleted' });
});

module.exports = { listWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };
