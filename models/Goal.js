const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Goal title is required'],
      trim: true,
      maxlength: [100, 'Title must not exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description must not exceed 500 characters'],
    },
    targetValue: {
      type: Number,
      required: [true, 'Target value is required'],
      min: [1, 'Target value must be positive'],
    },
    currentValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['kg', 'steps', 'workouts', 'minutes', 'km'],
      required: [true, 'Unit is required'],
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'failed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

goalSchema.virtual('progressPercent').get(function () {
  if (this.targetValue === 0) return 0;
  return Math.min(100, Math.round((this.currentValue / this.targetValue) * 100));
});

goalSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Goal', goalSchema);
