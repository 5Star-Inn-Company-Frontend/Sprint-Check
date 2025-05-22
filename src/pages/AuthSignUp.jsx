import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import userIcon from "../assets/mdi_user-outline.png";
import userPhone from "../assets/line-md_phone.png";
import { useNavigate } from "react-router-dom";
export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const nameRef = useRef(null);


  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  };


  return (
    <div className="login">
      <form className="login-form">
        <div className="login-header">
          <h2>Let's get you Started</h2>
          <p>Create an account</p>
        </div>

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={userIcon} />
          <input
            type="text"
            placeholder="Full name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            ref={nameRef}
          />
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

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={userPhone} />
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <img className="input-icon" alt="icon" src={passwordIcon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>

   
        <p className="login-signup">
          Already have an account?{" "}
          <strong onClick={() => handleSubmit()} style={{ cursor: "pointer" }}>
            Login
          </strong>
        </p>
      </form>
    </div>
  );
}
