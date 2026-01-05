import "./dashboardd.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PatientProfile from "./PatientProfile";
import PatientAppointments from "./PatientAppointments";
import PatientReports from "./PatientReports";
import PatientBills from "./PatientBills";
import BookAppointment from "./BookAppointment";

import NurseDashboard from "./NurseDashboard";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role") || "patient";

  if (role === "nurse") {
    return <NurseDashboard />;
  }

  const [active, setActive] = useState("dashboard");

  
  const [stats, setStats] = useState({
    nextAppointment: "Not Scheduled",
    reportsCount: 0,
    pendingBills: 0
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          "http://localhost:5000/api/patient/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setStats({
          nextAppointment: data.nextAppointment || "Not Scheduled",
          reportsCount: data.reportsCount || 0,
          pendingBills: data.pendingBills || 0
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      }
    };

    fetchDashboardStats();
  }, [token]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  
  const renderPatientContent = () => {
    switch (active) {
      case "profile":
        return <PatientProfile />;
      case "appointments":
        return <PatientAppointments />;
      case "reports":
        return <PatientReports />;
      case "bills":
        return <PatientBills />;
      case "book":
        return <BookAppointment />;
      default:
        return (
          <>
          
            <div
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1586773860418-d37222d8fce3)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "14px",
                padding: "40px",
                marginBottom: "30px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
              }}
            >
              <h2 style={{ fontSize: "28px", marginBottom: "10px", color: "black" }}>
                Welcome to Your Health Dashboard
              </h2>
              <p style={{ fontSize: "15px", maxWidth: "520px", color: "black" }}>
                Manage appointments, view reports, track bills, and stay connected
                with your healthcare providers.
              </p>
            </div>

            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "20px",
                marginBottom: "30px"
              }}
            >
              <div className="card">
                🗓️ Next Appointment:
                <b> {stats.nextAppointment}</b>
              </div>

              <div className="card">
                📄 Reports Available:
                <b> {stats.reportsCount}</b>
              </div>

              <div className="card">
                💳 Pending Bills:
                <b> ₹{stats.pendingBills}</b>
              </div>
            </div>
          </>
        );
    }
  };

  const handleEmergency = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    if (!window.confirm("🚑 Call ambulance to your location?")) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch("http://localhost:5000/api/emergency", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify({ latitude, longitude })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message);

          alert("Ambulance is on the way!");
        } catch (err) {
          alert("Failed to send emergency request");
        }
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <div className="dashboard">
     
      <header className="navbar">
        <h2 style={{ cursor: "pointer" }} onClick={() => setActive("dashboard")}>
          Hospital Dashboard
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleEmergency}
            style={{
              background: "#d62828",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Emergency
          </button>

          {!token ? (
            <button onClick={() => navigate("/login")} className="logout-btn">
              Login
            </button>
          ) : (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </header>


      <aside className="sidebar">
        <ul>
          <li onClick={() => setActive("profile")}>My Profile</li>
          <li onClick={() => setActive("appointments")}>My Appointments</li>
          <li onClick={() => setActive("reports")}>My Reports</li>
          <li onClick={() => setActive("bills")}>My Bills</li>
        </ul>
      </aside>


      <main className="main">
        {renderPatientContent()}
        <div className="quick-actions">
          <button onClick={() => setActive("book")}>Book Appointment</button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
