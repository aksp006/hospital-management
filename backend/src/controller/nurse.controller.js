const Patient = require("../model/patient.model");

const getAssignedPatients = async (req, res) => {
  try {
    const nurseId = req.user.linkedId;

    const patients = await Patient.find({ assignedNurse: nurseId });

    res.json({
      count: patients.length,
      data: patients
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAssignedPatients };
