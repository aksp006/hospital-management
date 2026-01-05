const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { createEmergency } = require("../controller/emergency.controller");

router.post("/", auth.optional, createEmergency);

module.exports = router;