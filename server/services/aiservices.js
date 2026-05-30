// server/services/aiService.js
/**
 * AI Service
 * Handles all AI-related functionality including:
 * - Workout plan generation
 * - Challenge suggestions
 * - Progress analysis
 * - AI output validation
 */

const axios = require('axios');
const AIWorkoutPlan = require('../models/AIWorkoutPlan');
const Log = require('../models/Log');
const User = require('../models/User');

const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'gpt-3.5-turbo';
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';

class AIService {
  /**
   * Generate AI Workout Plan
   * @param {String} userId - User ID
   * @param {Object} data - User fitness data
   * @returns {Promise<Object>} - AI generated workout plan
   */
  async generateWorkoutPlan(userId, data) {
    try {
      // Validate input
      if (!userId || !data) {
        throw new Error('Missing user ID or fitness data');
      }

      const { goal, fitnessLevel, availableDays, workoutDuration, limitations } = data;

      // Validate required fields
      if (!goal || !fitnessLevel || !availableDays) {
        throw new Error('Missing required fitness data: goal, fitnessLevel, availableDays');
      }

      // Create prompt
      const prompt = this.createWorkoutPlanPrompt({
        goal,
        fitnessLevel,
        availableDays,
        workoutDuration: workoutDuration || 45,
        limitations: limitations || 'none'
      });

      // Call OpenAI API
      const aiResponse = await this.callOpenAI(prompt);

      // Validate AI response
      const validatedResponse = this.validateWorkoutPlan(aiResponse);

      // Save to database
      const aiPlan = new AIWorkoutPlan({
        userId,
        goal,
        fitnessLevel,
        availableDays,
        limitations: limitations || 'none',
        prompt,
        response: validatedResponse,
        isValidated: true,
        createdAt: new Date()
      });

      await aiPlan.save();

      // Log this action
      await this.logAction(userId, 'AI_PLAN_GENERATED', 'ai', aiPlan._id, {
        goal,
        fitnessLevel,
        availableDays
      });

      return {
        success: true,
        data: validatedResponse,
        planId: aiPlan._id,
        disclaimer: 'This is not medical advice. Consult a healthcare professional before starting any new exercise program.'
      };

    } catch (error) {
      console.error('Error generating workout plan:', error.message);
      throw new Error(`Failed to generate workout plan: ${error.message}`);
    }
  }

  /**
   * Suggest AI Challenge
   * @param {String} userId - User ID
   * @param {Object} data - User activity data
   * @returns {Promise<Object>} - AI suggested challenge
   */
  async suggestChallenge(userId, data) {
    try {
      const { goal, recentWorkouts, fitnessLevel } = data;

      if (!goal || !fitnessLevel) {
        throw new Error('Missing required data: goal, fitnessLevel');
      }

      const prompt = this.createChallengeSuggestionPrompt({
        goal,
        recentWorkouts: recentWorkouts || [],
        fitnessLevel
      });

      const aiResponse = await this.callOpenAI(prompt);
      const validatedResponse = this.validateChallengeSuggestion(aiResponse);

      await this.logAction(userId, 'AI_CHALLENGE_SUGGESTED', 'ai', null, {
        goal,
        fitnessLevel
      });

      return {
        success: true,
        data: validatedResponse,
        disclaimer: 'This is a suggestion based on your fitness history.'
      };

    } catch (error) {
      console.error('Error suggesting challenge:', error.message);
      throw new Error(`Failed to suggest challenge: ${error.message}`);
    }
  }

  /**
   * Analyze User Progress
   * @param {String} userId - User ID
   * @param {Object} data - Progress data
   * @returns {Promise<Object>} - AI analysis
   */
  async analyzeProgress(userId, data) {
    try {
      const { workoutsCompleted, totalMinutes, challengeProgress, goal } = data;

      if (!workoutsCompleted || !totalMinutes || !goal) {
        throw new Error('Missing required progress data');
      }

      const prompt = this.createProgressAnalysisPrompt({
        workoutsCompleted,
        totalMinutes,
        challengeProgress: challengeProgress || 0,
        goal
      });

      const aiResponse = await this.callOpenAI(prompt);

      // Validate response is not empty
      if (!aiResponse || aiResponse.trim().length === 0) {
        throw new Error('Empty AI response');
      }

      await this.logAction(userId, 'AI_PROGRESS_ANALYZED', 'ai', null, {
        goal,
        workoutsCompleted
      });

      return {
        success: true,
        data: {
          summary: aiResponse,
          analyzedAt: new Date()
        },
        disclaimer: 'This is an AI-generated motivational summary, not professional fitness advice.'
      };

    } catch (error) {
      console.error('Error analyzing progress:', error.message);
      throw new Error(`Failed to analyze progress: ${error.message}`);
    }
  }

