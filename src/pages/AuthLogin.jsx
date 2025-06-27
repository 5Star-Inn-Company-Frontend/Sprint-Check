import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, EyeIcon } from "lucide-react";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg));
    }

    return Object.keys(newErrors).length === 0;
  };

  function handleDashboard() {
    const token = localStorage.getItem("token");
    async function toDashboard(authCode) {
      const res = await fetch(
        "https://sprintcheck.megasprintlimited.com.ng/api/dashboard",
        {
          method: "GET",
          headers: {
            //  "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authCode}`,
          },
          // body: JSON.stringify(authCode),
        }
      );

      const data = await res.json();
      console.log(data);
      localStorage.setItem("dashboardData", JSON.stringify(data));

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      } else {
        navigate("/dashboard");
      }
    }
    toDashboard(token);
  }

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

    localStorage.setItem("token", data.token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      toast.success("Login successful!");
      handleDashboard();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <img className="logo" src={Logo} alt="logo" />
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Login</h2>
          </div>

          <div className="input-wrapper">
            <img className="input-icon" alt="icon" src={mailIcon} />
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </div>

          <div className="input-wrapper">
            <img className="input-icon" alt="icon" src={passwordIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "20px",
                top: "55%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.9rem",
                color: "#555",
              }}
            >
              {showPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>

          <p
            onClick={() => navigate("/forgot-password")}
            className="login-forgotPsw"
            style={{ cursor: "pointer" }}
          >
            Forgot Password
          </p>

          <button
            disabled={loading}
            style={{ cursor: "pointer" }}
            type="submit"
          >
            {loading ? <div className="loader"></div> : "Login"}
          </button>

          <p className="login-signup">
            Do not have an account?{" "}
            <strong
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              &nbsp;Signup
            </strong>
          </p>
        </form>
      </div>
    </div>
  );
}
