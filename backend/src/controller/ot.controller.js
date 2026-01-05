const OT = require("../model/ot.model");

const createOT = async (req, res) => {
  try {
    const OT = require("../model/ot.model");

const createOT = async (req, res) => {
  try {
    const nurseId = req.user.userId; // from JWT
    const { patientId, doctorName, operation, otDate, otTime } = req.body;

    if (!patientId || !doctorName || !operation || !otDate || !otTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    const ot = await OT.create({
      patientId,
      nurseId,
      doctorName,
      operation,
      otDate,
      otTime
    });

    res.status(201).json({
      message: "OT scheduled successfully",
      data: ot
    });
  } catch (err) {
    console.error("OT Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOT };
 // from JWT
    const { patientId, doctorName, operation, otDate, otTime } = req.body;

    if (!patientId || !doctorName || !operation || !otDate || !otTime) {
      return res.status(400).json({ message: "All fields required" });
    }

    const ot = await OT.create({
      patientId,
      nurseId,
      doctorName,
      operation,
      otDate,
      otTime
    });

    res.status(201).json({
      message: "OT scheduled successfully",
      data: ot
    });
  } catch (err) {
    console.error("OT Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOT };
