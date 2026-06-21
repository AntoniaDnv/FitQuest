// JWT token generator (Stefan).
// Payload uses { id, username } to match Христофор's auth middleware (decoded.id)
// and his Socket.IO handshake auth (decoded.id, decoded.username) — DO NOT change the shape.
const jwt = require('jsonwebtoken');

const generateToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

module.exports = generateToken;
