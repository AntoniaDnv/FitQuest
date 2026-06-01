// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Add user fields here
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
