const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { getMyProfile,getPatientDashboard } = require("../controller/patient.controller");

router.get("/me", auth, authorize("patient"), getMyProfile);

router.get("/dashboard", auth, authorize("patient"), getPatientDashboard);
module.exports = router;
