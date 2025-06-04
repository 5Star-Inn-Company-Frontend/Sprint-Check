import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import { useNavigate } from "react-router-dom";
import Logog from "../assets/dashboardAssets/logof 2.png";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";

  async function loginUser(loginData) {
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${ApiKey}`,
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to login");
    }

    console.log(data); // usually returns a token
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    setLoading(true);
    try {
      await loginUser(loginData);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPsw = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="main">
      <img src={Logog} alt="logo" />
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

          <button
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {loading ? "Loggin in..." : "Login"}
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
            <strong
              onClick={() => handleSubmit()}
              style={{ cursor: "pointer" }}
            >
              Signup
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
