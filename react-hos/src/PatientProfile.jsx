import { useEffect, useState } from "react";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/patient/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setPatient(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!patient) return <p>Profile not found</p>;

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px 28px",
        borderRadius: "12px",
        maxWidth: "500px",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)"
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          color: "#023e8a",
          marginBottom: "18px",
          borderBottom: "2px solid #e6f0ff",
          paddingBottom: "8px"
        }}
      >
        My Profile
      </h3>

      <p><b>Name:</b> {patient.name}</p>
      <p><b>Age:</b> {patient.age || "-"}</p>
      <p><b>Gender:</b> {patient.gender || "-"}</p>
      <p><b>Phone:</b> {patient.phone || "-"}</p>
      <p><b>Address:</b> {patient.address || "-"}</p>
    </div>
  );
}

export default PatientProfile;
