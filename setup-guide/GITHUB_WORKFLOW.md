# FitQuest Git Workflow & GitHub Setup

Complete guide for team collaboration using Git and GitHub.

---

## Repository Setup

### Initial Clone
```bash
# Clone the repository
git clone https://github.com/your-username/fitquest.git
cd fitquest

# Add upstream remote for team collaboration
git remote add upstream https://github.com/team-username/fitquest.git

# Verify remotes
git remote -v
# origin   https://github.com/your-username/fitquest.git (fetch)
# origin   https://github.com/your-username/fitquest.git (push)
# upstream https://github.com/team-username/fitquest.git (fetch)
# upstream https://github.com/team-username/fitquest.git (push)
```

### Initial Configuration
```bash
# Set your Git identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# For global configuration (all repositories)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Branch Strategy

### Main Branches

**`main`** - Production-ready code
- Only stable, tested code
- Protected branch (requires PR review)
- Deployed to production
- Tagged with version numbers

**`dev`** - Development branch
- Integration branch for features
- All features merge here first
- Testing happens here
- Can be unstable

### Feature Branches

Pattern: `feature/[task-name]`

**Examples:**
```
feature/user-registration
feature/workout-crud
feature/ai-integration
feature/admin-panel
feature/socket-io-setup
feature/database-models
feature/api-documentation
```

**Creating a feature branch:**
```bash
# Update dev branch first
git checkout dev
git pull upstream dev

# Create feature branch
git checkout -b feature/workout-crud

# Work on your feature
git add .
git commit -m "feat: add workout CRUD operations"

# Push to your fork
git push origin feature/workout-crud
```

### Bugfix Branches

Pattern: `bugfix/[issue-name]`

**Examples:**
```
bugfix/auth-token-expiration
bugfix/socket-io-reconnect
bugfix/validation-error
```

**Creating a bugfix branch:**
```bash
git checkout dev
git pull upstream dev
git checkout -b bugfix/auth-token-expiration

# Fix the bug
git add .
git commit -m "fix: auth token expiration handling"
git push origin bugfix/auth-token-expiration
```

### Documentation Branches

Pattern: `docs/[document-name]`

**Examples:**
```
docs/api-documentation
docs/setup-guide
docs/architecture-diagram
docs/ai-usage-report
```

---

## Commit Convention

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that don't affect code meaning (formatting, missing semicolons, etc)
refactor: Code change that neither fixes bug nor adds feature
test:     Adding or updating tests
chore:    Changes to build process, dependencies, tools
ci:       Changes to CI configuration files and scripts
perf:     Code change that improves performance
```

### Subject Line Rules
- ✅ Use imperative mood ("add" not "added")
- ✅ Don't capitalize first letter
- ✅ No period (.) at the end
- ✅ Limit to 50 characters
- ✅ Be specific and descriptive

### Examples

#### Good Commits
```bash
git commit -m "feat: add user registration endpoint"
git commit -m "fix: resolve JWT token expiration issue"
git commit -m "docs: update API documentation"
git commit -m "refactor: reorganize goal controller methods"
git commit -m "test: add validation tests for workout model"
git commit -m "style: format code according to eslint rules"
git commit -m "chore: update dependencies"
```

#### Bad Commits
```bash
git commit -m "changes"              # Too vague
git commit -m "Added new feature"    # Capitalized, past tense
git commit -m "fix everything."      # Vague, has period
git commit -m "asdf"                 # Meaningless
```

### Commit with Body (for complex changes)
```bash
git commit -m "feat: implement socket.io real-time updates

- Add socket.IO connection handling
- Create challenge room management
- Implement live progress broadcasting
- Add real-time notification system"
```

### Interactive Rebase (Cleanup before PR)
```bash
# View last 5 commits
git log --oneline -5

# Interactive rebase last 5 commits
git rebase -i HEAD~5

# Then in editor:
# pick = use commit
# squash = combine with previous
# reword = change commit message
```

---

## Pull Request (PR) Workflow

### 1. Create Feature Branch and Make Changes