  /**
   * Create Workout Plan Prompt
   * @private
   */
  createWorkoutPlanPrompt(data) {
    return `You are a professional fitness coaching assistant integrated into a fitness tracking web application called FitQuest.

Create a safe and effective weekly workout plan for this user:

Goal: ${data.goal}
Fitness Level: ${data.fitnessLevel}
Available Days Per Week: ${data.availableDays}
Workout Duration: ${data.workoutDuration} minutes per session
Limitations/Injuries: ${data.limitations}

Requirements:
1. Return ONLY a valid JSON object, no markdown, no preamble
2. The JSON must have this exact structure:
{
  "weeklyPlan": [
    {
      "day": "Monday",
      "type": "cardio|strength|flexibility|mixed",
      "exercises": [
        {
          "name": "Exercise name",
          "sets": 3,
          "reps": 10,
          "duration": "30 seconds",
          "notes": "form tips"
        }
      ],
      "totalDuration": 45,
      "intensity": "low|moderate|high"
    }
  ],
  "safetyNotes": ["note1", "note2"],
  "disclaimer": "This is not medical advice. Consult a healthcare professional before starting.",
  "difficulty": "beginner|intermediate|advanced"
}

IMPORTANT: Avoid exercises that could cause injury for the user's limitations. Be specific about form and safety.`;
  }

  /**
   * Create Challenge Suggestion Prompt
   * @private
   */
  createChallengeSuggestionPrompt(data) {
    return `You are a fitness challenge recommendation system for a social fitness platform.

Based on this user's fitness profile, suggest ONE realistic and engaging fitness challenge:

User Goal: ${data.goal}
Fitness Level: ${data.fitnessLevel}
Recent Workouts: ${data.recentWorkouts.length > 0 ? data.recentWorkouts.join(', ') : 'None yet'}

Requirements:
1. Return ONLY valid JSON, no markdown
2. The challenge should be realistic for their level
3. Make it social and motivating
4. JSON structure:
{
  "challengeTitle": "Challenge name",
  "description": "What to do",
  "targetValue": 10000,
  "unit": "steps|workouts|minutes|km",
  "durationDays": 7,
  "difficulty": "easy|medium|hard",
  "motivation": "Why this challenge is good for them"
}`;
  }

  /**
   * Create Progress Analysis Prompt
   * @private
   */
  createProgressAnalysisPrompt(data) {
    return `You are a motivational fitness coach analyzing user progress.

User's Week:
- Goal: ${data.goal}
- Workouts Completed: ${data.workoutsCompleted}
- Total Exercise Time: ${data.totalMinutes} minutes
- Challenge Progress: ${data.challengeProgress}%

Provide:
1. A brief (2-3 sentences) motivational summary
2. ONE specific improvement suggestion

Keep it encouraging and actionable. NO JSON required, just plain text.`;
  }

