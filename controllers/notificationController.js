// Notification controller (Stefan) — read/mark Христофор's Notification documents.
const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/notifications
const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);
  const unread = notifications.filter((n) => !n.isRead).length;
  res.json({ success: true, count: notifications.length, unread, notifications });
});

// GET /api/notifications/unread-count
const unreadCount = asyncHandler(async (req, res) => {
  const unread = await Notification.countDocuments({ userId: req.user._id, isRead: false });
  res.json({ success: true, unread });
});

// PUT /api/notifications/:id/read
const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
  res.json({ success: true, notification });
});

// PUT /api/notifications/read-all
const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: 'All notifications marked as read' });
});

module.exports = { listNotifications, unreadCount, markRead, markAllRead };
