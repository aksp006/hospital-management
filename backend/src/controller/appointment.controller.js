const Appointment = require("../model/appointment.model");

/**
 * Book appointment (Patient)
 */
const createAppointment = async (req, res) => {
  try {
    const patientId = req.user.linkedId;
    const { doctorName, date, time, reason } = req.body;

    if (!doctorName || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorName,
      date: new Date(req.body.date),
      time,
      reason
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      data: appointment
    });
  } catch (err) {
    console.error("Create Appointment Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get logged-in patient's appointments
 */
const getMyAppointments = async (req, res) => {
  try {
    const patientId = req.user.linkedId;

    const appointments = await Appointment.find({ patientId })
      .sort({ createdAt: -1 });

    res.json({
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    console.error("Get Appointments Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAppointment,
  getMyAppointments
};
