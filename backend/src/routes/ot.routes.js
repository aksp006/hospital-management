const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createOT } = require("../controller/ot.controller");


router.post("/", auth, authorize("nurse"), createOT);

module.exports = router;
