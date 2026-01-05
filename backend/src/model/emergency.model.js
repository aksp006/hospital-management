const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null
  },
  latitude: Number,
  longitude: Number,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("emergency", emergencySchema);
