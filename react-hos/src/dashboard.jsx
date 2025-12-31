import "./dashboardd.css";
import { useNavigate } from "react-router-dom";
// import Log from "./login";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      
      <header className="navbar">
        <h2>Hospital Dashboard</h2>
        
        <button onClick={() => navigate("/login")} className="logout-btn">
          Login
        </button>
      
      </header>

      
      <aside className="sidebar">
        <ul>
          <li>Patients</li>
          <li>Doctors</li>
          <li>Nurses</li>
          <li>Surgeries</li>
          <li>Billing</li>
          <li>Statistics</li>
          <li>Alerts</li>
        </ul>
      </aside>

      
      <main className="main">
        <div className="card-container">
          <div className="card">Total Patients: 120</div>
          <div className="card">Upcoming Surgeries: 3</div>
          <div className="card">Pending Bills: 5</div>
          <div className="card">Staff On Duty: 18</div>
        </div>

        {/* <section className="chart">
          Dashboard Analytics Chart
        </section> */}

        <div className="quick-actions">
          <button>Add Patient</button>
          <button>Fill Surgery Form</button>
          <button>Generate Bill</button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
