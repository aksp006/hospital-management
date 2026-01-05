require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.routes");
const patientRoutes = require("./src/routes/patient.route");
const appointmentRoutes = require("./src/routes/appointment.route");
const emergencyRoutes = require("./src/routes/emergency.route");
const otRoutes = require("./src/routes/ot.routes");



const nurseRoutes = require("./src/routes/nurse.routes");


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/nurse", nurseRoutes);
app.use("/api/ot", otRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
