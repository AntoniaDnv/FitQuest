# FitQuest

## AI-Powered Social Fitness Challenge Platform

FitQuest is a full-stack social fitness web platform where users can create workout goals, track exercises, join challenges with friends, and view live progress updates. The platform includes real-time notifications, AI-generated workout plans, an admin panel, and comprehensive event logging.

---

## 🎯 Main Features

### For Regular Users
- ✅ User authentication (Register/Login with JWT)
- ✅ Create and manage fitness goals
- ✅ Add and track workout exercises
- ✅ Create or join fitness challenges
- ✅ Live progress updates and leaderboards
- ✅ Real-time notifications
- ✅ AI-generated personalized workout plans
- ✅ User profile management

### For Administrators
- ✅ User management (view, block, delete users)
- ✅ Challenge moderation
- ✅ System event logging and analytics
- ✅ AI output validation and review
- ✅ Platform activity monitoring

---

## 📋 Demo Scenario

1. User registers and logs in
2. User creates a fitness goal: "Train 4 times per week"
3. AI generates a personalized workout plan
4. User creates a challenge: "10,000 steps daily for 7 days"
5. Another user joins the challenge
6. Users update their progress
7. Leaderboard updates in real-time
8. Real-time notifications appear
9. Admin enters the admin panel
10. Admin views users, logs, and active challenges

---

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Socket.IO Client** - Real-time updates

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **bcrypt** - Password hashing
- **OpenAI / Google Gemini API** - AI integration

### Development Tools
- **Vite** - Frontend bundler
- **Nodemon** - Backend auto-reload
- **Git** - Version control

---

## 📁 Project Structure

```
fitquest/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/                   # User pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── GoalsPage.jsx
│   │   │   ├── WorkoutsPage.jsx
│   │   │   ├── ChallengesPage.jsx
│   │   │   ├── ChallengeDetailsPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── pages/admin/             # Admin pages
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   ├── ChallengesPage.jsx
│   │   │   ├── LogsPage.jsx
│   │   │   └── AIOutputsPage.jsx
│   │   ├── context/                 # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── services/                # API calls
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── goalService.js
│   │   │   ├── workoutService.js
│   │   │   ├── challengeService.js
│   │   │   └── adminService.js
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.js
│   │   │   └── useSocket.js
│   │   ├── routes/                  # Route protection
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── styles/                  # Global styles
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example

├── server/                          # Express backend
│   ├── controllers/                 # Route handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── goalController.js
│   │   ├── workoutController.js
│   │   ├── challengeController.js
│   │   ├── adminController.js
│   │   └── aiController.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── goalRoutes.js
│   │   ├── workoutRoutes.js
│   │   ├── challengeRoutes.js
│   │   ├── adminRoutes.js
│   │   └── aiRoutes.js
│   ├── models/                      # MongoDB models
│   │   ├── User.js
│   │   ├── Goal.js
│   │   ├── Workout.js
│   │   ├── Challenge.js
│   │   ├── Notification.js
│   │   ├── Log.js
│   │   └── AIWorkoutPlan.js
│   ├── middleware/                  # Express middleware
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorHandler.js
│   ├── services/                    # Business logic
│   │   ├── authService.js
│   │   ├── aiService.js
│   │   └── logService.js
│   ├── socket/                      # Socket.IO handlers
│   │   └── socketHandlers.js
│   ├── utils/                       # Helper functions
│   │   ├── validators.js
│   │   ├── tokenUtils.js
│   │   └── responseFormatter.js
│   ├── app.js                       # Express app setup
│   ├── server.js                    # Server entry point
│   ├── package.json
│   └── .env.example

├── docs/                            # Documentation
│   ├── architecture-diagram.md
│   ├── database-schema.md
│   ├── api-documentation.md
│   └── ai-usage-report.md

└── README.md                        # This file
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- OpenAI or Google Gemini API key
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/fitquest.git
cd fitquest
```

### Step 2: Setup Backend
```bash
cd server
npm install
```

Create `.env` file in the server folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fitquest
# or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fitquest?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_chars
JWT_EXPIRE=7d

AI_API_KEY=your_openai_or_gemini_api_key_here
AI_MODEL=gpt-4-turbo
# or: gpt-3.5-turbo

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
# or
nodemon server.js
```

Backend will run on: `http://localhost:5000`

### Step 3: Setup Frontend
```bash
cd client
npm install
```

Create `.env` file in the client folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

