const Emergency = require("../model/emergency.model");

const createEmergency = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location required" });
    }

    const emergency = await Emergency.create({
      patientId: req.user?.linkedId || null,
      latitude,
      longitude
    });

    res.status(201).json({
      message: "Emergency request sent",
      data: emergency
    });
  } catch (err) {
    console.error("Emergency Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createEmergency };
