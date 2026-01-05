const express = require("express");
const router = express.Router();

const { signup, login } = require("../controller/auth.controller");

router.post("/signup", signup); // patient only
router.post("/login", login);   // all roles

module.exports = router;
