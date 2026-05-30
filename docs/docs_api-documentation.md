# FitQuest REST API Documentation

Complete API reference for FitQuest backend.

---

## Base URL

```
http://localhost:5000/api
```

---

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Response Format

All responses follow this format:

**Success Response (2xx):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response (4xx, 5xx):**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // Optional, validation errors
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Access:** Public

**Request Body:**
```json
{
  "username": "antoniya_fit",
  "email": "antoniya@example.com",
  "password": "SecurePass123!",
  "age": 28,
  "fitnessLevel": "intermediate",
  "goalType": "muscle_gain"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "antoniya_fit",
      "email": "antoniya@example.com",
      "role": "user",
      "fitnessLevel": "intermediate"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Username already exists",
  "errors": ["username"]
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Access:** Public

**Request Body:**
```json
{
  "email": "antoniya@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "antoniya_fit",
      "email": "antoniya@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### Logout User
**POST** `/auth/logout`

Logout current user (frontend removes token).

**Access:** Protected (User)

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## User Endpoints

### Get Current User
**GET** `/users/me`

Get logged-in user's profile information.

**Access:** Protected (User)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "antoniya_fit",
    "email": "antoniya@example.com",
    "age": 28,
    "fitnessLevel": "intermediate",
    "goalType": "muscle_gain",
    "role": "user",
    "isBanned": false,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Update User Profile
**PUT** `/users/me`

Update logged-in user's profile.

**Access:** Protected (User)

**Request Body:**
```json
{
  "age": 29,
  "fitnessLevel": "advanced",
  "goalType": "endurance"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "antoniya_fit",
    "age": 29,
    "fitnessLevel": "advanced",
    "goalType": "endurance",
    "updatedAt": "2024-01-20T15:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

## Goal Endpoints

### Create Goal
**POST** `/goals`

Create a new fitness goal.

**Access:** Protected (User)

**Request Body:**
```json
{
  "title": "Lose 10kg",
  "description": "Healthy weight loss over 3 months",
  "targetValue": 10,
  "unit": "kg",
  "deadline": "2024-04-15T23:59:59Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Lose 10kg",
    "description": "Healthy weight loss over 3 months",
    "targetValue": 10,
    "currentValue": 0,
    "unit": "kg",
    "deadline": "2024-04-15T23:59:59Z",
    "status": "active",
    "createdAt": "2024-01-15T11:00:00Z"
  },
  "message": "Goal created successfully"
}
```

---

### Get User's Goals
**GET** `/goals/my`

Get all goals for logged-in user.

**Access:** Protected (User)

**Query Parameters:**
- `status` (optional): "active", "completed", or "failed"
- `limit` (optional, default 50): Number of results
- `page` (optional, default 1): Page number

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Lose 10kg",
      "targetValue": 10,
      "currentValue": 3,
      "unit": "kg",
      "status": "active",
      "deadline": "2024-04-15T23:59:59Z",
      "progress": 30
    },
    {
      "id": "507f1f77bcf86cd799439025",
      "title": "Run 100km",
      "targetValue": 100,
      "currentValue": 45,
      "unit": "km",
      "status": "active",
      "progress": 45
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 50
  }
}
```

---

### Update Goal
**PUT** `/goals/:id`

Update a specific goal.

**Access:** Protected (User, Owner only)

**Request Body:**
```json
{
  "title": "Lose 12kg",
  "currentValue": 5,
  "status": "active"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Lose 12kg",
    "currentValue": 5,
    "progress": 42,
    "updatedAt": "2024-01-20T16:00:00Z"
  },
  "message": "Goal updated successfully"
}
```

---

### Delete Goal
**DELETE** `/goals/:id`

Delete a goal.

**Access:** Protected (User, Owner only)

**Response (200):**
```json
{
  "success": true,
  "message": "Goal deleted successfully"
}
```

---

## Workout Endpoints

### Create Workout
**POST** `/workouts`

Record a completed workout.

**Access:** Protected (User)

**Request Body:**
```json
{
  "title": "Upper Body Strength",
  "type": "strength",
  "durationMinutes": 60,
  "caloriesBurned": 350,
  "exercises": [
    {
      "name": "Bench Press",
      "sets": 4,
      "reps": 8,
      "weight": 85
    },
    {
      "name": "Dumbbell Rows",
      "sets": 4,
      "reps": 10,
      "weight": 40
    }
  ],
  "notes": "Great session, felt strong"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Upper Body Strength",
    "type": "strength",
    "durationMinutes": 60,
    "caloriesBurned": 350,
    "exercises": [ ... ],
    "createdAt": "2024-01-20T18:45:00Z"
  },
  "message": "Workout created successfully"
}
```

---

### Get User's Workouts
**GET** `/workouts/my`

Get all workouts for logged-in user.

**Access:** Protected (User)

