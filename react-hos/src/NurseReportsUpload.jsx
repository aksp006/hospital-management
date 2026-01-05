import { useState } from "react";

function NurseReportsUpload() {
  const [patientName, setPatientName] = useState("");
  const [reportName, setReportName] = useState("");
  const [file, setFile] = useState(null);

  const uploadReport = () => {
    if (!patientName || !reportName || !file) {
      alert("All fields are required");
      return;
    }

    // TEMP: simulate upload
    console.log("Uploading:", { patientName, reportName, file });
    alert("Report uploaded successfully");

    setPatientName("");
    setReportName("");
    setFile(null);
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h3 style={{ marginBottom: "16px" }}>Upload Medical Report</h3>

      <input
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        placeholder="Report Name (X-Ray, Blood Test...)"
        value={reportName}
        onChange={(e) => setReportName(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "14px" }}
      />

      <button
        onClick={uploadReport}
        style={{
          width: "100%",
          padding: "10px",
          background: "#38b000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Upload Report
      </button>
    </div>
  );
}

export default NurseReportsUpload;
