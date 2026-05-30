# FitQuest File Organization Guide

Complete guide on where to place each file in the project directory structure for Христо's work.

---

## Project Root Structure

```
fitquest/
├── client/                          # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── server/                          # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── socket/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/                            # Documentation
│   ├── architecture-diagram.md
│   ├── database-schema.md
│   ├── api-documentation.md
│   └── ai-usage-report.md
│
├── .github/                         # GitHub Configuration
│   └── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│
├── .gitignore
├── README.md
├── GITHUB_WORKFLOW.md
├── CONTRIBUTING.md
└── package.json (root, if using monorepo)
```

---

## Detailed File Placement

### 1. Backend AI Files

#### Location: `server/services/aiService.js`
```
fitquest/
└── server/
    └── services/
        └── aiService.js  ← PLACE FILE HERE
```

**File:** `server_services_aiService.js` (from outputs)  
**Copy to:** `server/services/aiService.js`

**Commands:**
```bash
cd server/services/
# Paste the aiService.js content here
```

---

#### Location: `server/controllers/aiController.js`
```
fitquest/
└── server/
    └── controllers/
        └── aiController.js  ← PLACE FILE HERE
```

**File:** `server_controllers_aiController.js` (from outputs)  
**Copy to:** `server/controllers/aiController.js`

---

#### Location: `server/routes/aiRoutes.js`
```
fitquest/
└── server/
    └── routes/
        └── aiRoutes.js  ← PLACE FILE HERE
```

**File:** `server_routes_aiRoutes.js` (from outputs)  
**Copy to:** `server/routes/aiRoutes.js`

---

#### Location: `server/models/AIWorkoutPlan.js`
```
fitquest/
└── server/
    └── models/
        └── AIWorkoutPlan.js  ← PLACE FILE HERE
```

**File:** `server_models_AIWorkoutPlan.js` (from outputs)  
**Copy to:** `server/models/AIWorkoutPlan.js`

---

### 2. Documentation Files

#### Location: `docs/architecture-diagram.md`
```
fitquest/
└── docs/
    └── architecture-diagram.md  ← PLACE FILE HERE
```

**File:** `docs_architecture-diagram.md` (from outputs)  
**Copy to:** `docs/architecture-diagram.md`

---

#### Location: `docs/database-schema.md`
```
fitquest/
└── docs/
    └── database-schema.md  ← PLACE FILE HERE
```

**File:** `docs_database-schema.md` (from outputs)  
**Copy to:** `docs/database-schema.md`

---

#### Location: `docs/api-documentation.md`
```
fitquest/
└── docs/
    └── api-documentation.md  ← PLACE FILE HERE
```

**File:** `docs_api-documentation.md` (from outputs)  
**Copy to:** `docs/api-documentation.md`

---

#### Location: `docs/ai-usage-report.md`
```
fitquest/
└── docs/
    └── ai-usage-report.md  ← PLACE FILE HERE
```

**File:** `docs_ai-usage-report.md` (from outputs)  
**Copy to:** `docs/ai-usage-report.md`

---

### 3. Root Documentation Files

#### Location: `README.md`
```
fitquest/
└── README.md  ← PLACE FILE HERE
```

**File:** `README.md` (from outputs)  
**Copy to:** `README.md` (root folder)

---

#### Location: `GITHUB_WORKFLOW.md`
```
fitquest/
└── GITHUB_WORKFLOW.md  ← PLACE FILE HERE
```

**File:** `GITHUB_WORKFLOW.md` (from outputs)  
**Copy to:** `GITHUB_WORKFLOW.md` (root folder)

---

### 4. GitHub Configuration Files

#### Location: `.github/PULL_REQUEST_TEMPLATE.md`
```
fitquest/
└── .github/
    └── PULL_REQUEST_TEMPLATE.md  ← PLACE FILE HERE
```

**Content for Pull Request Template:**
```markdown
## Description
Brief description of what this PR does.

## Changes Made
- Change 1
- Change 2
- Change 3

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## How to Test
Steps to test this feature:
1. ...
2. ...

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] My code follows the project style
- [ ] I have tested this locally
- [ ] All commits are clean and descriptive
- [ ] Documentation is updated
- [ ] No sensitive data (API keys, passwords) in code
```

---

#### Location: `.github/ISSUE_TEMPLATE/bug_report.md`
```
fitquest/
└── .github/
    └── ISSUE_TEMPLATE/
        └── bug_report.md  ← PLACE FILE HERE
```

