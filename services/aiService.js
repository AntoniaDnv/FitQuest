// AI workout plan service (Stefan + AI-integration slot).
// Deterministic, rule-based generator — no external API/key required, so the demo always works
// offline. Produces the exact response shape Христофор's AIWorkoutPlan.response expects:
//   { weeklyPlan, exercises, difficulty, safetyNotes }
//
// If a real LLM is wired in later, only generatePlan() needs to change; the controller/model
// contract stays identical.

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EXERCISE_BANK = {
  weight_loss: ['Brisk walking', 'Cycling', 'Swimming', 'Rowing', 'Core circuit', 'Bodyweight HIIT'],
  muscle_gain: ['Bench press', 'Squats', 'Deadlifts', 'Pull-ups', 'Shoulder press', 'Barbell rows'],
  endurance: ['Steady-state run', 'Interval sprints', 'Long cycle', 'Tempo run', 'Stair climbing'],
  general_fitness: ['Full-body strength', 'Mobility flow', 'Cardio mix', 'Core stability', 'Yoga'],
};

const FOCUS_BY_DAY = {
  weight_loss: ['Cardio + core', 'Active recovery walk', 'HIIT circuit', 'Cycling + mobility', 'Swim or row', 'Long walk', 'Yoga / rest'],
  muscle_gain: ['Upper body push', 'Lower body', 'Pull + back', 'Rest / mobility', 'Full-body strength', 'Arms + core', 'Rest'],
  endurance: ['Tempo run', 'Cross-train', 'Interval session', 'Easy recovery run', 'Long run', 'Mobility', 'Rest'],
  general_fitness: ['Strength A', 'Cardio', 'Strength B', 'Mobility / yoga', 'Mixed conditioning', 'Active recovery', 'Rest'],
};

const normalizeGoal = (goal = '') => {
  const g = goal.toLowerCase();
  if (g.includes('weight') || g.includes('loss') || g.includes('fat')) return 'weight_loss';
  if (g.includes('muscle') || g.includes('gain') || g.includes('strength') || g.includes('bulk')) return 'muscle_gain';
  if (g.includes('endur') || g.includes('run') || g.includes('cardio') || g.includes('stamina')) return 'endurance';
  return 'general_fitness';
};

const generatePlan = ({ goal, fitnessLevel = 'beginner', availableDays = 3, workoutDurationMinutes = 45, limitations = '' }) => {
  const goalKey = normalizeGoal(goal);
  const days = Math.min(7, Math.max(1, Number(availableDays) || 3));
  const focuses = FOCUS_BY_DAY[goalKey];

  // Spread the chosen number of training days across the week.
  const step = 7 / days;
  const trainingDayIndexes = Array.from({ length: days }, (_, i) => Math.round(i * step)).filter(
    (v, i, a) => a.indexOf(v) === i
  );

  const weeklyPlan = {};
  trainingDayIndexes.forEach((dayIdx, i) => {
    const focus = focuses[i % focuses.length];
    weeklyPlan[DAY_NAMES[dayIdx]] = [
      `${focus} — ${workoutDurationMinutes} min`,
      `Warm-up 5 min + ${fitnessLevel === 'advanced' ? '10' : fitnessLevel === 'intermediate' ? '8' : '5'} min cooldown/stretch`,
    ];
  });

  const safety = [
    'Warm up before and stretch after every session.',
    'Progress gradually — increase intensity by no more than ~10% per week.',
    'Hydrate well and prioritise sleep for recovery.',
  ];
  if (limitations && limitations.trim()) {
    safety.unshift(`Respect your stated limitation: "${limitations.trim()}". Substitute or skip any exercise that aggravates it.`);
  }
  if (fitnessLevel === 'beginner') {
    safety.push('As a beginner, focus on form over weight/speed. Consider a professional check-in before starting.');
  }

  return {
    weeklyPlan,
    exercises: EXERCISE_BANK[goalKey],
    difficulty:
      fitnessLevel === 'advanced'
        ? 'challenging'
        : fitnessLevel === 'intermediate'
        ? 'moderate'
        : 'beginner-friendly',
    safetyNotes: safety.join(' '),
  };
};

const buildPrompt = ({ goal, fitnessLevel, availableDays, workoutDurationMinutes, limitations }) =>
  `Create a safe weekly workout plan for "${goal}" for a ${fitnessLevel} athlete with ${availableDays} training day(s), ` +
  `${workoutDurationMinutes} min per session${limitations ? `, limitations: ${limitations}` : ''}.`;

module.exports = { generatePlan, buildPrompt, normalizeGoal };
