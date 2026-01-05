const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { getAssignedPatients } = require("../controller/nurse.controller");

router.get(
  "/assigned-patients",
  auth,
  authorize("nurse"),
  getAssignedPatients
);
router.get("/patients", auth, authorize("nurse"), async (req, res) => {
  console.log("/api/nurse/patients HIT");
  console.log("Nurse from token:", req.user);

  try {
  const nurseId = req.user.userId;

    const patients = await Patient.find({
      assignedNurse: nurseId
    });

    console.log("Patients found:", patients);

    res.json({ data: patients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
