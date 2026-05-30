const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  action:     { type: String, required: true, index: true },
  entityType: { type: String, enum: ["user", "goal", "workout", "challenge", "ai", "auth"], required: true },
  entityId:   mongoose.Schema.Types.ObjectId,
  metadata:   mongoose.Schema.Types.Mixed,
}, { timestamps: true });

logSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Log", logSchema);
