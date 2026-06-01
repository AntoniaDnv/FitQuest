// Challenge Model
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  // Add challenge fields here
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);
