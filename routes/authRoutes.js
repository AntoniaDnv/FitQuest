// Auth routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Христофор's middleware
const { register, login, me, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', protect, logout);

module.exports = router;
