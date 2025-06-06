import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logog from "../assets/dashboardAssets/logof 2.png";
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
      navigate("/verify-code");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogin = () => {
  //   navigate("/");
  // };
  return (
    <div className="main">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <img src={Logog} alt="logo" />
      <div className="login">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-header">
            <h2>Set a new Password</h2>
            <p>An authentication code has been sent to your email</p>
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
            <strong onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Login
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