**Content:**
```markdown
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: 'bug'
---

## Description
Clear description of the bug.

## Reproduction Steps
1. ...
2. ...
3. ...

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox]
- Node version: [e.g. 16.0.0]

## Screenshots
[if applicable]
```

---

#### Location: `.github/ISSUE_TEMPLATE/feature_request.md`
```
fitquest/
└── .github/
    └── ISSUE_TEMPLATE/
        └── feature_request.md  ← PLACE FILE HERE
```

**Content:**
```markdown
---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: 'enhancement'
---

## Description
Clear description of the feature.

## Motivation
Why would this feature be useful?

## Implementation
How should it be implemented?

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

---

### 5. Contributing Guidelines

#### Location: `CONTRIBUTING.md`
```
fitquest/
└── CONTRIBUTING.md  ← PLACE FILE HERE
```

**Content:**
```markdown
# Contributing to FitQuest

Thank you for contributing to FitQuest!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/fitquest.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature`
7. Create a Pull Request

## Code Style

- Follow commit conventions in GITHUB_WORKFLOW.md
- Use descriptive variable names
- Add comments for complex logic
- Test your code before pushing

## Branch Naming

- `feature/` - new features
- `bugfix/` - bug fixes
- `docs/` - documentation
- `chore/` - maintenance

## Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Follow PR template
4. Wait for approval
5. Merge to dev (not main)

## Questions?

Check the documentation in the `/docs` folder or ask the team!
```

---

### 6. Git Configuration

#### Location: `.gitignore`
```
fitquest/
└── .gitignore  ← PLACE FILE HERE
```

**Content:**
```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log
package-lock.json
yarn.lock

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Build artifacts
dist/
build/
*.tsbuildinfo

# Logs
logs/
*.log

# OS files
.DS_Store
Thumbs.db

# API Keys and sensitive data
*.pem
*.key
secrets.json

# Temporary files
*.tmp
.cache/
temp/
```

---

## File Organization Checklist

### Backend Code Files ✅
- [ ] `server/services/aiService.js` - Created and tested
- [ ] `server/controllers/aiController.js` - Created and tested
- [ ] `server/routes/aiRoutes.js` - Created
- [ ] `server/models/AIWorkoutPlan.js` - Created with indexes

### Documentation Files ✅
- [ ] `README.md` - In root folder
- [ ] `docs/architecture-diagram.md` - Created
- [ ] `docs/database-schema.md` - Created
- [ ] `docs/api-documentation.md` - Created
- [ ] `docs/ai-usage-report.md` - Created
- [ ] `GITHUB_WORKFLOW.md` - In root folder

### GitHub Configuration ✅
- [ ] `.github/PULL_REQUEST_TEMPLATE.md` - Created
- [ ] `.github/ISSUE_TEMPLATE/bug_report.md` - Created
- [ ] `.github/ISSUE_TEMPLATE/feature_request.md` - Created
- [ ] `CONTRIBUTING.md` - In root folder
- [ ] `.gitignore` - In root folder

### Integration Steps ✅
- [ ] All backend files imported in main Express app
- [ ] All routes registered in `server/app.js`
- [ ] All models imported in appropriate places
- [ ] Environment variables configured
- [ ] Documentation linked in README

---

## How to Copy Files

### Option 1: Copy from Outputs
```bash
# Navigate to your project root
cd fitquest/

# Copy backend code
cp /mnt/user-data/outputs/server_services_aiService.js server/services/aiService.js
cp /mnt/user-data/outputs/server_controllers_aiController.js server/controllers/aiController.js
cp /mnt/user-data/outputs/server_routes_aiRoutes.js server/routes/aiRoutes.js
cp /mnt/user-data/outputs/server_models_AIWorkoutPlan.js server/models/AIWorkoutPlan.js

# Copy documentation
cp /mnt/user-data/outputs/README.md README.md
cp /mnt/user-data/outputs/docs_architecture-diagram.md docs/architecture-diagram.md
cp /mnt/user-data/outputs/docs_database-schema.md docs/database-schema.md
cp /mnt/user-data/outputs/docs_api-documentation.md docs/api-documentation.md
cp /mnt/user-data/outputs/docs_ai-usage-report.md docs/ai-usage-report.md
cp /mnt/user-data/outputs/GITHUB_WORKFLOW.md GITHUB_WORKFLOW.md
```

### Option 2: Manual Copy-Paste
1. Open file from `/mnt/user-data/outputs/`
2. Copy all content
3. Create/edit file in project structure
4. Paste content
5. Save file

---

## Integration Instructions

### 1. Register AI Routes in Express App

**File:** `server/app.js`

