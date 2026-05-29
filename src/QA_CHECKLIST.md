# FitQuest QA Checklist

## Project Start

- [x] Project installs with `npm install`
- [x] Project starts with `npm run dev`
- [x] Home page loads without console errors

## Admin Routes

- [ ] Guest cannot access `/admin`
- [ ] Regular user cannot access `/admin`
- [ ] Regular user is redirected to `/unauthorized`
- [ ] Admin can access `/admin`
- [ ] Admin can access `/admin/users`
- [ ] Admin can access `/admin/challenges`
- [ ] Admin can access `/admin/logs`
- [ ] Admin can access `/admin/ai-outputs`

## Pages

- [ ] Unauthorized page works
- [ ] Not Found page works
- [ ] Admin Dashboard loads
- [ ] Admin Users loads
- [ ] Admin Challenges loads
- [ ] Admin Logs loads
- [ ] Admin AI Outputs loads
