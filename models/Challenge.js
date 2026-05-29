const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    progress: { type: Number, default: 0, min: 0 },
    completed: { type: Boolean, default: false },
    joinedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Challenge title is required'],
      trim: true,
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must not exceed 500 characters'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    participants: {
      type: [participantSchema],
      default: [],
    },
    targetValue: {
      type: Number,
      required: [true, 'Target value is required'],
      min: [1, 'Target value must be positive'],
    },
    unit: {
      type: String,
      enum: ['steps', 'workouts', 'minutes', 'km'],
      required: [true, 'Unit is required'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'active', 'completed'],
      default: 'upcoming',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

challengeSchema.virtual('leaderboard').get(function () {
  return [...this.participants]
    .sort((a, b) => b.progress - a.progress)
    .map((p, i) => ({ rank: i + 1, userId: p.userId, progress: p.progress, completed: p.completed }));
});

challengeSchema.set('toJSON', { virtuals: true });

challengeSchema.pre('save', function (next) {
  const now = new Date();
  if (now < this.startDate) {
    this.status = 'upcoming';
  } else if (now > this.endDate) {
    this.status = 'completed';
  } else {
    this.status = 'active';
  }
  next();
});

module.exports = mongoose.model('Challenge', challengeSchema);