```javascript
const aiRoutes = require('./routes/aiRoutes');

// ... other routes ...

// Register AI routes
app.use('/api/ai', aiRoutes);

// Or for admin routes
app.use('/api/admin/ai-outputs', aiRoutes); // if admin routes in aiRoutes
```

### 2. Import AI Model

**Anywhere you need AIWorkoutPlan:**
```javascript
const AIWorkoutPlan = require('../models/AIWorkoutPlan');

// Then use in queries
const plan = await AIWorkoutPlan.findById(id);
```

### 3. Use AI Service

**In controllers:**
```javascript
const aiService = require('../services/aiService');

// Generate plan
const result = await aiService.generateWorkoutPlan(userId, data);
```

### 4. Link Documentation

**In README.md, already included:**
- Architecture diagram link
- Database schema link
- API documentation link
- AI usage report link

---

## Project Structure After All Files Added

```
fitquest/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   │   ├── aiController.js              ✅ ADDED
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── ...
│   ├── routes/
│   │   ├── aiRoutes.js                  ✅ ADDED
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── ...
│   ├── models/
│   │   ├── AIWorkoutPlan.js             ✅ ADDED
│   │   ├── User.js
│   │   ├── Goal.js
│   │   └── ...
│   ├── services/
│   │   ├── aiService.js                 ✅ ADDED
│   │   ├── authService.js
│   │   └── ...
│   ├── middleware/
│   ├── socket/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/
│   ├── architecture-diagram.md          ✅ ADDED
│   ├── database-schema.md               ✅ ADDED
│   ├── api-documentation.md             ✅ ADDED
│   └── ai-usage-report.md               ✅ ADDED
│
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md         ✅ ADDED
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md                ✅ ADDED
│       └── feature_request.md           ✅ ADDED
│
├── .gitignore                           ✅ ADDED
├── README.md                            ✅ ADDED
├── GITHUB_WORKFLOW.md                   ✅ ADDED
├── CONTRIBUTING.md                      ✅ ADDED
└── package.json
```

---

## Verification Checklist

After placing all files, verify:

### Backend Code
- [ ] `aiService.js` exports correctly
- [ ] `aiController.js` imports aiService
- [ ] `aiRoutes.js` imports aiController
- [ ] `AIWorkoutPlan.js` model loads without errors
- [ ] No syntax errors in any file
- [ ] All imports are correct

### Documentation
- [ ] All .md files are readable
- [ ] Links in README work (relative paths)
- [ ] Code examples are valid
- [ ] No broken markdown
- [ ] All diagrams display correctly

### GitHub
- [ ] `.gitignore` ignores correct files
- [ ] `.github/` folder created
- [ ] PR template visible when creating PR
- [ ] Issues templates available

### Integration
- [ ] Routes registered in Express app
- [ ] Models imported in controllers
- [ ] Services imported in controllers
- [ ] No "Cannot find module" errors
- [ ] Development server starts without issues

---

## Common Issues & Solutions

### Issue: "Cannot find module 'aiService'"
**Solution:** Check file path and capitalization
```javascript
// CORRECT:
const aiService = require('../services/aiService');

// WRONG:
const aiService = require('../services/AIService');
const aiService = require('../services/ai-service');
```

### Issue: Model not working
**Solution:** Ensure Mongoose is imported and connected
```javascript
const mongoose = require('mongoose');

const aiWorkoutPlanSchema = new mongoose.Schema({
  // fields...
});

module.exports = mongoose.model('AIWorkoutPlan', aiWorkoutPlanSchema);
```

### Issue: Routes returning 404
**Solution:** Check route registration in app.js
```javascript
// In app.js
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

// Then in aiRoutes.js
router.post('/workout-plan', controller.generateWorkoutPlan);
// Full path becomes: POST /api/ai/workout-plan
```

---

## Next Steps After File Organization

1. ✅ Place all files in correct locations
2. ✅ Verify all files exist and are readable
3. ✅ Run `npm install` if dependencies added
4. ✅ Test backend with `npm run dev`
5. ✅ Test all AI endpoints with Postman/curl
6. ✅ Create GitHub issues
7. ✅ Set up branch protection
8. ✅ Assign tasks to team members
9. ✅ Begin Week 1 development

---

## File Summary

**Total Files to Add:** 14 files  
**Backend Code:** 4 files (~900 lines)  
**Documentation:** 6 files (~8500 lines)  
**Config/GitHub:** 4 files (~200 lines)  

**Total Content:** ~9600 lines

---

**Version:** 1.0  
**Last Updated:** 2024-01-20  
**Status:** Complete ✅
