export function getAdminStats() {
  return [
    { label: "Total Users", value: 24 },
    { label: "Active Challenges", value: 8 },
    { label: "Workouts Logged", value: 132 },
    { label: "AI Plans Generated", value: 19 },
  ];
}

export function getAdminUsers() {
  return [
    {
      id: 1,
      username: "mireya",
      email: "mireya@test.com",
      role: "admin",
      isBanned: false,
    },
    {
      id: 2,
      username: "antonia",
      email: "antonia@test.com",
      role: "user",
      isBanned: false,
    },
    {
      id: 3,
      username: "stefan",
      email: "stefan@test.com",
      role: "user",
      isBanned: false,
    },
  ];
}

export function getAdminChallenges() {
  return [
    {
      id: 1,
      title: "10,000 Steps Daily",
      status: "active",
      participants: 12,
    },
    {
      id: 2,
      title: "7-Day Workout Streak",
      status: "active",
      participants: 7,
    },
    {
      id: 3,
      title: "Cardio Consistency Challenge",
      status: "upcoming",
      participants: 5,
    },
  ];
}

export function getAdminLogs() {
  return [
    {
      id: 1,
      action: "USER_REGISTERED",
      user: "antonia@test.com",
      date: "2026-05-18",
    },
    {
      id: 2,
      action: "AI_PLAN_GENERATED",
      user: "mireya@test.com",
      date: "2026-05-18",
    },
    {
      id: 3,
      action: "PROGRESS_UPDATED",
      user: "stefan@test.com",
      date: "2026-05-18",
    },
  ];
}

export function getAdminAIOutputs() {
  return [
    {
      id: 1,
      user: "mireya@test.com",
      goal: "weight loss",
      fitnessLevel: "beginner",
      validated: true,
    },
    {
      id: 2,
      user: "user@test.com",
      goal: "endurance",
      fitnessLevel: "intermediate",
      validated: false,
    },
  ];
}
