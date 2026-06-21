// Notification routes (Stefan)
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validate');
const {
  listNotifications,
  unreadCount,
  markRead,
  markAllRead,
} = require('../controllers/notificationController');

router.use(protect);

router.get('/', listNotifications);
router.get('/unread-count', unreadCount);
router.put('/read-all', markAllRead);
router.put('/:id/read', validateObjectId('id'), markRead);

module.exports = router;
