import { useState } from "react";

function BookAppointment() {
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 Get today's date (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!doctorName || !date || !time) {
      setMessage("Please fill all required fields");
      return;
    }

    // ⏰ Time validation (09:00 - 19:00)
    if (time < "09:00" || time > "19:00") {
      setMessage("Appointments are allowed only between 9 AM and 7 PM");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          doctorName,
          date,
          time,
          reason
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setMessage("✅ Appointment booked successfully");

      // reset form
      setDoctorName("");
      setDate("");
      setTime("");
      setReason("");
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "12px",
        maxWidth: "400px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
      }}
    >
      <h3 style={{ color: "#023e8a", marginBottom: "16px" }}>
        Book Appointment
      </h3>

      <label>Date</label>
      <input
        type="date"
        min={today}                 // ✅ blocks past dates
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <label>Doctor</label>
      <select
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      >
        <option value="">Select Doctor</option>
        <option value="Dr. Sharma">Dr. Sharma</option>
        <option value="Dr. Patel">Dr. Patel</option>
      </select>

      <label>Time</label>
      <input
        type="time"
        min="09:00"                 // ✅ morning 9
        max="19:00"                 // ✅ evening 7
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <label>Reason (optional)</label>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows="2"
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: "#0077b6",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>

      {message && (
        <p style={{ marginTop: "12px", fontSize: "14px" }}>{message}</p>
      )}
    </div>
  );
}

export default BookAppointment;
