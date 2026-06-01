// Log Model
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  // Add log fields here
}, {
  timestamps: true
});

module.exports = mongoose.model('Log', logSchema);