```bash
# Start from dev
git checkout dev
git pull upstream dev

# Create feature branch
git checkout -b feature/ai-integration

# Make your changes
nano client/src/pages/AIPage.jsx
npm run dev  # Test locally

# Stage and commit
git add .
git commit -m "feat: add AI workout plan generation"
git commit -m "feat: add AI progress analysis"
git commit -m "test: add AI service unit tests"

# Push to your fork
git push origin feature/ai-integration
```

### 2. Create Pull Request on GitHub

**Steps:**
1. Go to GitHub repository
2. Click "New Pull Request"
3. Select:
   - **Base:** `dev` (not `main`)
   - **Compare:** `feature/ai-integration`
4. Fill PR template:

```markdown
## Description
Brief description of what this PR does.

## Changes Made
- Change 1
- Change 2
- Change 3

## Type of Change
- [x] New feature
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
- [x] My code follows the project style
- [x] I have tested this locally
- [x] All commits are clean and descriptive
- [x] Documentation is updated
- [ ] No sensitive data (API keys, passwords) in code
```

5. Click "Create Pull Request"

### 3. Code Review

**Reviewers check:**
- ✅ Code quality and style
- ✅ No breaking changes
- ✅ Tests are included
- ✅ Documentation updated
- ✅ No security issues
- ✅ No hardcoded credentials

**Review Comments:**
```
suggestion: Consider using arrow function here
question: Why did you choose this approach?
concern: This might cause performance issues
```

### 4. Address Feedback

```bash
# Make changes based on feedback
git add .
git commit -m "refactor: address code review feedback"

# Push updated commits
git push origin feature/ai-integration
# (Don't push --force unless specifically asked)
```

### 5. Merge to Dev

Once approved:
- ✅ All checks pass
- ✅ At least 1 reviewer approves
- ✅ No conflicts with dev

**Merge options:**
- Create a merge commit (recommended)
- Squash and merge (if many small commits)
- Rebase and merge (if linear history preferred)

```bash
# After merge, delete your branch
git branch -d feature/ai-integration
git push origin --delete feature/ai-integration
```

### 6. Delete Local Branch

```bash
# Delete local feature branch
git branch -d feature/ai-integration

# Verify deletion
git branch -a
```

---

## Conflict Resolution

### Handling Merge Conflicts

```bash
# Fetch latest changes
git fetch upstream dev

# Try to merge
git merge upstream/dev

# If conflicts occur, check status
git status

# View conflict in file
cat server/models/User.js
# You'll see:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> upstream/dev

# Resolve manually by editing file
# Remove conflict markers and keep desired code

# Stage resolved files
git add server/models/User.js

# Complete merge
git commit -m "merge: resolve conflicts from upstream/dev"

# Push resolved version
git push origin feature/your-feature
```

### Avoid Conflicts

```bash
# Keep your branch updated
git fetch upstream dev
git rebase upstream/dev

# Or merge from dev
git merge upstream/dev
```

---

## Common Git Commands

### Checking Status
```bash
# View status
git status

# View recent commits
git log --oneline -10

# View branches
git branch -a

# View changes
git diff
git diff --staged
```

### Undoing Changes

```bash
# Undo unstaged changes
git checkout -- filename.js

# Unstage file
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo pushed commits (caution!)
git revert <commit-hash>
```

### Stashing Work

```bash
# Save work without committing
git stash

# List stashes
git stash list

# Apply stashed work
git stash apply
git stash pop  # Apply and remove

# Delete stash
git stash drop
```

---

## Team Workflow Example

### Scenario: Христо works on AI Integration

**Week 1:**

```bash
# Monday - Start feature
git checkout dev
git pull upstream dev
git checkout -b feature/ai-integration

# Make changes
echo "// AI Service" > server/services/aiService.js
git add server/services/aiService.js
git commit -m "feat: create AI service with prompt templates"

# Tuesday - Add controller
echo "// AI Controller" > server/controllers/aiController.js
git add server/controllers/aiController.js
git commit -m "feat: add AI controller for endpoints"

# Wednesday - Add routes
echo "// AI Routes" > server/routes/aiRoutes.js
git add server/routes/aiRoutes.js
git commit -m "feat: add AI routes"

# Thursday - Add tests
echo "// Tests" > server/__tests__/ai.test.js
git add server/__tests__/ai.test.js
git commit -m "test: add AI service tests"

# Friday - Push and create PR
git push origin feature/ai-integration
# Create PR on GitHub
# Request review from Стефан and Мирея
```

