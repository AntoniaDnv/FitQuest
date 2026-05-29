const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 0 },
    reps: { type: Number, min: 0 },
    weight: { type: Number, min: 0 },
    durationSeconds: { type: Number, min: 0 },
  },
  { _id: false }
);

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Workout title is required'],
      trim: true,
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    type: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'mixed'],
      required: [true, 'Workout type is required'],
    },
    durationMinutes: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    exercises: {
      type: [exerciseSchema],
      default: [],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes must not exceed 1000 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
