import { useState, useRef, useEffect } from "react";
import Logog from "../assets/dashboardAssets/logof 2.png";
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

  const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";

  async function verifyCode(payLoad) {
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/auth/verify-reset-code",
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
      <img src={Logog} alt="logo" />
      <div className="login">
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
            <strong onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              Login
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
