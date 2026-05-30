# FitQuest Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │ Home Page    │ Login/Reg    │ Dashboard    │ Admin Panel  │  │
│  │ Goals Page   │ Workouts     │ Challenges   │ Users Mgmt   │  │
│  │ Profile      │ Progress     │ Leaderboard  │ Logs         │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
│                                                                  │
│  ┌────────────────────────┬────────────────────────────────┐   │
│  │   Services & Hooks     │      Context (Auth)             │   │
│  │ - authService          │ - isAuthenticated               │   │
│  │ - userService          │ - userRole (user/admin)         │   │
│  │ - goalService          │ - userData                      │   │
│  │ - workoutService       │                                 │   │
│  │ - challengeService     │                                 │   │
│  │ - socketService        │                                 │   │
│  └────────────────────────┴────────────────────────────────┘   │
└─────────────────────────┬──────────────────────────────────────┘
                          │
                   ┌──────┴──────┐
                   │             │
                   ▼             ▼
        ┌─────────────────┐  ┌──────────────────┐
        │   HTTP/REST     │  │  WebSocket       │
        │   Requests      │  │  Socket.IO       │
        │                 │  │                  │
        │ - Auth          │  │ - Real-time      │
        │ - CRUD Ops      │  │ - Live Progress  │
        │ - Admin Ops     │  │ - Notifications  │
        │ - AI Requests   │  │ - Leaderboard    │
        └────────┬────────┘  └────────┬─────────┘
                 │                    │
        ┌────────┴────────────────────┴────────┐
        │                                       │
        │   EXPRESS.JS Server (Node.js)         │
        │   ┌──────────────────────────────┐   │
        │   │ Routes:                      │   │
        │   │ - /api/auth/*                │   │
        │   │ - /api/users/*               │   │
        │   │ - /api/goals/*               │   │
        │   │ - /api/workouts/*            │   │
        │   │ - /api/challenges/*          │   │
        │   │ - /api/admin/*               │   │
        │   │ - /api/ai/*                  │   │
        │   └──────────────────────────────┘   │
        │                                       │
        │   ┌──────────────────────────────┐   │
        │   │ Middleware:                  │   │
        │   │ - authMiddleware             │   │
        │   │ - roleMiddleware (admin)     │   │
        │   │ - errorHandler               │   │
        │   │ - validation                 │   │
        │   └──────────────────────────────┘   │
        │                                       │
        │   ┌──────────────────────────────┐   │
        │   │ Controllers:                 │   │
        │   │ - authController             │   │
        │   │ - userController             │   │
        │   │ - goalController             │   │
        │   │ - workoutController          │   │
        │   │ - challengeController        │   │
        │   │ - adminController            │   │
        │   │ - aiController               │   │
        │   └──────────────────────────────┘   │
        │                                       │
        │   ┌──────────────────────────────┐   │
        │   │ Services:                    │   │
        │   │ - authService                │   │
        │   │ - aiService                  │   │
        │   │ - logService                 │   │
        │   │ - socketHandlers             │   │
        │   └──────────────────────────────┘   │
        └────────┬───────────────────────────┬─┘
                 │                           │
                 │                ┌──────────┴─────────────┐
                 │                │                        │
                 ▼                ▼                        ▼
        ┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐
        │  MongoDB        │  │  OpenAI/Gemini   │  │  Mongoose    │
        │  Database       │  │  API (AI)        │  │  ODM         │
        │                 │  │                  │  │              │
        │ Collections:    │  │ - Model:         │  │ - Connection │
        │ - users         │  │   gpt-4-turbo    │  │ - Validation │
        │ - goals         │  │   gpt-3.5-turbo  │  │ - Indexing   │
        │ - workouts      │  │                  │  │              │
        │ - challenges    │  │ Functions:       │  │              │
        │ - notifications │  │ - Workout Plans  │  │              │
        │ - logs          │  │ - Suggestions    │  │              │
        │ - aiworkout     │  │ - Analysis       │  │              │
        │   plans         │  │                  │  │              │
        └─────────────────┘  └──────────────────┘  └──────────────┘
```

---

## Data Flow - User Registration & Login

```
1. User Registers
   ├─ Frontend: POST /api/auth/register (email, password, username)
   ├─ Backend: Hash password with bcrypt
   ├─ Backend: Save User to MongoDB
   ├─ Backend: Create JWT token
   └─ Frontend: Store token in localStorage
      └─ Redirect to dashboard

2. User Logs In
   ├─ Frontend: POST /api/auth/login (email, password)
   ├─ Backend: Validate credentials
   ├─ Backend: Create JWT token
   ├─ Frontend: Store token, update Auth Context
   ├─ Frontend: Protected routes check token
   └─ Backend: authMiddleware verifies token
      └─ Access granted to protected resources
```

---

## Data Flow - Challenge Creation & Real-Time Update

```
1. User Creates Challenge
   ├─ Frontend: POST /api/challenges (title, description, goal, days)
   ├─ Backend: Validate input
   ├─ Backend: Save Challenge to MongoDB
   ├─ Backend: Log action (CHALLENGE_CREATED)
   └─ Frontend: Challenge appears in list

2. User Joins Challenge
   ├─ Frontend: POST /api/challenges/:id/join
   ├─ Backend: Add user to participants
   ├─ Backend: Socket.IO joinChallenge
   ├─ Database: Save participant record
   └─ All users in challenge room notified

3. User Updates Progress (REAL-TIME)
   ├─ Frontend: Socket.IO emit progressUpdated
   ├─ Backend: Validate progress
   ├─ Backend: Save to MongoDB
   ├─ Backend: Emit progressUpdated to challenge room
   ├─ Backend: Calculate new leaderboard
   ├─ Backend: Emit leaderboardUpdated
   ├─ All users see updated:
   │  ├─ User's progress
   │  ├─ Leaderboard
   │  └─ Notifications
   └─ Backend: Log action (PROGRESS_UPDATED)
```

---

## Data Flow - AI Workout Plan Generation

```
1. User Requests Workout Plan
   ├─ Frontend: POST /api/ai/workout-plan
   │  └─ Data: goal, fitnessLevel, availableDays, limitations
   │
   ├─ Backend: aiService.generateWorkoutPlan()
   │
   ├─ Validation:
   │  ├─ Check required fields
   │  ├─ Check valid goal/level
   │  └─ Validate availableDays (1-7)
   │
   ├─ Prompt Creation:
   │  └─ Create detailed prompt with user data
   │
   ├─ AI API Call:
   │  ├─ POST to OpenAI/Gemini API
   │  ├─ Send prompt with safety instructions
   │  └─ Receive JSON response
   │
   ├─ Response Validation:
   │  ├─ Parse JSON
   │  ├─ Check structure (weeklyPlan, exercises, safety)
   │  ├─ Check for dangerous exercises
   │  └─ Flag if needed
   │
   ├─ Database Storage:
   │  ├─ Save to AIWorkoutPlan collection
   │  ├─ Store prompt and response
   │  ├─ Mark isValidated = false
   │  └─ Store metadata
   │
   ├─ Logging:
   │  └─ Log action: AI_PLAN_GENERATED
   │
   └─ Response to Frontend:
      ├─ Return validated plan
      ├─ Add medical disclaimer
      └─ Include planId for reference
```

---

## Authentication & Authorization Flow

```
Registration → Hash Password → Store User → JWT Token
    ↓
Login → Validate Credentials → JWT Token → Store in Frontend
    ↓
Protected Route → Check JWT in authMiddleware → Verify signature
    ↓
Admin Route → Check JWT + Check role in roleMiddleware → "admin" role?
    ↓
Yes → Grant access to Admin Controller
No  → Return 403 Forbidden

Frontend:
┌─────────────────────────────────────────┐
│ Protected Route Component                │
│ ├─ Check if authenticated (AuthContext) │
│ ├─ Check user role                      │
│ ├─ If not authorized → Redirect to /    │
│ └─ If authorized → Render component     │
└─────────────────────────────────────────┘
```

---

## Socket.IO Real-Time Architecture

```
Client Connection:
1. User joins challenge
2. Frontend: io.emit('joinChallenge', { challengeId })
3. Backend: socket.on('joinChallenge')
4. Backend: socket.join(`challenge-${challengeId}`)
5. Backend: Add user to challenge room

Real-Time Updates:
┌──────────────┐
│ User A       │
│ Updates      │──► Socket.IO Server ──► Challenge Room
│ Progress     │    └─ Validates      └─ Broadcasts to all
│              │    └─ Saves to DB       └─ Leaderboard calc
└──────────────┘    └─ Logs action       └─ All users receive
       ↓
   ┌───┴────┬─────────┐
   ▼        ▼         ▼
 User B   User C   User D
 Sees     Sees      Sees
 Update   Update    Update
 (no refresh needed)
```

---

## Admin Panel Data Flow

```
Admin Dashboard:
├─ GET /api/admin/users → List all users with counts
├─ GET /api/admin/challenges → List all challenges
├─ GET /api/admin/logs → System logs with pagination
├─ GET /api/admin/ai-outputs → All AI-generated plans

User Management:
├─ DELETE /api/admin/users/:id → Delete user
├─ PUT /api/admin/users/:id/ban → Ban/unban user
└─ Logs: USER_DELETED, USER_BANNED

Challenge Moderation:
├─ DELETE /api/admin/challenges/:id → Delete challenge
├─ PUT /api/admin/challenges/:id → Edit challenge
└─ Logs: CONTENT_MODERATED

AI Output Review:
├─ GET /api/admin/ai-outputs → All plans
├─ PUT /api/admin/ai-outputs/:id/validate → Mark as validated
├─ DELETE /api/admin/ai-outputs/:id → Delete suspicious plan
└─ Logs: AI_OUTPUT_VALIDATED, AI_OUTPUT_DELETED
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 | UI components & state |
| **Routing** | React Router v6 | Client-side navigation |
| **Styling** | Tailwind CSS | Responsive design |
| **Real-time** | Socket.IO Client | Live updates |
| **Backend** | Express.js | REST API server |
| **Real-time Server** | Socket.IO Server | WebSocket communication |
| **Database** | MongoDB | Data persistence |
| **ODM** | Mongoose | Schema validation |
| **Auth** | JWT + bcrypt | Secure authentication |
| **AI** | OpenAI/Gemini API | Workout plan generation |
| **Deployment** | Node.js | Runtime environment |

---

## Security Measures

```
Frontend:
├─ JWT stored in localStorage
├─ Protected routes check authentication
├─ Role-based navigation (admin link only shows for admins)
└─ CORS headers for frontend URL only

Backend:
├─ Password hashing: bcrypt (10 salt rounds)
├─ JWT verification: authMiddleware on protected routes
├─ Role checking: roleMiddleware for admin routes
├─ Input validation: All request bodies validated
├─ Error handling: Detailed errors logged, generic responses sent
├─ Environment variables: API keys never in code
├─ AI safety: Response validation for dangerous content
└─ Database: MongoDB Atlas with IP whitelist
```

---

## Scaling Considerations

**Current Setup:**
- Single Node.js server (can be vertically scaled)
- MongoDB single instance (can be replicated)
- Socket.IO in-memory (works for <100 concurrent users)

**For Growth:**
- Add load balancing (Nginx)
- MongoDB Atlas (auto-scaling)
- Redis for Socket.IO adapter (horizontal scaling)
- CDN for static assets (Cloudflare)
- Database sharding if data grows large
