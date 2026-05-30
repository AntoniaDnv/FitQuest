# FitQuest Database Schema

MongoDB database for FitQuest with detailed collection schemas.

---

## User Collection

**Collection Name:** `users`

Stores user account information and profile data.

```json
{
  "_id": ObjectId,
  "username": String (unique, required),
  "email": String (unique, required),
  "passwordHash": String (hashed with bcrypt, required),
  "role": String (enum: ["user", "admin"], default: "user"),
  "age": Number (optional),
  "fitnessLevel": String (enum: ["beginner", "intermediate", "advanced"]),
  "goalType": String (enum: ["weight_loss", "muscle_gain", "endurance", "general_fitness"]),
  "isBanned": Boolean (default: false),
  "createdAt": Date (default: Date.now),
  "updatedAt": Date (default: Date.now)
}
```

**Indexes:**
- Unique index on `username`
- Unique index on `email`
- Index on `createdAt` for user list sorting

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "username": "antoniya_fit",
  "email": "antoniya@example.com",
  "passwordHash": "$2b$10$KJAH28sdfHJ...encrypted_password",
  "role": "user",
  "age": 28,
  "fitnessLevel": "intermediate",
  "goalType": "muscle_gain",
  "isBanned": false,
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-15T10:30:00Z")
}
```

---

## Goal Collection

**Collection Name:** `goals`

Stores user fitness goals.

```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User, required, indexed),
  "title": String (required),
  "description": String (optional),
  "targetValue": Number (required),
  "currentValue": Number (default: 0),
  "unit": String (enum: ["kg", "steps", "workouts", "minutes", "km"], required),
  "deadline": Date (optional),
  "status": String (enum: ["active", "completed", "failed"], default: "active"),
  "createdAt": Date (default: Date.now),
  "updatedAt": Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId` for faster queries
- Index on `status` for filtering
- Index on `createdAt` for sorting

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Lose 10kg",
  "description": "Healthy weight loss over 3 months",
  "targetValue": 10,
  "currentValue": 3.5,
  "unit": "kg",
  "deadline": ISODate("2024-04-15T23:59:59Z"),
  "status": "active",
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-20T14:22:00Z")
}
```

---

## Workout Collection

**Collection Name:** `workouts`

Stores user workout records.

```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User, required, indexed),
  "title": String (required),
  "type": String (enum: ["strength", "cardio", "flexibility", "mixed"], required),
  "durationMinutes": Number (required),
  "caloriesBurned": Number (optional),
  "exercises": Array (required, must have at least 1),
  "exercises[].name": String,
  "exercises[].sets": Number,
  "exercises[].reps": Number,
  "exercises[].weight": Number (optional),
  "notes": String (optional),
  "createdAt": Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId` for user-specific queries
- Index on `type` for filtering
- Index on `createdAt` for sorting

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
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
    },
    {
      "name": "Shoulder Press",
      "sets": 3,
      "reps": 12,
      "weight": 30
    }
  ],
  "notes": "Great session, felt strong",
  "createdAt": ISODate("2024-01-20T18:45:00Z")
}
```

---

## Challenge Collection

**Collection Name:** `challenges`

Stores fitness challenges and their participants.

```json
{
  "_id": ObjectId,
  "title": String (required),
  "description": String (optional),
  "createdBy": ObjectId (ref: User, required),
  "participants": Array (required),
  "participants[].userId": ObjectId (ref: User),
  "participants[].progress": Number (default: 0),
  "participants[].completed": Boolean (default: false),
  "participants[].joinedAt": Date,
  "targetValue": Number (required),
  "unit": String (enum: ["steps", "workouts", "minutes", "km"], required),
  "startDate": Date (default: Date.now),
  "endDate": Date (required),
  "status": String (enum: ["upcoming", "active", "completed"], default: "upcoming"),
  "isPublic": Boolean (default: true),
  "createdAt": Date (default: Date.now),
  "updatedAt": Date (default: Date.now)
}
```

**Indexes:**
- Index on `createdBy` for user's challenges
- Index on `status` for filtering
- Index on `isPublic` for discovery
- Compound index on `startDate` and `endDate`

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439014"),
  "title": "10,000 Steps Daily Challenge",
  "description": "Walk 10,000 steps every day for 7 days",
  "createdBy": ObjectId("507f1f77bcf86cd799439011"),
  "participants": [
    {
      "userId": ObjectId("507f1f77bcf86cd799439011"),
      "progress": 8500,
      "completed": false,
      "joinedAt": ISODate("2024-01-20T09:00:00Z")
    },
    {
      "userId": ObjectId("507f1f77bcf86cd799439015"),
      "progress": 10200,
      "completed": true,
      "joinedAt": ISODate("2024-01-20T10:30:00Z")
    },
    {
      "userId": ObjectId("507f1f77bcf86cd799439016"),
      "progress": 7300,
      "completed": false,
      "joinedAt": ISODate("2024-01-20T12:00:00Z")
    }
  ],
  "targetValue": 10000,
  "unit": "steps",
  "startDate": ISODate("2024-01-20T00:00:00Z"),
  "endDate": ISODate("2024-01-27T23:59:59Z"),
  "status": "active",
  "isPublic": true,
  "createdAt": ISODate("2024-01-20T09:00:00Z"),
  "updatedAt": ISODate("2024-01-20T18:30:00Z")
}
```

