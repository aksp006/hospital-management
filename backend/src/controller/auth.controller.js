const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Patient = require("../model/patient.model");

/**
 * SIGNUP (PATIENT ONLY)
 */
const signup = async (req, res) => {
  try {
    const { email, password, name, phone, age, gender, address } = req.body;

    if (!email || !password || !name || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Create patient
    const patient = await Patient.create({
      name,
      phone,
      age,
      gender,
      address
    });

    // 2️⃣ Create user (role forced to patient)
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "patient",
      linkedId: patient._id
    });

    return res.status(201).json({
      message: "Signup successful. Please login."
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * LOGIN (ALL ROLES)
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        linkedId: user.linkedId
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      role: user.role,
      linkedId: user.linkedId
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

bcrypt.hash("nhospital123", 10).then(console.log);

module.exports = { signup, login };
