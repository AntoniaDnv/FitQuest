const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId:            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  type:              { type: String, enum: ["challenge", "progress", "system", "ai"], required: true },
  title:             { type: String, required: true },
  message:           { type: String, required: true },
  relatedEntityId:   mongoose.Schema.Types.ObjectId,
  relatedEntityType: String,
  isRead:            { type: Boolean, default: false },
  actionUrl:         String,
}, { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema);
