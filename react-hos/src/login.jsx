import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Log() {
  const [email, setUser] = useState("");
  const [password, setpass] = useState("");
  const [showpass, setshowpass] = useState(false);

  const navigate = useNavigate();

  const handlelog = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter credentials");
    } else if (email === "aks@mail" && password === "1234") {
      alert("Success!");
      navigate("/dashboard"); // redirect page
    } else {
      alert("Wrong credentials");
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

      {/* RIGHT LOGIN BOX */}
      <form className="loginbox" onSubmit={handlelog}>
        <h3 className="heading">Login</h3>

        <label>Email</label>
        <input
          type="email"
          value={email}
          className="email"
          onChange={(e) => setUser(e.target.value)}
        />

        <label>Password</label>
        <input
          type={showpass ? "text" : "password"}
          value={password}
          className="password"
          onChange={(e) => setpass(e.target.value)}
        />

        <div className="showpass">
          <input
            type="checkbox"
            id="showpass"
            checked={showpass}
            onChange={() => setshowpass(!showpass)}
          />
          <label htmlFor="showpass">Show Password</label>
        </div>

        <button className="btn" type="submit">
          Login
        </button>

        <div className="sign" style={{fontSize:"10px", position:"relative",top:"4px"}}>
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Log;