---

## Notification Collection

**Collection Name:** `notifications`

Stores real-time notifications for users.

```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User, required, indexed),
  "type": String (enum: ["challenge", "progress", "system", "ai"], required),
  "title": String (required),
  "message": String (required),
  "relatedEntityId": ObjectId (optional),
  "relatedEntityType": String (optional),
  "isRead": Boolean (default: false),
  "actionUrl": String (optional),
  "createdAt": Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId` for user-specific notifications
- Index on `isRead` for unread count
- Index on `createdAt` for sorting

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439017"),
  "userId": ObjectId("507f1f77bcf86cd799439015"),
  "type": "challenge",
  "title": "Challenge Update",
  "message": "Antoniya just updated their progress to 8500 steps!",
  "relatedEntityId": ObjectId("507f1f77bcf86cd799439014"),
  "relatedEntityType": "challenge",
  "isRead": false,
  "actionUrl": "/challenges/507f1f77bcf86cd799439014",
  "createdAt": ISODate("2024-01-20T18:30:00Z")
}
```

---

## Log Collection

**Collection Name:** `logs`

Stores all system actions for audit trail.

```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User, optional, indexed),
  "action": String (required),
  "entityType": String (enum: ["user", "goal", "workout", "challenge", "ai", "auth"], required),
  "entityId": ObjectId (optional),
  "metadata": Object (optional),
  "createdAt": Date (default: Date.now, indexed)
}
```

**Indexes:**
- Index on `userId` for user activity
- Index on `action` for filtering by action type
- Index on `createdAt` for time-based queries
- Compound index on `userId` and `createdAt`

**Example Documents:**
```json
// User Registration
{
  "_id": ObjectId("507f1f77bcf86cd799439018"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "action": "USER_REGISTERED",
  "entityType": "auth",
  "metadata": {
    "email": "antoniya@example.com",
    "username": "antoniya_fit"
  },
  "createdAt": ISODate("2024-01-15T10:30:00Z")
}

// Goal Created
{
  "_id": ObjectId("507f1f77bcf86cd799439019"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "action": "GOAL_CREATED",
  "entityType": "goal",
  "entityId": ObjectId("507f1f77bcf86cd799439012"),
  "metadata": {
    "title": "Lose 10kg",
    "unit": "kg"
  },
  "createdAt": ISODate("2024-01-15T11:00:00Z")
}

// Progress Updated
{
  "_id": ObjectId("507f1f77bcf86cd799439020"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "action": "PROGRESS_UPDATED",
  "entityType": "challenge",
  "entityId": ObjectId("507f1f77bcf86cd799439014"),
  "metadata": {
    "oldProgress": 7500,
    "newProgress": 8500,
    "unit": "steps"
  },
  "createdAt": ISODate("2024-01-20T18:30:00Z")
}

// Admin Action
{
  "_id": ObjectId("507f1f77bcf86cd799439021"),
  "userId": ObjectId("507f1f77bcf86cd799439022"),
  "action": "ADMIN_USER_DELETED",
  "entityType": "user",
  "entityId": ObjectId("507f1f77bcf86cd799439023"),
  "metadata": {
    "username": "spam_user",
    "reason": "Inappropriate content"
  },
  "createdAt": ISODate("2024-01-20T19:00:00Z")
}
```

---

## AIWorkoutPlan Collection

**Collection Name:** `aiworkoutplans`

Stores all AI-generated workout plans for review and audit.

```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User, required, indexed),
  "goal": String (required),
  "fitnessLevel": String (enum: ["beginner", "intermediate", "advanced"], required),
  "availableDays": Number (required),
  "limitations": String (default: "none"),
  "prompt": String (required),
  "response": Object (required),
  "isValidated": Boolean (default: false, indexed),
  "flagged": Boolean (default: false, indexed),
  "flagReason": String (optional),
  "metadata": {
    "aiModel": String,
    "tokensUsed": Number,
    "generationTime": Number
  },
  "createdAt": Date (default: Date.now, indexed),
  "updatedAt": Date (default: Date.now)
}
```

**Indexes:**
- Index on `userId` with `createdAt` for user's AI plans
- Index on `isValidated` for admin review
- Index on `flagged` for safety concerns

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439024"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "goal": "muscle_gain",
  "fitnessLevel": "intermediate",
  "availableDays": 4,
  "limitations": "no shoulder exercises",
  "prompt": "You are a fitness planning assistant...",
  "response": {
    "weeklyPlan": [
      {
        "day": "Monday",
        "type": "strength",
        "exercises": [
          {
            "name": "Squats",
            "sets": 4,
            "reps": 6,
            "notes": "Heavy weight, full ROM"
          }
        ],
        "totalDuration": 45,
        "intensity": "high"
      }
    ],
    "safetyNotes": [
      "Always warm up first",
      "Avoid shoulder exercises as requested"
    ],
    "difficulty": "intermediate",
    "disclaimer": "This is not medical advice"
  },
  "isValidated": true,
  "flagged": false,
  "metadata": {
    "aiModel": "gpt-3.5-turbo",
    "tokensUsed": 1250,
    "generationTime": 1850
  },
  "createdAt": ISODate("2024-01-20T15:00:00Z"),
  "updatedAt": ISODate("2024-01-20T15:05:00Z")
}
```

---

## Relationships

```
User (1) ─── (Many) Goal
          └── (Many) Workout
          └── (Many) Challenge (as creator)
          └── (Many) Challenge (as participant, embedded)
          └── (Many) Notification
          └── (Many) Log
          └── (Many) AIWorkoutPlan

Challenge ───┬─ (Many) Participants (embedded array)
             └─ (Many) Logs (entityId references)

AIWorkoutPlan ─── (1) User
```

---

## Data Validation Rules

### User
- `username`: 3-30 characters, alphanumeric + underscore
- `email`: Valid email format
- `passwordHash`: 60+ characters (bcrypt hash)
- `age`: 13-120 years old

### Goal
- `targetValue`: > 0
- `currentValue`: >= 0 and <= targetValue
- `unit`: Must be valid enum
- `deadline`: Must be in future

### Workout
- `durationMinutes`: > 0
- `exercises`: Array with min 1 element
- `exercises[].sets`: 1-10
- `exercises[].reps`: 1-50

### Challenge
- `targetValue`: > 0
- `participants`: Max 100 users
- `startDate`: <= endDate
- `endDate`: > startDate

### Notification
- `message`: 1-500 characters
- `userId`: Must exist in users collection

### AIWorkoutPlan
- `response`: Must be valid JSON object
- `prompt`: 100+ characters
- `availableDays`: 1-7

---

## Performance Optimization

**Indexing Strategy:**
- Covered indexes for common queries
- Compound indexes for multi-field filters
- TTL index on notifications (30-day cleanup)

**Example TTL Index:**
```javascript
db.notifications.createIndex(
  { "createdAt": 1 },
  { "expireAfterSeconds": 2592000 } // 30 days
)
```

**Query Examples:**

```javascript
// Get user's active goals
db.goals.find({ 
  userId: ObjectId("..."), 
  status: "active" 
}).sort({ deadline: 1 })

// Get challenge leaderboard
db.challenges.findOne({
  _id: ObjectId("...")
}).project({
  "participants": 1
}).then(sort participants by progress)

// Get admin logs (last 7 days)
db.logs.find({
  createdAt: { 
    $gte: new Date(Date.now() - 7*24*60*60*1000) 
  },
  action: { $in: ["ADMIN_USER_DELETED", "CONTENT_MODERATED"] }
}).limit(100)
```

---

## Backup & Recovery

**Recommended Backup Strategy:**
- MongoDB Atlas automated backups (daily)
- Point-in-time recovery enabled
- MongoDB Compass for manual exports if needed
- Git for code/documentation backups
