import { useEffect, useState } from "react";

function NurseOTForm() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    doctorName: "",
    operation: "",
    otDate: "",
    otTime: ""
  });

  const token = localStorage.getItem("token");

  // 🔹 Fetch assigned patients
  useEffect(() => {
    const fetchPatients = async () => {
      const res = await fetch("http://localhost:5000/api/nurse/patients", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data.data || []);
    };
    fetchPatients();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (!form.patientId || !form.doctorName || !form.operation) {
      alert("Fill all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/ot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("✅ OT Scheduled Successfully");

      setForm({
        patientId: "",
        doctorName: "",
        operation: "",
        otDate: "",
        otTime: ""
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "420px" }}>
      <h3 style={{ marginBottom: "16px" }}>OT Form</h3>

      <select
        name="patientId"
        value={form.patientId}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Doctor Name"
        name="doctorName"
        value={form.doctorName}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        placeholder="Operation Type"
        name="operation"
        value={form.operation}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="date"
        name="otDate"
        value={form.otDate}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="time"
        name="otTime"
        value={form.otTime}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", marginBottom: "14px" }}
      />

      <button
        onClick={submitForm}
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
        Submit OT Form
      </button>
    </div>
  );
}

export default NurseOTForm;
