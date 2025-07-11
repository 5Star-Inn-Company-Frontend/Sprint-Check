import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";
export default function AuthForgotPsw() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  async function sendCode(email) {
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${ApiKey}`,
        },
        body: JSON.stringify(email),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error");
    }

    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await sendCode({ email });
      toast.success("Sent Code!");
      localStorage.setItem("resetEmail", email);
      navigate("/verify-code");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <img className="logo" src={Logo} alt="logo" />
      <div className="login signUp forgetPsw">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Forgot Password</h2>
          </div>

          <div className="input-wrapper">
            {/* <img className="input-icon" alt="icon" src={mailIcon} /> */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </div>

          <button
            disabled={loading}
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {loading ? <div className="loader"></div> : "Reset Password"}
          </button>

          {/* <p className="login-forgotPsw" style={{ cursor: "pointer" }}>
          {" "}
          Forgot Password
        </p> */}
          <p className="login-signup">
            Remember login details?{" "}
            <strong
              onClick={() => handleLogin()}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Login
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
