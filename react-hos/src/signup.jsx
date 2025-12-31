import { useState } from "react";
import "./login.css";

function sign() {
  const [email, setUser] = useState("");
  const [password, setpass] = useState("");
  const [showpass, setshowpass] = useState(false);

  const handlelog = () => {
    if (!email || !password) {
      alert("enter credential");
    } else if (email === "aks@mail" && password === "1234") {
      alert("succcessfull");
    } else {
      alert("wrong credential");
    }
  };

  return (
    <div className="login-page">
      
      {/* LEFT IMAGE SECTION */}
      <div className="login-image">
        <img src="https://www.shutterstock.com/search/doctor-illustrator" alt="" />
      </div>

      {/* RIGHT LOGIN BOX */}
      <div className="loginbox">
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

        <button onClick={handlelog} className="btn">Login</button>

      <div className="sign">
        <span>dont have account?</span>
        <link to="./signup">Sign-up</link>
      </div>  
      </div>

    </div>
  );
}

export default sign;
