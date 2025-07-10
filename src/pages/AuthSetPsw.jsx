import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo.png";
const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";
export default function AuthSetPsw() {
  const [newPsw, setnewPsw] = useState("");
  const [loading, setLoading] = useState(false);
  const pswRef = useRef(null);
  const [confPsw, setconfPsw] = useState("");
  const email = localStorage.getItem("resetEmail");
  const code = localStorage.getItem("resetCode");
  const navigate = useNavigate();
  useEffect(() => {
    pswRef.current.focus();

    if (!email || !code) {
      toast.error("Session expired. Please start password reset again.");
      navigate("/forgot-password");
    }
  }, [code, email, navigate]);

  const validatePsw = newPsw === confPsw;

  async function setPsw(payLoad) {
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${ApiKey}`,
        },
        body: JSON.stringify(payLoad),
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
    if (!validatePsw) {
      toast.error("Unequal Password");
      return;
    }
    setLoading(true);
    try {
      const response = await setPsw({ code, email, password: newPsw });
      toast.success("Password Changed");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    navigate("/forgot-password");
  };
  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <img className="logo" src={Logo} alt="logo" />
      <div className="login setPsw">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-header">
            <h2>Set Password</h2>
            <p style={{ cursor: "pointer", color: "black", fontSize: "14px" }}>
              Set a new Password
            </p>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Enter new Password"
              value={newPsw}
              onChange={(e) => setnewPsw(e.target.value)}
              ref={pswRef}
            />
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confPsw}
              onChange={(e) => setconfPsw(e.target.value)}
            />
          </div>

          <p className="resend">
            Didn't receive a code?{" "}
            <span onClick={() => handleResend()}>Resend</span>
          </p>

          <button
            disabled={loading}
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {" "}
            {loading ? <div className="loader"></div> : "Set Password"}
          </button>

          <p className="login-signup">
            Remember login details?{" "}
            <strong
              onClick={() => navigate("/login")}
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