**Code Review:**

```
Стефан comments: "Can you add error handling for API failures?"
Мирея comments: "Add JSDoc comments for better documentation"
Христофор comments: "Looks good, approved! ✅"
```

**Update based on feedback:**

```bash
# Monday Week 2
# Address feedback
git add server/services/aiService.js
git commit -m "refactor: add error handling and JSDoc comments"
git push origin feature/ai-integration
```

**Merge:**

```
All reviews approved ✅
Merge to dev ✅
Delete branch ✅

Feature is now in dev and will be tested with other features
```

---

## Pre-Merge Checklist

Before creating PR, verify:

```bash
# 1. Pull latest dev
git fetch upstream dev
git rebase upstream/dev

# 2. Test locally
npm run dev      # Frontend
npm run dev      # Backend (in another terminal)
# Manual testing...

# 3. Run linter
npm run lint

# 4. Run tests (if available)
npm run test

# 5. Check commits are clean
git log --oneline -5

# 6. View changes
git diff upstream/dev...HEAD

# 7. Push to fork
git push origin feature/your-feature

# 8. Create PR
# On GitHub...
```

---

## .gitignore Configuration

**`.gitignore` file:**
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

## Protected Branches Configuration

**GitHub Settings → Branches:**

### For `main` branch:
- ✅ Require pull request reviews (1-2 reviewers)
- ✅ Dismiss stale pull request approvals
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict who can push (Team leads only)

### For `dev` branch:
- ✅ Require pull request reviews (1 reviewer)
- ✅ Require status checks to pass
- ✅ Allow force pushes (not recommended)

---

## Release Process (main)

When code is ready for production:

```bash
# 1. Start from dev (after final testing)
git checkout dev
git pull upstream dev

# 2. Create release branch
git checkout -b release/v1.0.0

# 3. Update version in package.json
# Edit version: "1.0.0"
git add package.json
git commit -m "chore: bump version to 1.0.0"

# 4. Create PR to main
git push origin release/v1.0.0
# Create PR: release/v1.0.0 → main

# 5. After approval and merge to main
# Create git tag
git checkout main
git pull upstream main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push upstream v1.0.0

# 6. Merge back to dev
git checkout dev
git merge main
git push upstream dev
```

---

## Team Contribution Requirements

**Each team member must:**

1. ✅ Create commits every 2-3 days
2. ✅ Have pull requests merged by end of week
3. ✅ Participate in code reviews
4. ✅ Keep commits clean and descriptive
5. ✅ Document changes
6. ✅ Test before submitting PR

**Weekly Check:**
```bash
# View your contributions
git log --author="Your Name" --oneline --all --since="1 week ago"
```

---

## Troubleshooting

### Problem: "fatal: not a git repository"
```bash
# Initialize git in project
git init
git remote add origin https://github.com/user/fitquest.git
```

### Problem: "your branch is ahead of 'origin/main' by 5 commits"
```bash
# Push your commits
git push origin feature/your-feature
```

### Problem: "Permission denied (publickey)"
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to GitHub
# Settings → SSH Keys → Add new key
# Paste your public key from ~/.ssh/id_ed25519.pub
```

### Problem: "divergent branches"
```bash
git pull --rebase origin main
# or
git pull --no-rebase origin main
```

### Problem: "Your branch has diverged"
```bash
# Option 1: Rebase
git rebase upstream/dev

# Option 2: Reset
git reset --hard upstream/dev
```

---

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)

---

## Contact

For Git workflow questions or issues:
- Contact Христо (Project Manager)
- Create an issue on GitHub
- Check team documentation

---

**Last Updated:** 2024-01-20  
**Version:** 1.0
