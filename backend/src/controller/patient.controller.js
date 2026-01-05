const Patient = require("../model/patient.model");
const Appointment = require("../model/appointment.model");
const getMyProfile = async (req, res) => {
  try {
    const patientId = req.user.linkedId; 

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ data: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const getPatientDashboard = async (req, res) => {
  try {
    const patientId = req.user.linkedId;

    console.log("Patient ID from token:", patientId);

    const allAppointments = await Appointment.find({ patientId });
    console.log("All appointments for patient:", allAppointments);

    const nextAppointment = await Appointment.findOne({
      patientId,
    }).sort({ date: 1 });

    console.log("Next appointment found:", nextAppointment);

    res.json({
      nextAppointment: nextAppointment
        ? `${nextAppointment.date.toDateString()} at ${nextAppointment.time}`
        : "Not Scheduled"
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getMyProfile ,getPatientDashboard};
