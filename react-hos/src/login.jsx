import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Log() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlelog = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter credentials");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ STORE AUTH DATA
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
localStorage.setItem("patientId", data.linkedId);

      // ✅ REDIRECT
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img
          src="https://cdn.pixabay.com/photo/2020/10/24/11/46/doctor-5684418_1280.png"
          alt="doctor"
        />
      </div>

      <form className="loginbox" onSubmit={handlelog}>
        <h3 className="heading">Login</h3>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type={showpass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="showpass">
          <input
            type="checkbox"
            checked={showpass}
            onChange={() => setShowpass(!showpass)}
          />
          <label>Show Password</label>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="sign">
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Log;
