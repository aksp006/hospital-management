import { useEffect, useState } from "react";

function NurseAssignedPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAssignedPatients = async () => {
      if (!token) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/nurse/assigned-patients",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load patients");
        }

        setPatients(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPatients();
  }, [token]);

  if (loading) return <p>Loading assigned patients...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Assigned Patients</h3>

      {patients.length === 0 ? (
        <p>No patients assigned</p>
      ) : (
        patients.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <b>Name:</b> {p.name} <br />
            <b>Age:</b> {p.age || "-"} <br />
            <b>Ward:</b> {p.ward || "-"} <br />
            <b>Bed:</b> {p.bed || "-"}
          </div>
        ))
      )}
    </div>
  );
}

export default NurseAssignedPatients;
