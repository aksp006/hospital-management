const User = require('../model/login.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username & password required' });
    }

    // 1️⃣ Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      {
        id: user._id,     // ✅ CORRECT
        role: user.role
      },
      process.env.seCREATKEY, // ✅ SAME KEY AS auth.js
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createLogin = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const createData = await User.create({
      username,
      password: hashpassword,
      role: "reception"
    });

    res.status(201).json({
      message: 'Successfully Created',
      data: createData
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLogin, loginController };
