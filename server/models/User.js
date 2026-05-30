const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:     { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 30 },
  email:        { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ["user", "admin"], default: "user" },
  age:          { type: Number, min: 13, max: 120 },
  fitnessLevel: { type: String, enum: ["beginner", "intermediate", "advanced"] },
  goalType:     { type: String, enum: ["weight_loss", "muscle_gain", "endurance", "general_fitness"] },
  isBanned:     { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
