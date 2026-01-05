import { useEffect, useState } from "react";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        setError("Not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/appointment/me",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load appointments");
        }

        setAppointments(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "24px 28px",
        borderRadius: "12px",
        maxWidth: "650px",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)"
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          color: "#023e8a",
          marginBottom: "16px",
          borderBottom: "2px solid #e6f0ff",
          paddingBottom: "8px"
        }}
      >
        My Appointments
      </h3>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {appointments.map((appt) => (
            <li
              key={appt._id}
              style={{
                padding: "12px 14px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#f7fbff",
                borderLeft: "4px solid #0077b6"
              }}
            >
              <p style={{ margin: 0 }}>
                 <b>Date:</b>{" "}
            {new Date(appt.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
              </p>
              <p style={{ margin: 0 }}>
                <b>Doctor:</b> {appt.doctorName}
              </p>
              <p style={{ margin: 0 }}>
                <b>Time:</b> {appt.time}
              </p>
              <p style={{ margin: 0 }}>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      appt.status === "approved"
                        ? "green"
                        : appt.status === "cancelled"
                        ? "red"
                        : "#ff9800"
                  }}
                >
                  {appt.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientAppointments;
