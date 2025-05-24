import { useState } from "react";
export default function AuthVerifyCode() {
  const [authCode, setAuthCode] = useState("");
  return (
    <div className="main">
      {" "}
      <div className="login">
        <form className="login-form">
          <div className="login-header">
            <h2>Verify Code</h2>
            <p>An authentication code has been sent to your email</p>
          </div>

          <div className="input-wrapper">
            {/* <img className="input-icon" alt="icon" src={mailIcon} /> */}
            <input
              type=""
              number
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
          </div>

          <p className="login-signup">
            Didn't recieve a code?{" "}
            <strong style={{ cursor: "pointer", color: "blue" }}>Resend</strong>
          </p>

          <button type="submit">Submit</button>

          <p className="login-signup">
            Remember login details?{" "}
            <strong style={{ cursor: "pointer" }}>Login</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
