// Goal routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const { listGoals, getGoal, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

router.use(protect); // all goal routes require auth

router.route('/').get(listGoals).post(createGoal);
router
  .route('/:id')
  .get(validateObjectId('id'), getGoal)
  .put(validateObjectId('id'), updateGoal)
  .delete(validateObjectId('id'), deleteGoal);

module.exports = router;
