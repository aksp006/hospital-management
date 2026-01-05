import { useEffect, useState } from "react";

function PatientBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/bill/my",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        setBills(data.data || []);
      } catch (err) {
        console.error("Failed to load bills");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [token]);

  if (loading) return <p>Loading bills...</p>;

  if (bills.length === 0)
    return <p>No bills available</p>;

  return (
    <div>
      <h3>My Bills</h3>

      {bills.map((bill) => (
        <div
          key={bill._id}
          style={{
            background: "#fff",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        >
          <p>
            💳 <b>Amount:</b> ₹{bill.amount}
          </p>

          <p>
            📝 <b>Description:</b>{" "}
            {bill.description || "Hospital Charges"}
          </p>

          <p>
            📅 <b>Date:</b>{" "}
            {new Date(bill.createdAt).toLocaleDateString("en-IN")}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color: bill.paid ? "#27ae60" : "#e67e22",
                fontWeight: "600"
              }}
            >
              {bill.paid ? "Paid" : "Pending"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default PatientBills;
