import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import { useNavigate } from "react-router-dom";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleForgotPsw = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="login">
      <form className="login-form">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={mailIcon} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={passwordIcon} />
          <input
            type="mail"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={(e) => handleSubmit(e)} type="submit">
          Login
        </button>

        <p
          onClick={() => handleForgotPsw()}
          className="login-forgotPsw"
          style={{ cursor: "pointer" }}
        >
          {" "}
          Forgot Password
        </p>
        <p className="login-signup">
          Do not have an account?{" "}
          <strong onClick={() => handleSubmit()} style={{ cursor: "pointer" }}>
            Signup
          </strong>
        </p>
      </form>
    </div>
  );
}
