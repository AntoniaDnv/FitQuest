// server/models/AIWorkoutPlan.js
/**
 * AIWorkoutPlan Model
 * Stores all AI-generated workout plans
 */

const mongoose = require('mongoose');

const aiWorkoutPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  goal: {
    type: String,
    required: true,
    enum: [
      'weight_loss',
      'muscle_gain',
      'endurance',
      'general_fitness',
      'flexibility',
      'strength',
      'cardio'
    ]
  },

  fitnessLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },

  availableDays: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },

  limitations: {
    type: String,
    default: 'none'
  },

  // The original prompt sent to AI
  prompt: {
    type: String,
    required: true
  },

  // The AI response
  response: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  // Whether this AI output has been reviewed by admin
  isValidated: {
    type: Boolean,
    default: false
  },

  // If flagged for safety concerns
  flagged: {
    type: Boolean,
    default: false
  },

  flagReason: {
    type: String,
    default: null
  },

  // Metadata about the generation
  metadata: {
    aiModel: {
      type: String,
      default: 'gpt-3.5-turbo'
    },
    tokensUsed: {
      type: Number,
      default: 0
    },
    generationTime: {
      type: Number, // milliseconds
      default: 0
    }
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
aiWorkoutPlanSchema.index({ userId: 1, createdAt: -1 });
aiWorkoutPlanSchema.index({ isValidated: 1 });
aiWorkoutPlanSchema.index({ flagged: 1 });

module.exports = mongoose.model('AIWorkoutPlan', aiWorkoutPlanSchema);