  /**
   * Call OpenAI API
   * @private
   */
  async callOpenAI(prompt) {
    try {
      if (!AI_API_KEY) {
        throw new Error('AI_API_KEY is not configured');
      }

      const response = await axios.post(AI_API_URL, {
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a professional fitness coaching assistant. Return valid JSON or plain text as requested. Never include medical diagnoses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
        top_p: 0.9
      }, {
        headers: {
          'Authorization': `Bearer ${AI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.data || !response.data.choices || response.data.choices.length === 0) {
        throw new Error('Invalid response from AI service');
      }

      return response.data.choices[0].message.content;

    } catch (error) {
      console.error('OpenAI API Error:', error.response?.data || error.message);
      throw new Error(`AI Service Error: ${error.message}`);
    }
  }

  /**
   * Validate Workout Plan Response
   * @private
   */
  validateWorkoutPlan(response) {
    try {
      let parsed;

      // Try to parse JSON
      try {
        parsed = JSON.parse(response);
      } catch (e) {
        // If not valid JSON, extract JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No valid JSON found in response');
        }
        parsed = JSON.parse(jsonMatch[0]);
      }

      // Validate structure
      if (!parsed.weeklyPlan || !Array.isArray(parsed.weeklyPlan)) {
        throw new Error('Invalid weeklyPlan structure');
      }

      if (!parsed.safetyNotes || !Array.isArray(parsed.safetyNotes)) {
        throw new Error('Missing safetyNotes');
      }

      // Check for dangerous exercises
      const dangerousKeywords = ['risky', 'dangerous', 'extreme', 'without supervision'];
      const responseStr = JSON.stringify(parsed).toLowerCase();
      const hasDangerous = dangerousKeywords.some(keyword => responseStr.includes(keyword));

      if (hasDangerous) {
        parsed.flagged = true;
        parsed.flagReason = 'Contains potentially dangerous exercises';
      }

      return parsed;

    } catch (error) {
      console.error('Validation error:', error.message);
      throw new Error(`Invalid workout plan format: ${error.message}`);
    }
  }

  /**
   * Validate Challenge Suggestion
   * @private
   */
  validateChallengeSuggestion(response) {
    try {
      let parsed;

      try {
        parsed = JSON.parse(response);
      } catch (e) {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No valid JSON found');
        }
        parsed = JSON.parse(jsonMatch[0]);
      }

      // Validate required fields
      const requiredFields = ['challengeTitle', 'description', 'targetValue', 'unit', 'durationDays'];
      for (const field of requiredFields) {
        if (!parsed[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Validate unit
      const validUnits = ['steps', 'workouts', 'minutes', 'km'];
      if (!validUnits.includes(parsed.unit)) {
        throw new Error(`Invalid unit: ${parsed.unit}`);
      }

      return parsed;

    } catch (error) {
      console.error('Challenge validation error:', error.message);
      throw new Error(`Invalid challenge suggestion format: ${error.message}`);
    }
  }

  /**
   * Log Action
   * @private
   */
  async logAction(userId, action, entityType, entityId, metadata = {}) {
    try {
      const log = new Log({
        userId,
        action,
        entityType,
        entityId,
        metadata,
        createdAt: new Date()
      });
      await log.save();
    } catch (error) {
      console.error('Error logging action:', error.message);
    }
  }

  /**
   * Get All AI Outputs (Admin)
   */
  async getAllAIOutputs(limit = 50, page = 1) {
    try {
      const skip = (page - 1) * limit;

      const outputs = await AIWorkoutPlan.find()
        .populate('userId', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await AIWorkoutPlan.countDocuments();

      return {
        success: true,
        data: outputs,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      };

    } catch (error) {
      throw new Error(`Failed to fetch AI outputs: ${error.message}`);
    }
  }

  /**
   * Delete AI Output (Admin)
   */
  async deleteAIOutput(outputId) {
    try {
      const output = await AIWorkoutPlan.findByIdAndDelete(outputId);

      if (!output) {
        throw new Error('AI output not found');
      }

      await this.logAction(null, 'AI_OUTPUT_DELETED', 'ai', outputId, {});

      return {
        success: true,
        message: 'AI output deleted successfully'
      };

    } catch (error) {
      throw new Error(`Failed to delete AI output: ${error.message}`);
    }
  }

  /**
   * Validate AI Output (Admin)
   */
  async validateAIOutput(outputId) {
    try {
      const output = await AIWorkoutPlan.findById(outputId);

      if (!output) {
        throw new Error('AI output not found');
      }

      output.isValidated = true;
      await output.save();

      await this.logAction(null, 'AI_OUTPUT_VALIDATED', 'ai', outputId, {});

      return {
        success: true,
        message: 'AI output validated successfully'
      };

    } catch (error) {
      throw new Error(`Failed to validate AI output: ${error.message}`);
    }
  }
}

module.exports = new AIService();