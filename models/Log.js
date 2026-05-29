const mongoose = require('mongoose');

const logSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: [
        'USER_REGISTERED',
        'USER_LOGIN',
        'USER_LOGOUT',
        'GOAL_CREATED',
        'GOAL_UPDATED',
        'GOAL_DELETED',
        'WORKOUT_CREATED',
        'WORKOUT_UPDATED',
        'WORKOUT_DELETED',
        'CHALLENGE_CREATED',
        'CHALLENGE_JOINED',
        'CHALLENGE_LEFT',
        'CHALLENGE_DELETED',
        'PROGRESS_UPDATED',
        'AI_PLAN_GENERATED',
        'ADMIN_USER_BANNED',
        'ADMIN_USER_DELETED',
        'CONTENT_MODERATED',
        'NOTIFICATION_SENT',
      ],
    },
    entityType: {
      type: String,
      enum: ['user', 'goal', 'workout', 'challenge', 'ai', 'auth', 'system'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ip: {
      type: String,
    },
  },
  { timestamps: true }
);

logSchema.index({ action: 1, createdAt: -1 });
logSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Log', logSchema);
