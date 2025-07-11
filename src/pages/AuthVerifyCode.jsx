import { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
export default function AuthVerifyCode() {
  const [code, setAuthCode] = useState("");
  const email = localStorage.getItem("resetEmail");
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    codeRef.current.focus();
  }, []);

  const ApiKey = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  async function verifyCode(payLoad) {
    const res = await fetch(`${baseURL}/auth/verify-reset-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${ApiKey}`,
      },
      body: JSON.stringify(payLoad),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error");
    }

    console.log(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await verifyCode({ code, email });
      toast.success("successful!");
      localStorage.setItem("resetCode", code);
      navigate("/reset-password");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <img className="logo" src={Logo} alt="logo" />
      <div className="login verifyCode">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Verify Code</h2>
            <p>An authentication code has been sent to your email</p>
          </div>

          <div className="input-wrapper">
            {/* <img className="input-icon" alt="icon" src={mailIcon} /> */}
            <input
              type="number"
              value={code}
              placeholder="Enter Code"
              onChange={(e) => setAuthCode(e.target.value)}
              ref={codeRef}
            />
          </div>

          <p className="login-signup">
            Didn't recieve a code?{" "}
            <strong
              onClick={() => navigate("/forgot-password")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Resend
            </strong>
          </p>

          <button
            disabled={loading}
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {loading ? <div className="loader"></div> : "Submit"}
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
