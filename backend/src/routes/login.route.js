const express = require('express')
const router = express.Router()
const {createLogin,loginController} = require('../controller/login.controller')

router.post('/login', loginController);
router.post('/register', createLogin);

module.exports= router; 