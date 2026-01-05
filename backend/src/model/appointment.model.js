const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true
    },

    doctorName: {
      type: String,
      required: true
    },

   date: {
  type: Date,
  required: true
},

    time: {
      type: String,
      required: true
    },

    reason: {
      type: String
    },

    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);
