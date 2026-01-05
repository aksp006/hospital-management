import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // reuse same CSS

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields required");
      return;
    }

    // 🔴 TEMP (replace with API later)
    alert("Account created successfully");

    // after signup → go to login
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1580281657521-6a9b0f9a7c29"
          alt="hospital"
        />
      </div>

      <form className="loginbox" onSubmit={handleSignup}>
        <h3 className="heading">Sign Up</h3>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" type="submit">
          Create Account
        </button>

        <div className="sign" style={{ fontSize: "10px", marginTop: "8px" }}>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
