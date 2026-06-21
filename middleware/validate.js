// Validation helpers (Stefan). Lives alongside Христофор's auth.js — does not modify it.
const mongoose = require('mongoose');

// Reject malformed :id params early with a clean 400 instead of a cast error 500.
const validateObjectId = (paramName = 'id') => (req, res, next) => {
  const value = req.params[paramName];
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({ success: false, message: `Invalid ${paramName}` });
  }
  next();
};

// Tiny required-fields guard for request bodies.
const requireFields = (...fields) => (req, res, next) => {
  const missing = fields.filter(
    (f) => req.body[f] === undefined || req.body[f] === null || req.body[f] === ''
  );
  if (missing.length) {
    return res.status(400).json({
      success: false,
      message: `Missing required field(s): ${missing.join(', ')}`,
    });
  }
  next();
};

module.exports = { validateObjectId, requireFields };
