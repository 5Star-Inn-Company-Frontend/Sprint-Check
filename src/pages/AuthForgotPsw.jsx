import { useState } from "react";
import mailIcon from "../assets/codicon_mail.png";
import { useNavigate } from "react-router-dom";
export default function AuthForgotPsw() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };
   const handleVerify = () => {
     navigate("/reset-password");
   };
  return (
    <div className="login">
      <form className="login-form">
        <div className="login-header">
          <h2>Forgot Passsword</h2>
          <p>Forgot Password</p>
        </div>

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={mailIcon} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={()=>handleVerify()} >Reset Password</button>

        {/* <p className="login-forgotPsw" style={{ cursor: "pointer" }}>
          {" "}
          Forgot Password
        </p> */}
        <p className="login-signup">
          Remember login details?{" "}
          <strong onClick={() => handleLogin()} style={{ cursor: "pointer" }}>
            Login
          </strong>
        </p>
      </form>
    </div>
  );
}
