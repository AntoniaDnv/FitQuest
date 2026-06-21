// AI workout plan routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const { generate, listPlans, getPlan } = require('../controllers/aiController');

router.use(protect);

router.post('/generate', generate);
router.get('/plans', listPlans);
router.get('/plans/:id', validateObjectId('id'), getPlan);

module.exports = router;
