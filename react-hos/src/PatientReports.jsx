import { useEffect, useState } from "react";

function PatientReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/report/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        setReports(data.data || []);
      } catch (err) {
        console.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  if (loading) return <p>Loading reports...</p>;

  if (reports.length === 0)
    return <p>No medical reports available</p>;

  return (
    <div>
      <h3>Medical Reports</h3>

      {reports.map((report) => (
        <div
          key={report._id}
          style={{
            background: "#fff",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        >
          <p>
            📄 <b>{report.title}</b>
          </p>

          <p style={{ fontSize: "13px", color: "#666" }}>
            Uploaded on{" "}
            {new Date(report.createdAt).toLocaleDateString()}
          </p>

          <a
            href={report.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              style={{
                padding: "6px 12px",
                background: "#0077b6",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              View Report
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}

export default PatientReports;
