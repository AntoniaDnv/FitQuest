const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  sets:   Number,
  reps:   Number,
  weight: Number,
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title:           { type: String, required: true },
  type:            { type: String, enum: ["strength", "cardio", "flexibility", "mixed"], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  caloriesBurned:  Number,
  exercises:       { type: [exerciseSchema], required: true },
  notes:           String,
}, { timestamps: true });

module.exports = mongoose.model("Workout", workoutSchema);
