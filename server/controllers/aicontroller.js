// server/controllers/aiController.js
/**
 * AI Controller
 * Handles all AI-related endpoints
 */

const aiService = require('../services/aiService');

class AIController {
  /**
   * Generate Workout Plan
   * POST /api/ai/workout-plan
   * @access Private
   */
  async generateWorkoutPlan(req, res) {
    try {
      const { goal, fitnessLevel, availableDays, workoutDuration, limitations } = req.body;

      // Validate input
      if (!goal || !fitnessLevel || !availableDays) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: goal, fitnessLevel, availableDays'
        });
      }

      // Validate availableDays
      if (availableDays < 1 || availableDays > 7) {
        return res.status(400).json({
          success: false,
          message: 'availableDays must be between 1 and 7'
        });
      }

      // Validate fitnessLevel
      const validLevels = ['beginner', 'intermediate', 'advanced'];
      if (!validLevels.includes(fitnessLevel.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid fitnessLevel. Must be: beginner, intermediate, or advanced'
        });
      }

      const result = await aiService.generateWorkoutPlan(req.user.id, {
        goal,
        fitnessLevel: fitnessLevel.toLowerCase(),
        availableDays: parseInt(availableDays),
        workoutDuration: workoutDuration || 45,
        limitations: limitations || 'none'
      });

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Suggest Challenge
   * POST /api/ai/challenge-suggestion
   * @access Private
   */
  async suggestChallenge(req, res) {
    try {
      const { goal, fitnessLevel, recentWorkouts } = req.body;

      if (!goal || !fitnessLevel) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: goal, fitnessLevel'
        });
      }

      const result = await aiService.suggestChallenge(req.user.id, {
        goal,
        fitnessLevel: fitnessLevel.toLowerCase(),
        recentWorkouts: recentWorkouts || []
      });

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Analyze Progress
   * POST /api/ai/progress-analysis
   * @access Private
   */
  async analyzeProgress(req, res) {
    try {
      const { workoutsCompleted, totalMinutes, challengeProgress, goal } = req.body;

      if (!goal || workoutsCompleted === undefined || !totalMinutes) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: goal, workoutsCompleted, totalMinutes'
        });
      }

      const result = await aiService.analyzeProgress(req.user.id, {
        workoutsCompleted: parseInt(workoutsCompleted),
        totalMinutes: parseInt(totalMinutes),
        challengeProgress: challengeProgress || 0,
        goal
      });

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get All AI Outputs (Admin)
   * GET /api/admin/ai-outputs
   * @access Admin
   */
  async getAllAIOutputs(req, res) {
    try {
      const { limit = 50, page = 1 } = req.query;

      const result = await aiService.getAllAIOutputs(
        parseInt(limit),
        parseInt(page)
      );

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Validate AI Output (Admin)
   * PUT /api/admin/ai-outputs/:id/validate
   * @access Admin
   */
  async validateAIOutput(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'AI output ID is required'
        });
      }

      const result = await aiService.validateAIOutput(id);

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Delete AI Output (Admin)
   * DELETE /api/admin/ai-outputs/:id
   * @access Admin
   */
  async deleteAIOutput(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'AI output ID is required'
        });
      }

      const result = await aiService.deleteAIOutput(id);

      return res.status(200).json(result);

    } catch (error) {
      console.error('AI Controller Error:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new AIController();