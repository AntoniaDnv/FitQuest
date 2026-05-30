/**
 * FitQuest Demo Seed Script
 * ─────────────────────────
 * Creates all accounts, goals, workouts, challenges and progress
 * entries needed for the live demo in exactly the right state.
 *
 * Usage:
 *   cd server
 *   node scripts/seedDemo.js
 *
 * Safe to re-run – clears old demo data first.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");

// ── Models ──────────────────────────────────────────────────────────────────
const User          = require("../models/User");
const Goal          = require("../models/Goal");
const Workout       = require("../models/Workout");
const Challenge     = require("../models/Challenge");
const Notification  = require("../models/Notification");
const Log           = require("../models/Log");
const AIWorkoutPlan = require("../models/AIWorkoutPlan");

// ── Helpers ──────────────────────────────────────────────────────────────────
const SALT = 10;
const hash = (pw) => bcrypt.hash(pw, SALT);

function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// ── Seed ─────────────────────────────────────────────────────────────────────
async function seed() {
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fitquest";
  console.log("🔌  Connecting to", MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log("✅  Connected\n");

  // ── 1. Wipe previous demo data ────────────────────────────────────────────
  console.log("🗑   Clearing old demo data …");
  await Promise.all([
    User.deleteMany({}),
    Goal.deleteMany({}),
    Workout.deleteMany({}),
    Challenge.deleteMany({}),
    Notification.deleteMany({}),
    Log.deleteMany({}),
    AIWorkoutPlan.deleteMany({}),
  ]);
  console.log("✅  Cleared\n");

  // ── 2. Create users ───────────────────────────────────────────────────────
  console.log("👤  Creating users …");

  const [
    pwAdmin, pwAntoniya, pwMireya, pwStefan, pwHristofir
  ] = await Promise.all([
    hash("Admin123!"),
    hash("Demo123!"),
    hash("Demo123!"),
    hash("Demo123!"),
    hash("Demo123!"),
  ]);

  const admin = await User.create({
    username:     "admin",
    email:        "admin@fitquest.com",
    passwordHash: pwAdmin,
    role:         "admin",
    age:          30,
    fitnessLevel: "advanced",
    goalType:     "general_fitness",
    isBanned:     false,
  });

  const antoniya = await User.create({
    username:     "antoniya",
    email:        "antoniya@fitquest.com",
    passwordHash: pwAntoniya,
    role:         "user",
    age:          25,
    fitnessLevel: "intermediate",
    goalType:     "general_fitness",
    isBanned:     false,
  });

  const mireya = await User.create({
    username:     "mireya",
    email:        "mireya@fitquest.com",
    passwordHash: pwMireya,
    role:         "user",
    age:          23,
    fitnessLevel: "beginner",
    goalType:     "weight_loss",
    isBanned:     false,
  });

  const stefan = await User.create({
    username:     "stefan",
    email:        "stefan@fitquest.com",
    passwordHash: pwStefan,
    role:         "user",
    age:          27,
    fitnessLevel: "intermediate",
    goalType:     "muscle_gain",
    isBanned:     false,
  });

  const hristofir = await User.create({
    username:     "hristofir",
    email:        "hristofir@fitquest.com",
    passwordHash: pwHristofir,
    role:         "user",
    age:          26,
    fitnessLevel: "intermediate",
    goalType:     "endurance",
    isBanned:     false,
  });

  console.log("   admin       →", admin._id);
  console.log("   antoniya    →", antoniya._id);
  console.log("   mireya      →", mireya._id);
  console.log("   stefan      →", stefan._id);
  console.log("   hristofir   →", hristofir._id);

  // ── 3. Create goals ───────────────────────────────────────────────────────
  console.log("\n🎯  Creating goals …");

  const goal1 = await Goal.create({
    userId:       antoniya._id,
    title:        "Train 4 times a week",
    description:  "Build consistency – 4 workouts every single week for 30 days.",
    targetValue:  16,      // 4 sessions × 4 weeks
    currentValue: 6,
    unit:         "workouts",
    deadline:     daysFromNow(24),
    status:       "active",
  });

  const goal2 = await Goal.create({
    userId:       mireya._id,
    title:        "Lose 5 kg",
    description:  "Healthy weight-loss over the next 8 weeks.",
    targetValue:  5,
    currentValue: 1.5,
    unit:         "kg",
    deadline:     daysFromNow(56),
    status:       "active",
  });

  const goal3 = await Goal.create({
    userId:       stefan._id,
    title:        "Run 50 km this month",
    description:  "Total distance goal for the calendar month.",
    targetValue:  50,
    currentValue: 18,
    unit:         "km",
    deadline:     daysFromNow(15),
    status:       "active",
  });

  console.log("   goal1 (antoniya)  →", goal1._id);
  console.log("   goal2 (mireya)    →", goal2._id);
  console.log("   goal3 (stefan)    →", goal3._id);

  // ── 4. Create workouts ────────────────────────────────────────────────────
  console.log("\n🏋️   Creating workouts …");

  await Workout.create({
    userId: antoniya._id,
    title:  "Upper Body Strength",
    type:   "strength",
    durationMinutes: 55,
    caloriesBurned:  320,
    exercises: [
      { name: "Bench Press",     sets: 4, reps: 8,  weight: 60 },
      { name: "Dumbbell Rows",   sets: 4, reps: 10, weight: 24 },
      { name: "Shoulder Press",  sets: 3, reps: 12, weight: 20 },
      { name: "Tricep Dips",     sets: 3, reps: 15, weight: 0  },
    ],
    notes:     "Felt strong – increase bench next session.",
    createdAt: daysAgo(3),
  });

  await Workout.create({
    userId: antoniya._id,
    title:  "Morning Cardio",
    type:   "cardio",
    durationMinutes: 35,
    caloriesBurned:  270,
    exercises: [
      { name: "Treadmill Run", sets: 1, reps: 1, weight: 0 },
    ],
    notes:     "Easy 5 km – zone 2.",
    createdAt: daysAgo(1),
  });

  await Workout.create({
    userId: mireya._id,
    title:  "Full Body HIIT",
    type:   "mixed",
    durationMinutes: 30,
    caloriesBurned:  310,
    exercises: [
      { name: "Burpees",        sets: 4, reps: 10, weight: 0 },
      { name: "Jump Squats",    sets: 4, reps: 15, weight: 0 },
      { name: "Mountain Climbers", sets: 3, reps: 20, weight: 0 },
    ],
    notes:     "First HIIT – exhausted but done!",
    createdAt: daysAgo(2),
  });

  await Workout.create({
    userId: stefan._id,
    title:  "10 km Run",
    type:   "cardio",
    durationMinutes: 58,
    caloriesBurned:  510,
    exercises: [
      { name: "Outdoor Run", sets: 1, reps: 1, weight: 0 },
    ],
    notes:     "New PB – 5:48/km pace.",
    createdAt: daysAgo(1),
  });

  console.log("   4 workouts created ✓");

  // ── 5. Create AI Workout Plan ─────────────────────────────────────────────
  console.log("\n🤖  Creating AI workout plan …");

  const aiPlan = await AIWorkoutPlan.create({
    userId:       antoniya._id,
    goal:         "general_fitness",
    fitnessLevel: "intermediate",
    availableDays: 4,
    limitations:  "none",
    prompt: `You are a fitness planning assistant inside FitQuest.
Create a safe weekly workout plan for:
Goal: general_fitness
Fitness Level: intermediate
Available Days Per Week: 4
Workout Duration: 45 minutes
Limitations: none
Return JSON only.`,
    response: {
      weeklyPlan: [
        {
          day: "Monday",
          type: "strength",
          exercises: [
            { name: "Squat",          sets: 4, reps: 8,  duration: null,  notes: "Full depth, neutral spine" },
            { name: "Romanian Deadlift", sets: 3, reps: 10, duration: null, notes: "Hinge at hips, soft knees" },
            { name: "Walking Lunge",  sets: 3, reps: 12, duration: null,  notes: "Step through, keep torso upright" },
          ],
          totalDuration: 45,
          intensity: "moderate",
        },
        {
          day: "Wednesday",
          type: "cardio",
          exercises: [
            { name: "Treadmill Intervals", sets: 6, reps: null, duration: "2 min fast / 1 min walk", notes: "Push to 80% max HR on fast sets" },
            { name: "Jump Rope",           sets: 3, reps: null, duration: "3 minutes", notes: "Steady rhythm" },
          ],
          totalDuration: 40,
          intensity: "high",
        },
        {
          day: "Friday",
          type: "strength",
          exercises: [
            { name: "Bench Press",    sets: 4, reps: 8,  duration: null, notes: "Controlled descent, full press" },
            { name: "Dumbbell Rows",  sets: 4, reps: 10, duration: null, notes: "Elbow drives back" },
            { name: "Lateral Raises", sets: 3, reps: 15, duration: null, notes: "Light weight, strict form" },
            { name: "Plank",          sets: 3, reps: null, duration: "45 seconds", notes: "Hips level, squeeze core" },
          ],
          totalDuration: 45,
          intensity: "moderate",
        },
        {
          day: "Sunday",
          type: "flexibility",
          exercises: [
            { name: "Foam Rolling",       sets: 1, reps: null, duration: "10 minutes", notes: "Full body, spend time on tight spots" },
            { name: "Hip Flexor Stretch", sets: 2, reps: null, duration: "60 seconds each", notes: "Relax into the stretch" },
            { name: "Thoracic Rotation",  sets: 2, reps: 10,   duration: null, notes: "Slow and controlled" },
          ],
          totalDuration: 30,
          intensity: "low",
        },
      ],
      safetyNotes: [
        "Warm up for 5–10 minutes before every session",
        "Stop if you feel sharp joint pain",
        "Stay hydrated – aim for 2 L water per day",
      ],
      difficulty: "intermediate",
      disclaimer:
        "This is not medical advice. Consult a healthcare professional before starting any new exercise programme.",
    },
    isValidated: true,
    flagged:     false,
  });

  console.log("   AI plan →", aiPlan._id);

  // ── 6. Create the LIVE DEMO Challenge ─────────────────────────────────────
  console.log("\n🏆  Creating demo challenge …");

  //  Antoniya created the challenge 2 days ago.
  //  All 5 users have joined.
  //  Progress intentionally set so the leaderboard is interesting:
  //    1st  hristofir  8 200 steps  (82 %)
  //    2nd  stefan     7 000 steps  (70 %)
  //    3rd  antoniya   5 500 steps  (55 %)
  //    4th  mireya     3 000 steps  (30 %)
  //    5th  admin      1 200 steps  (12 %)
  //
  //  DURING THE DEMO: update antoniya from 5 500 → 10 200
  //  and watch the leaderboard flip in real time.

  const challenge = await Challenge.create({
    title:       "10 000 Steps a Day – 7-Day Challenge",
    description:
      "Walk or run 10 000 steps every day for 7 consecutive days. " +
      "Track your daily steps and keep an eye on the live leaderboard!",
    createdBy:   antoniya._id,
    participants: [
      { userId: antoniya._id,  progress: 5500, completed: false, joinedAt: daysAgo(2) },
      { userId: mireya._id,    progress: 3000, completed: false, joinedAt: daysAgo(2) },
      { userId: stefan._id,    progress: 7000, completed: false, joinedAt: daysAgo(2) },
      { userId: hristofir._id, progress: 8200, completed: false, joinedAt: daysAgo(2) },
      { userId: admin._id,     progress: 1200, completed: false, joinedAt: daysAgo(1) },
    ],
    targetValue: 10000,
    unit:        "steps",
    startDate:   daysAgo(2),
    endDate:     daysFromNow(5),
    status:      "active",
    isPublic:    true,
  });

  console.log("   challenge →", challenge._id);

  // ── 7. Notifications ──────────────────────────────────────────────────────
  console.log("\n🔔  Creating notifications …");

  await Notification.insertMany([
    {
      userId:  antoniya._id,
      type:    "ai",
      title:   "Your AI Workout Plan is ready!",
      message: "Your personalised 4-day intermediate plan has been generated. Check it out on your dashboard.",
      isRead:  false,
    },
    {
      userId:  antoniya._id,
      type:    "challenge",
      title:   "Христофор is closing in!",
      message: "Христофор just reached 8 200 steps – only 2 700 behind your daily target. Keep going!",
      isRead:  false,
    },
    {
      userId:  mireya._id,
      type:    "challenge",
      title:   "You joined the 10 000 Steps Challenge",
      message: "You're now part of the 10 000 Steps challenge. Update your progress daily to stay on the board!",
      isRead:  true,
    },
    {
      userId:  stefan._id,
      type:    "progress",
      title:   "Goal check-in",
      message: "You've completed 18 of your 50 km goal. 32 km to go – you're on track!",
      isRead:  false,
    },
    {
      userId:  hristofir._id,
      type:    "challenge",
      title:   "You're leading the challenge! 🥇",
      message: "You're currently in 1st place with 8 200 steps. Keep it up!",
      isRead:  false,
    },
  ]);

  console.log("   5 notifications created ✓");

  // ── 8. System logs ────────────────────────────────────────────────────────
  console.log("\n📋  Seeding system logs …");

  const logsData = [
    { userId: antoniya._id,  action: "USER_REGISTERED",    entityType: "auth",      metadata: { email: "antoniya@fitquest.com" },   createdAt: daysAgo(5) },
    { userId: antoniya._id,  action: "USER_LOGIN",          entityType: "auth",      metadata: { ip: "192.168.1.10" },               createdAt: daysAgo(5) },
    { userId: mireya._id,    action: "USER_REGISTERED",    entityType: "auth",      metadata: { email: "mireya@fitquest.com" },     createdAt: daysAgo(4) },
    { userId: stefan._id,    action: "USER_REGISTERED",    entityType: "auth",      metadata: { email: "stefan@fitquest.com" },     createdAt: daysAgo(4) },
    { userId: hristofir._id, action: "USER_REGISTERED",    entityType: "auth",      metadata: { email: "hristofir@fitquest.com" },  createdAt: daysAgo(3) },
    { userId: antoniya._id,  action: "GOAL_CREATED",        entityType: "goal",      entityId: goal1._id, metadata: { title: "Train 4 times a week" },  createdAt: daysAgo(3) },
    { userId: mireya._id,    action: "GOAL_CREATED",        entityType: "goal",      entityId: goal2._id, metadata: { title: "Lose 5 kg" },             createdAt: daysAgo(3) },
    { userId: stefan._id,    action: "GOAL_CREATED",        entityType: "goal",      entityId: goal3._id, metadata: { title: "Run 50 km" },             createdAt: daysAgo(3) },
    { userId: antoniya._id,  action: "WORKOUT_CREATED",     entityType: "workout",   metadata: { title: "Upper Body Strength" },     createdAt: daysAgo(3) },
    { userId: antoniya._id,  action: "AI_PLAN_GENERATED",   entityType: "ai",        entityId: aiPlan._id, metadata: { goal: "general_fitness" },       createdAt: daysAgo(2) },
    { userId: antoniya._id,  action: "CHALLENGE_CREATED",   entityType: "challenge", entityId: challenge._id, metadata: { title: "10 000 Steps" },      createdAt: daysAgo(2) },
    { userId: mireya._id,    action: "CHALLENGE_JOINED",    entityType: "challenge", entityId: challenge._id, metadata: {},                             createdAt: daysAgo(2) },
    { userId: stefan._id,    action: "CHALLENGE_JOINED",    entityType: "challenge", entityId: challenge._id, metadata: {},                             createdAt: daysAgo(2) },
    { userId: hristofir._id, action: "CHALLENGE_JOINED",    entityType: "challenge", entityId: challenge._id, metadata: {},                             createdAt: daysAgo(2) },
    { userId: antoniya._id,  action: "WORKOUT_CREATED",     entityType: "workout",   metadata: { title: "Morning Cardio" },          createdAt: daysAgo(1) },
    { userId: mireya._id,    action: "WORKOUT_CREATED",     entityType: "workout",   metadata: { title: "Full Body HIIT" },          createdAt: daysAgo(1) },
    { userId: stefan._id,    action: "WORKOUT_CREATED",     entityType: "workout",   metadata: { title: "10 km Run" },              createdAt: daysAgo(1) },
    { userId: antoniya._id,  action: "PROGRESS_UPDATED",    entityType: "challenge", entityId: challenge._id, metadata: { oldProgress: 4200, newProgress: 5500, unit: "steps" }, createdAt: daysAgo(1) },
    { userId: hristofir._id, action: "PROGRESS_UPDATED",    entityType: "challenge", entityId: challenge._id, metadata: { oldProgress: 6000, newProgress: 8200, unit: "steps" }, createdAt: daysAgo(0) },
    { userId: admin._id,     action: "USER_LOGIN",          entityType: "auth",      metadata: { ip: "192.168.1.1" },                createdAt: daysAgo(0) },
  ];

  await Log.insertMany(logsData);
  console.log("   20 log entries created ✓");

  // ── 9. Print summary ──────────────────────────────────────────────────────
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║           ✅  FitQuest Demo Seed Complete                     ║
╠═══════════════════════════════════════════════════════════════╣
║  DEMO ACCOUNTS                                                ║
║  ─────────────────────────────────────────────────────────   ║
║  Admin    admin@fitquest.com       / Admin123!                ║
║  User 1   antoniya@fitquest.com    / Demo123!                 ║
║  User 2   mireya@fitquest.com      / Demo123!                 ║
║  User 3   stefan@fitquest.com      / Demo123!                 ║
║  User 4   hristofir@fitquest.com   / Demo123!                 ║
║                                                               ║
║  ACTIVE CHALLENGE                                             ║
║  "10 000 Steps a Day – 7-Day Challenge"                       ║
║  Leaderboard (before demo update):                            ║
║    🥇 hristofir  8 200 steps (82 %)                          ║
║    🥈 stefan     7 000 steps (70 %)                          ║
║    🥉 antoniya   5 500 steps (55 %)  ← update in demo        ║
║    4  mireya     3 000 steps (30 %)                          ║
║    5  admin      1 200 steps (12 %)                          ║
║                                                               ║
║  DEMO LIVE UPDATE MOMENT                                      ║
║  Update antoniya's progress from 5 500 → 10 200              ║
║  She immediately jumps to 1st place on the leaderboard.       ║
╚═══════════════════════════════════════════════════════════════╝
`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
