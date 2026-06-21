// Challenge routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const {
  listChallenges,
  getChallenge,
  createChallenge,
  joinChallenge,
  leaveChallenge,
  deleteChallenge,
} = require('../controllers/challengeController');

router.use(protect);

router.route('/').get(listChallenges).post(createChallenge);
router.route('/:id').get(validateObjectId('id'), getChallenge).delete(validateObjectId('id'), deleteChallenge);
router.post('/:id/join', validateObjectId('id'), joinChallenge);
router.post('/:id/leave', validateObjectId('id'), leaveChallenge);

module.exports = router;