### Step 4: MongoDB Setup
Ensure MongoDB is running:
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, ensure the connection string is in your .env
```

### Step 5: Seed Demo Data (Optional)
```bash
cd server
node scripts/seedDatabase.js
```

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **Антония** | Frontend Developer / UI Lead | User interface, dashboard, pages, components |
| **Мирея** | Frontend Logic / Admin Panel / QA | Admin panel, protected routes, testing |
| **Стефан** | Backend Developer / API Lead | REST API, authentication, security |
| **Христофор** | Database / Real-Time Engineer | MongoDB, Socket.IO, live updates |
| **Христо** | AI Integration / Documentation / PM | AI functionality, documentation, GitHub management |

---

## 🔐 User Roles

### Regular User (`role: "user"`)
- Create and manage personal goals
- Add and track workouts
- Create and join challenges
- View and update progress
- Receive AI workout recommendations
- Get real-time notifications

### Administrator (`role: "admin"`)
- View all users in the system
- Block or delete users
- View all challenges
- Delete inappropriate challenges
- Access system logs and analytics
- Review and validate AI-generated content
- Monitor platform activity

---

## 📊 Demo Accounts

### Regular User
- **Email:** user@fitquest.com
- **Password:** Password123!

### Admin User
- **Email:** admin@fitquest.com
- **Password:** AdminPass123!

---

## 📡 REST API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Routes (Protected)
- `GET /api/users/me` - Get current user data
- `PUT /api/users/me` - Update user profile

### Goals (Protected)
- `POST /api/goals` - Create a goal
- `GET /api/goals/my` - Get user's goals
- `PUT /api/goals/:id` - Update a goal
- `DELETE /api/goals/:id` - Delete a goal

### Workouts (Protected)
- `POST /api/workouts` - Add a workout
- `GET /api/workouts/my` - Get user's workouts
- `PUT /api/workouts/:id` - Update a workout
- `DELETE /api/workouts/:id` - Delete a workout

### Challenges (Protected)
- `POST /api/challenges` - Create a challenge
- `GET /api/challenges` - Get all public challenges
- `GET /api/challenges/:id` - Get challenge details
- `POST /api/challenges/:id/join` - Join a challenge
- `PUT /api/challenges/:id/progress` - Update progress
- `DELETE /api/challenges/:id` - Delete a challenge

### AI Routes (Protected)
- `POST /api/ai/workout-plan` - Generate AI workout plan
- `POST /api/ai/challenge-suggestion` - Get AI challenge suggestion
- `POST /api/ai/progress-analysis` - Get AI progress analysis

### Admin Routes (Admin Only)
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete a user
- `PUT /api/admin/users/:id/ban` - Ban/unban a user
- `GET /api/admin/challenges` - Get all challenges
- `DELETE /api/admin/challenges/:id` - Delete a challenge
- `GET /api/admin/logs` - Get system logs
- `GET /api/admin/ai-outputs` - Get all AI outputs

---

## 🤖 AI Integration

FitQuest uses AI to generate personalized fitness recommendations.

### AI Functions

#### 1. Workout Plan Generation
Users can input their fitness goal, level, available days, and limitations. The AI generates a safe, structured weekly workout plan.

#### 2. Challenge Suggestions
AI can suggest realistic fitness challenges based on user's activity history and fitness goals.

#### 3. Progress Analysis
AI provides motivational summaries and improvement suggestions based on user's weekly progress.

### Safety Measures
- ✅ AI responses are validated for dangerous content
- ✅ Medical disclaimer is always shown
- ✅ Responses are stored for admin review
- ✅ Dangerous advice is flagged

---

## ⚡ Real-Time Features

FitQuest uses **Socket.IO** for real-time updates:

- **Live Progress Updates** - Challenge progress updates instantly
- **Live Leaderboard** - Rankings update in real-time
- **Real-Time Notifications** - Users get instant alerts
- **Challenge Room Updates** - All participants see changes immediately

### Socket Events
- `joinChallenge` - Join a challenge room
- `leaveChallenge` - Leave a challenge room
- `updateProgress` - Send progress update
- `progressUpdated` - Receive progress update
- `leaderboardUpdated` - Receive leaderboard update
- `newNotification` - Receive notification
- `challengeCompleted` - Challenge is completed

---

## 📝 Event Logging

The system logs important actions:

| Action | Description |
|--------|-------------|
| USER_REGISTERED | New user registered |
| USER_LOGIN | User logged in |
| USER_LOGOUT | User logged out |
| GOAL_CREATED | Goal created |
| WORKOUT_CREATED | Workout added |
| CHALLENGE_CREATED | Challenge created |
| CHALLENGE_JOINED | User joined challenge |
| PROGRESS_UPDATED | Progress updated |
| AI_PLAN_GENERATED | AI workout plan generated |
| ADMIN_USER_DELETED | Admin deleted user |
| CONTENT_MODERATED | Content moderated |

---

## 📚 Additional Documentation

- [Architecture Diagram](./docs/architecture-diagram.md) - System architecture
- [Database Schema](./docs/database-schema.md) - MongoDB models
- [API Documentation](./docs/api-documentation.md) - Detailed API reference
- [AI Usage Report](./docs/ai-usage-report.md) - AI integration details

---

## 🔄 Git Workflow

### Branch Strategy
- `main` - Production-ready code
- `dev` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Commit Convention
```
feat: add new feature
fix: fix a bug
docs: add documentation
style: format code
refactor: refactor code
test: add tests
chore: maintenance tasks
```

### Pull Request Workflow
1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit your changes: `git commit -m "feat: add my feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Create a Pull Request
5. Wait for review and merge

---

## 📋 3-Week Development Plan

### Week 1: Foundation
- Project setup
- Authentication system
- Basic frontend pages
- MongoDB connection
- User roles

### Week 2: Main Features
- CRUD operations for goals, workouts, challenges
- Real-time updates with Socket.IO
- AI workout plan generation
- Admin panel basics
- Event logging

### Week 3: Finalization
- Bug fixes and polishing
- Complete admin panel
- Documentation
- Final testing and demo preparation

---

## 🎁 Bonus Features (If Time Permits)

- 🏆 Badges system (First Workout, 7-Day Streak, etc.)
- 📊 Leaderboard history
- 🔥 Streak counter
- 📵 Offline support
- ✨ Advanced animations

---

## 🛡️ Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT authentication for protected routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled for frontend URL
- ✅ Environment variables for sensitive data

---

## 📧 Support & Contact

For questions or issues, please contact the project team or open an issue on GitHub.

---

## 📄 License

This project is created for educational purposes.

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** In Development ✅