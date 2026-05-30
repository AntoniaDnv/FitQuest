/**
 * FitQuest — Log Service
 * Thin wrapper so controllers can log events in one line.
 */

const Log = require("../models/Log");

/**
 * @param {string|ObjectId} userId
 * @param {string} action        – e.g. "CHALLENGE_JOINED"
 * @param {string} entityType    – "user" | "goal" | "workout" | "challenge" | "ai" | "auth"
 * @param {ObjectId|null} entityId
 * @param {object} metadata
 */
async function createLog(userId, action, entityType, entityId = null, metadata = {}) {
  try {
    await Log.create({ userId, action, entityType, entityId, metadata });
  } catch (err) {
    // Never let a logging failure crash the main request
    console.error("Log write failed:", err.message);
  }
}

module.exports = { createLog };
