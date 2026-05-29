const mongoose = require('mongoose');

const aiWorkoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    goal: {
      type: String,
      required: true,
      trim: true,
    },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    availableDays: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    workoutDurationMinutes: {
      type: Number,
      default: 45,
    },
    limitations: {
      type: String,
      trim: true,
      maxlength: [300, 'Limitations must not exceed 300 characters'],
    },
    prompt: {
      type: String,
      required: true,
    },
    response: {
      weeklyPlan: { type: mongoose.Schema.Types.Mixed },
      exercises: { type: mongoose.Schema.Types.Mixed },
      difficulty: { type: String },
      safetyNotes: { type: String },
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIWorkoutPlan', aiWorkoutPlanSchema);
