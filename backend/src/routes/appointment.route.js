const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  createAppointment,
  getMyAppointments
} = require("../controller/appointment.controller");

router.post("/", auth, authorize("patient"), createAppointment);
router.get("/me", auth, authorize("patient"), getMyAppointments);

module.exports = router;
