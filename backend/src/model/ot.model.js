const mongoose = require("mongoose");

const otSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    operation: {
      type: String,
      required: true
    },
    otDate: {
      type: Date,
      required: true
    },
    otTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OT", otSchema);
