// Workout Model
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  // Add workout fields here
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