**Query Parameters:**
- `type` (optional): "strength", "cardio", "flexibility", "mixed"
- `limit` (optional, default 50)
- `page` (optional, default 1)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439013",
      "title": "Upper Body Strength",
      "type": "strength",
      "durationMinutes": 60,
      "caloriesBurned": 350,
      "createdAt": "2024-01-20T18:45:00Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 50
  }
}
```

---

### Update Workout
**PUT** `/workouts/:id`

Update a workout record.

**Access:** Protected (User, Owner only)

**Request Body:**
```json
{
  "durationMinutes": 65,
  "caloriesBurned": 380
}
```

**Response (200):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Workout updated successfully"
}
```

---

### Delete Workout
**DELETE** `/workouts/:id`

Delete a workout.

**Access:** Protected (User, Owner only)

**Response (200):**
```json
{
  "success": true,
  "message": "Workout deleted successfully"
}
```

---

## Challenge Endpoints

### Create Challenge
**POST** `/challenges`

Create a new fitness challenge.

**Access:** Protected (User)

**Request Body:**
```json
{
  "title": "10,000 Steps Daily",
  "description": "Walk 10,000 steps every day for 7 days",
  "targetValue": 10000,
  "unit": "steps",
  "startDate": "2024-01-20T00:00:00Z",
  "endDate": "2024-01-27T23:59:59Z",
  "isPublic": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "title": "10,000 Steps Daily",
    "createdBy": "507f1f77bcf86cd799439011",
    "targetValue": 10000,
    "unit": "steps",
    "participants": [],
    "status": "upcoming",
    "isPublic": true,
    "createdAt": "2024-01-20T09:00:00Z"
  },
  "message": "Challenge created successfully"
}
```

---

### Get All Public Challenges
**GET** `/challenges`

List all public challenges.

**Access:** Protected (User)

**Query Parameters:**
- `status` (optional): "upcoming", "active", "completed"
- `limit` (optional, default 20)
- `page` (optional, default 1)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439014",
      "title": "10,000 Steps Daily",
      "createdBy": {
        "id": "507f1f77bcf86cd799439011",
        "username": "antoniya_fit"
      },
      "targetValue": 10000,
      "unit": "steps",
      "participantCount": 3,
      "status": "active",
      "endDate": "2024-01-27T23:59:59Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 20
  }
}
```

---

### Get Challenge Details
**GET** `/challenges/:id`

Get details of a specific challenge with leaderboard.

**Access:** Protected (User)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "title": "10,000 Steps Daily",
    "description": "Walk 10,000 steps every day for 7 days",
    "createdBy": {
      "id": "507f1f77bcf86cd799439011",
      "username": "antoniya_fit"
    },
    "targetValue": 10000,
    "unit": "steps",
    "status": "active",
    "startDate": "2024-01-20T00:00:00Z",
    "endDate": "2024-01-27T23:59:59Z",
    "participants": [
      {
        "userId": "507f1f77bcf86cd799439011",
        "username": "antoniya_fit",
        "progress": 8500,
        "completed": false,
        "joinedAt": "2024-01-20T09:00:00Z",
        "rank": 2
      },
      {
        "userId": "507f1f77bcf86cd799439015",
        "username": "mireya_strong",
        "progress": 10200,
        "completed": true,
        "joinedAt": "2024-01-20T10:30:00Z",
        "rank": 1
      }
    ]
  }
}
```

---

### Join Challenge
**POST** `/challenges/:id/join`

Join an existing challenge.

**Access:** Protected (User)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "challengeId": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439016",
    "status": "joined",
    "joinedAt": "2024-01-20T14:00:00Z"
  },
  "message": "Successfully joined challenge"
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "You are already a participant in this challenge"
}
```

---

### Update Progress
**PUT** `/challenges/:id/progress`

Update user's progress in a challenge.

**Access:** Protected (User)

**Request Body:**
```json
{
  "progress": 9000
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "challengeId": "507f1f77bcf86cd799439014",
    "oldProgress": 8500,
    "newProgress": 9000,
    "percentageComplete": 90,
    "completed": false
  },
  "message": "Progress updated successfully"
}
```

---

### Delete Challenge
**DELETE** `/challenges/:id`

Delete a challenge (creator or admin only).

**Access:** Protected (User-Owner or Admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Challenge deleted successfully"
}
```

---

## AI Endpoints

### Generate Workout Plan
**POST** `/ai/workout-plan`

Generate an AI-powered personalized workout plan.

**Access:** Protected (User)

