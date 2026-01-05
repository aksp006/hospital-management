import { useState } from "react";
import NurseAssignedPatients from "./NurseAssignedPatients";
import NurseOTForm from "./NurseOTForm";
import NurseReportsUpload from "./NurseReportsUpload";

function NurseDashboard() {
  const [active, setActive] = useState("patients");

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="navbar">
        <h2>Nurse Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActive("patients")}>Assigned Patients</li>
          <li onClick={() => setActive("ot")}>OT Form</li>
          <li onClick={() => setActive("reports")}>Upload Reports</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">
        {active === "patients" && <NurseAssignedPatients />}
        {active === "ot" && <NurseOTForm />}
        {active === "reports" && <NurseReportsUpload />}
      </main>
    </div>
  );
}

export default NurseDashboard;