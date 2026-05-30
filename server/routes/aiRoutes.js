// server/routes/aiRoutes.js
/**
 * AI Routes
 * Endpoints for AI functionality
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All AI routes require authentication
router.use(authMiddleware);

/**
 * User Routes (Protected - authenticated users only)
 */

// Generate AI Workout Plan
router.post('/workout-plan', aiController.generateWorkoutPlan);

// Get AI Challenge Suggestion
router.post('/challenge-suggestion', aiController.suggestChallenge);

// Get AI Progress Analysis
router.post('/progress-analysis', aiController.analyzeProgress);

/**
 * Admin Routes (Protected - admin only)
 */

// Get all AI outputs
router.get('/admin/outputs', 
  roleMiddleware(['admin']), 
  aiController.getAllAIOutputs
);

// Validate AI output
router.put('/admin/outputs/:id/validate',
  roleMiddleware(['admin']),
  aiController.validateAIOutput
);

// Delete AI output
router.delete('/admin/outputs/:id',
  roleMiddleware(['admin']),
  aiController.deleteAIOutput
);

module.exports = router;