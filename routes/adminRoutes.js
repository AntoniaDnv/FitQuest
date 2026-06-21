// Admin routes (Stefan) — every route guarded by Христофор's protect + adminOnly.
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const {
  getStats,
  listUsers,
  toggleBan,
  deleteUser,
  listChallenges,
  deleteChallenge,
  listLogs,
  listAiOutputs,
  reviewAiOutput,
} = require('../controllers/adminController');

router.use(protect, adminOnly);

router.get('/stats', getStats);

router.get('/users', listUsers);
router.put('/users/:id/ban', validateObjectId('id'), toggleBan);
router.delete('/users/:id', validateObjectId('id'), deleteUser);

router.get('/challenges', listChallenges);
router.delete('/challenges/:id', validateObjectId('id'), deleteChallenge);

router.get('/logs', listLogs);

router.get('/ai-outputs', listAiOutputs);
router.put('/ai-outputs/:id/validate', validateObjectId('id'), reviewAiOutput);

module.exports = router;
