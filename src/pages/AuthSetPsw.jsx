import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logog from "../assets/dashboardAssets/logof 2.png";

export default function AuthSetPsw() {
  const [newPsw, setnewPsw] = useState("");
  const [confPsw, setconfPsw] = useState("");

   const navigate = useNavigate();

  
  
   const handleLogin = () => {
     navigate("/");
   };
  return (
    <div className="main">
      <img src={Logog} alt="logo"/>
      <div className="login">
        <form className="login-form">
          <div className="login-header">
            <h2>Verify Code</h2>
            <p>An authentication code has been sent to your email</p>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter new Password"
              value={newPsw}
              onChange={(e) => setnewPsw(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Confirm Password"
              value={confPsw}
              onChange={(e) => setconfPsw(e.target.value)}
            />
          </div>

         

          <button type="submit">Set Password</button>

          <p className="login-signup">
            Remember login details?{" "}
            <strong onClick={() => handleLogin()} style={{ cursor: "pointer" }}>
              Login
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
