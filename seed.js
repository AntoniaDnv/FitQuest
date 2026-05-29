require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/User');
const Goal = require('./models/Goal');
const Workout = require('./models/Workout');
const Challenge = require('./models/Challenge');
const Notification = require('./models/Notification');
const Log = require('./models/Log');
const AIWorkoutPlan = require('./models/AIWorkoutPlan');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Goal.deleteMany({}),
    Workout.deleteMany({}),
    Challenge.deleteMany({}),
    Notification.deleteMany({}),
    Log.deleteMany({}),
    AIWorkoutPlan.deleteMany({}),
  ]);
  console.log('Database cleared');

  // ---- USERS ----
  const salt = await bcrypt.genSalt(12);
  const hashedPass = await bcrypt.hash('Password123!', salt);

  const [admin, antonia, mireya, stefan, hristofor] = await User.insertMany([
    {
      username: 'admin',
      email: 'admin@fitquest.app',
      passwordHash: hashedPass,
      role: 'admin',
      age: 30,
      fitnessLevel: 'advanced',
      goalType: 'general_fitness',
    },
    {
      username: 'antonia',
      email: 'antonia@fitquest.app',
      passwordHash: hashedPass,
      role: 'user',
      age: 22,
      fitnessLevel: 'beginner',
      goalType: 'weight_loss',
    },
    {
      username: 'mireya',
      email: 'mireya@fitquest.app',
      passwordHash: hashedPass,
      role: 'user',
      age: 24,
      fitnessLevel: 'intermediate',
      goalType: 'endurance',
    },
    {
      username: 'stefan',
      email: 'stefan@fitquest.app',
      passwordHash: hashedPass,
      role: 'user',
      age: 25,
      fitnessLevel: 'intermediate',
      goalType: 'muscle_gain',
    },
    {
      username: 'hristofor',
      email: 'hristofor@fitquest.app',
      passwordHash: hashedPass,
      role: 'user',
      age: 23,
      fitnessLevel: 'beginner',
      goalType: 'general_fitness',
    },
  ]);
  console.log('Users seeded (password for all: Password123!)');

  // ---- GOALS ----
  await Goal.insertMany([
    {
      userId: antonia._id,
      title: 'Train 4 times a week',
      description: 'Workout at least 4 days every week for 8 weeks',
      targetValue: 32,
      currentValue: 8,
      unit: 'workouts',
      deadline: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      userId: mireya._id,
      title: 'Run 100 km this month',
      description: 'Total running distance goal for the month',
      targetValue: 100,
      currentValue: 42,
      unit: 'km',
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      userId: stefan._id,
      title: 'Gain 5 kg muscle',
      description: 'Increase lean muscle mass by 5 kg',
      targetValue: 5,
      currentValue: 1.5,
      unit: 'kg',
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
    {
      userId: hristofor._id,
      title: 'Walk 200,000 steps',
      description: 'Cumulative step count challenge',
      targetValue: 200000,
      currentValue: 75000,
      unit: 'steps',
      status: 'active',
    },
    {
      userId: antonia._id,
      title: 'Workout 60 minutes daily',
      description: 'Achieve 60 minutes of exercise per day',
      targetValue: 60,
      currentValue: 60,
      unit: 'minutes',
      status: 'completed',
    },
  ]);
  console.log('Goals seeded');

  // ---- WORKOUTS ----
  await Workout.insertMany([
    {
      userId: antonia._id,
      title: 'Morning Cardio Session',
      type: 'cardio',
      durationMinutes: 35,
      caloriesBurned: 320,
      exercises: [
        { name: 'Treadmill run', durationSeconds: 1200 },
        { name: 'Jump rope', sets: 3, reps: 100 },
        { name: 'Cycling', durationSeconds: 900 },
      ],
      notes: 'Felt great, kept heart rate in zone 3',
    },
    {
      userId: stefan._id,
      title: 'Upper Body Strength',
      type: 'strength',
      durationMinutes: 55,
      caloriesBurned: 410,
      exercises: [
        { name: 'Bench Press', sets: 4, reps: 8, weight: 80 },
        { name: 'Pull-ups', sets: 3, reps: 10 },
        { name: 'Shoulder Press', sets: 3, reps: 10, weight: 50 },
        { name: 'Bicep Curls', sets: 3, reps: 12, weight: 20 },
      ],
      notes: 'New PR on bench press',
    },
    {
      userId: mireya._id,
      title: 'Evening Run',
      type: 'cardio',
      durationMinutes: 45,
      caloriesBurned: 480,
      exercises: [
        { name: 'Outdoor run', durationSeconds: 2700 },
      ],
      notes: 'Ran 7.2 km at steady pace',
    },
    {
      userId: hristofor._id,
      title: 'Full Body Flexibility',
      type: 'flexibility',
      durationMinutes: 30,
      caloriesBurned: 120,
      exercises: [
        { name: 'Sun salutation', sets: 5, reps: 1 },
        { name: 'Pigeon pose', durationSeconds: 120 },
        { name: 'Hamstring stretch', sets: 3, durationSeconds: 60 },
      ],
      notes: 'Great for recovery day',
    },
    {
      userId: antonia._id,
      title: 'HIIT Blast',
      type: 'mixed',
      durationMinutes: 25,
      caloriesBurned: 310,
      exercises: [
        { name: 'Burpees', sets: 4, reps: 15 },
        { name: 'Mountain climbers', sets: 4, reps: 20 },
        { name: 'Jump squats', sets: 3, reps: 15 },
      ],
    },
  ]);
  console.log('Workouts seeded');

  // ---- CHALLENGES ----
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const inSevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const inFourteenDays = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const [stepChallenge, runChallenge, upcomingChallenge] = await Challenge.insertMany([
    {
      title: '10,000 Steps a Day for 7 Days',
      description: 'Walk 10,000 steps every day for a full week. Track your daily step count and update your progress!',
      createdBy: antonia._id,
      participants: [
        { userId: antonia._id, progress: 7000, completed: false, joinedAt: twoDaysAgo },
        { userId: mireya._id, progress: 9500, completed: false, joinedAt: twoDaysAgo },
        { userId: hristofor._id, progress: 10000, completed: true, joinedAt: twoDaysAgo },
        { userId: stefan._id, progress: 4200, completed: false, joinedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
      ],
      targetValue: 10000,
      unit: 'steps',
      startDate: twoDaysAgo,
      endDate: inSevenDays,
      status: 'active',
      isPublic: true,
    },
    {
      title: 'Run 50 km in 2 Weeks',
      description: 'Log a cumulative distance of 50 km over 14 days. Any pace counts!',
      createdBy: mireya._id,
      participants: [
        { userId: mireya._id, progress: 18, completed: false, joinedAt: twoDaysAgo },
        { userId: antonia._id, progress: 12, completed: false, joinedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
      ],
      targetValue: 50,
      unit: 'km',
      startDate: twoDaysAgo,
      endDate: inFourteenDays,
      status: 'active',
      isPublic: true,
    },
    {
      title: '30-Minute Daily Workout Streak',
      description: 'Complete at least 30 minutes of exercise every day for 5 days.',
      createdBy: stefan._id,
      participants: [],
      targetValue: 5,
      unit: 'workouts',
      startDate: tomorrow,
      endDate: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000),
      status: 'upcoming',
      isPublic: true,
    },
  ]);
  console.log('Challenges seeded');

  // ---- NOTIFICATIONS ----
  await Notification.insertMany([
    {
      userId: antonia._id,
      type: 'challenge',
      message: 'Mireya joined your "10,000 Steps a Day" challenge!',
      isRead: false,
      relatedEntityId: stepChallenge._id,
    },
    {
      userId: antonia._id,
      type: 'progress',
      message: 'Hristofor completed the "10,000 Steps" challenge — great inspiration!',
      isRead: true,
      relatedEntityId: stepChallenge._id,
    },
    {
      userId: mireya._id,
      type: 'progress',
      message: 'You reached 50% of the "Run 50 km" challenge! Keep going!',
      isRead: false,
      relatedEntityId: runChallenge._id,
    },
    {
      userId: hristofor._id,
      type: 'progress',
      message: 'Congratulations! You completed the "10,000 Steps" challenge!',
      isRead: false,
      relatedEntityId: stepChallenge._id,
    },
    {
      userId: stefan._id,
      type: 'system',
      message: 'Welcome to FitQuest! Start your fitness journey by creating your first goal.',
      isRead: false,
    },
  ]);
  console.log('Notifications seeded');

  // ---- LOGS ----
  await Log.insertMany([
    { userId: antonia._id, action: 'USER_REGISTERED', entityType: 'user', entityId: antonia._id, metadata: { username: 'antonia' } },
    { userId: mireya._id, action: 'USER_REGISTERED', entityType: 'user', entityId: mireya._id, metadata: { username: 'mireya' } },
    { userId: stefan._id, action: 'USER_REGISTERED', entityType: 'user', entityId: stefan._id, metadata: { username: 'stefan' } },
    { userId: hristofor._id, action: 'USER_REGISTERED', entityType: 'user', entityId: hristofor._id, metadata: { username: 'hristofor' } },
    { userId: antonia._id, action: 'USER_LOGIN', entityType: 'auth', metadata: { ip: '127.0.0.1' } },
    { userId: antonia._id, action: 'CHALLENGE_CREATED', entityType: 'challenge', entityId: stepChallenge._id, metadata: { title: stepChallenge.title } },
    { userId: mireya._id, action: 'CHALLENGE_JOINED', entityType: 'challenge', entityId: stepChallenge._id, metadata: { title: stepChallenge.title } },
    { userId: hristofor._id, action: 'PROGRESS_UPDATED', entityType: 'challenge', entityId: stepChallenge._id, metadata: { progress: 10000 } },
  ]);
  console.log('Logs seeded');

  // ---- AI WORKOUT PLAN ----
  await AIWorkoutPlan.insertMany([
    {
      userId: antonia._id,
      goal: 'weight loss',
      fitnessLevel: 'beginner',
      availableDays: 4,
      workoutDurationMinutes: 45,
      limitations: 'no high-impact knee exercises',
      prompt: 'Create a safe weekly workout plan for weight loss for a beginner with 4 days, 45 min, no knee-intensive exercises.',
      response: {
        weeklyPlan: {
          Monday: ['30 min brisk walk', '15 min core work'],
          Wednesday: ['Cycling 30 min', 'Upper body strength 15 min'],
          Friday: ['Swimming 40 min', 'Stretching 5 min'],
          Sunday: ['Yoga 45 min'],
        },
        exercises: ['Walking', 'Cycling', 'Swimming', 'Core exercises', 'Yoga'],
        difficulty: 'beginner-friendly',
        safetyNotes: 'Avoid running or jumping. Focus on low-impact cardio. Stay hydrated. Consult a doctor before starting.',
      },
      isValidated: true,
    },
  ]);
  console.log('AI Workout Plan seeded');

  console.log('\n✅ Seed complete!');
  console.log('Demo accounts (password: Password123!):');
  console.log('  admin@fitquest.app — role: admin');
  console.log('  antonia@fitquest.app — role: user');
  console.log('  mireya@fitquest.app  — role: user');
  console.log('  stefan@fitquest.app  — role: user');
  console.log('  hristofor@fitquest.app — role: user');

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  mongoose.disconnect();
  process.exit(1);
});
