// Goal Model
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  // Add goal fields here
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