**Request Body:**
```json
{
  "goal": "muscle_gain",
  "fitnessLevel": "intermediate",
  "availableDays": 4,
  "workoutDuration": 45,
  "limitations": "no knee-intensive exercises"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "weeklyPlan": [
      {
        "day": "Monday",
        "type": "strength",
        "exercises": [
          {
            "name": "Squats",
            "sets": 4,
            "reps": 6,
            "duration": "60 seconds",
            "notes": "Heavy weight, full ROM"
          }
        ],
        "totalDuration": 45,
        "intensity": "high"
      }
    ],
    "safetyNotes": [
      "Always warm up first",
      "Avoid knee-intensive movements"
    ],
    "difficulty": "intermediate"
  },
  "planId": "507f1f77bcf86cd799439024",
  "disclaimer": "This is not medical advice. Consult a healthcare professional before starting any new exercise program."
}
```

---

### Suggest Challenge
**POST** `/ai/challenge-suggestion`

Get AI suggestion for a fitness challenge.

**Access:** Protected (User)

**Request Body:**
```json
{
  "goal": "improve_endurance",
  "fitnessLevel": "intermediate",
  "recentWorkouts": ["cardio", "cardio", "strength"]
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "challengeTitle": "5K Run Challenge",
    "description": "Complete a 5km run in under 30 minutes",
    "targetValue": 5,
    "unit": "km",
    "durationDays": 7,
    "difficulty": "medium",
    "motivation": "Based on your recent cardio workouts, this challenge will help build your endurance."
  },
  "disclaimer": "This is a suggestion based on your fitness history."
}
```

---

### Analyze Progress
**POST** `/ai/progress-analysis`

Get AI analysis of user's weekly progress.

**Access:** Protected (User)

**Request Body:**
```json
{
  "goal": "build_consistency",
  "workoutsCompleted": 4,
  "totalMinutes": 180,
  "challengeProgress": 82
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "summary": "Great week! You completed 4 workouts totaling 3 hours. You're 82% through your current challenge. Keep this momentum going - consistency is key to achieving your fitness goals. Next week, try to increase your workout duration by 10-15 minutes.",
    "analyzedAt": "2024-01-20T20:00:00Z"
  },
  "disclaimer": "This is an AI-generated motivational summary, not professional fitness advice."
}
```

---

## Admin Endpoints

### Get All Users
**GET** `/admin/users`

Get paginated list of all users.

**Access:** Protected (Admin only)

**Query Parameters:**
- `limit` (optional, default 50)
- `page` (optional, default 1)
- `role` (optional): "user" or "admin"
- `banned` (optional): true or false

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "username": "antoniya_fit",
      "email": "antoniya@example.com",
      "role": "user",
      "isBanned": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 50
  }
}
```

---

### Delete User
**DELETE** `/admin/users/:id`

Delete a user account.

**Access:** Protected (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Get System Logs
**GET** `/admin/logs`

Get system event logs.

**Access:** Protected (Admin only)

**Query Parameters:**
- `action` (optional): Filter by action type
- `entityType` (optional): Filter by entity type
- `userId` (optional): Filter by user
- `limit` (optional, default 100)
- `page` (optional, default 1)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439018",
      "userId": "507f1f77bcf86cd799439011",
      "action": "USER_REGISTERED",
      "entityType": "auth",
      "metadata": {
        "email": "antoniya@example.com"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 5000,
    "page": 1,
    "limit": 100
  }
}
```

---

### Get All AI Outputs
**GET** `/admin/ai-outputs`

Get all AI-generated plans for review.

**Access:** Protected (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439024",
      "userId": {
        "id": "507f1f77bcf86cd799439011",
        "username": "antoniya_fit"
      },
      "goal": "muscle_gain",
      "fitnessLevel": "intermediate",
      "isValidated": false,
      "flagged": false,
      "createdAt": "2024-01-20T15:00:00Z"
    }
  ]
}
```

---

### Validate AI Output
**PUT** `/admin/ai-outputs/:id/validate`

Mark AI output as reviewed and validated.

**Access:** Protected (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "AI output validated successfully"
}
```

---

### Delete AI Output
**DELETE** `/admin/ai-outputs/:id`

Delete suspicious or inappropriate AI output.

**Access:** Protected (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "AI output deleted successfully"
}
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Auth endpoints**: 5 requests per minute per IP
- **AI endpoints**: 10 requests per hour per user
- **Other endpoints**: 100 requests per minute per user

---

## Example Requests Using cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "antoniya_fit",
    "email": "antoniya@example.com",
    "password": "SecurePass123!",
    "age": 28,
    "fitnessLevel": "intermediate"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "antoniya@example.com",
    "password": "SecurePass123!"
  }'
```

### Create Goal (with token)
```bash
curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Lose 10kg",
    "targetValue": 10,
    "unit": "kg",
    "deadline": "2024-04-15T23:59:59Z"
  }'
```

---

## Changelog

- **v1.0.0** (2024-01-20) - Initial API release
  - Authentication endpoints
  - CRUD for goals, workouts, challenges
  - AI integration
  - Admin panel
  - Real-time functionality
