// Workout routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const {
  listWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');

router.use(protect);

router.route('/').get(listWorkouts).post(createWorkout);
router
  .route('/:id')
  .get(validateObjectId('id'), getWorkout)
  .put(validateObjectId('id'), updateWorkout)
  .delete(validateObjectId('id'), deleteWorkout);

module.exports = router;
