const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title:        { type: String, required: true },
  description:  String,
  targetValue:  { type: Number, required: true, min: 0 },
  currentValue: { type: Number, default: 0, min: 0 },
  unit:         { type: String, enum: ["kg", "steps", "workouts", "minutes", "km"], required: true },
  deadline:     Date,
  status:       { type: String, enum: ["active", "completed", "failed"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
