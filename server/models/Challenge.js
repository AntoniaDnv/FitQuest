const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  progress:  { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  joinedAt:  { type: Date,   default: Date.now },
}, { _id: false });

const challengeSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  String,
  createdBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  participants: [participantSchema],
  targetValue:  { type: Number, required: true },
  unit:         { type: String, enum: ["steps", "workouts", "minutes", "km"], required: true },
  startDate:    { type: Date, default: Date.now },
  endDate:      { type: Date, required: true },
  status:       { type: String, enum: ["upcoming", "active", "completed"], default: "upcoming" },
  isPublic:     { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Challenge", challengeSchema);
