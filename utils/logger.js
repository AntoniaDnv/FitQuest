const Log = require('../models/Log');

const createLog = async ({ userId, action, entityType, entityId, metadata = {}, ip } = {}) => {
  try {
    await Log.create({ userId, action, entityType, entityId, metadata, ip });
  } catch (err) {
    console.error(`[Logger] Failed to write log "${action}":`, err.message);
  }
};

module.exports = { createLog };
