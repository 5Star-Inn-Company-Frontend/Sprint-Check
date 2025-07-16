import { useState, useRef, useEffect } from "react";
// import mailIcon from "../assets/codicon_mail.png";
// import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, EyeIcon } from "lucide-react";
import { fetchAllAppData } from "../utils/fetchAllAppData";
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
  const ApiKey = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_API_BASE_URL;

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

  async function loginUser(loginData) {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${ApiKey}`,
      },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to login");
    }

    localStorage.setItem("token", data.token);
  }
  function transformApiLogs(apiResponse) {
    return apiResponse.data.data.map((item) => {
      let bvnData = null;
      try {
        if (item.bvn?.data) bvnData = JSON.parse(item.bvn.data);
      } catch (e) {
        console.error("Error parsing BVN data:", e);
      }
      const fullName = bvnData
        ? `${bvnData.firstName || ""} ${bvnData.lastName || ""}`.trim()
        : "Null";
      return {
        id: item.id,
        endpoint: item.type,
        name: fullName,
        amount: 40.0,
        source: item.source,
        performedBy: "Samuel Odejirmi",
        date: new Date(item.created_at).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        status: item.status === 1 ? "SUCCESSFUL" : "FAILED",
        userDetails: bvnData || null,
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      toast.success("Login successful!");
      const token = localStorage.getItem("token");

      const [dashboardData, billingData, historyData] = await fetchAllAppData(
        token
      );

      // Save all to localStorage
      localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
      localStorage.setItem("billingData", JSON.stringify(billingData.data)); // .data needed
      localStorage.setItem(
        "apiLogsData",
        JSON.stringify(transformApiLogs(historyData))
      );

      // Go to dashboard immediately
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={4000} />
      <img
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
        className="logo"
        src={Logo}
        alt="logo"
      />
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>Login</h2>
          </div>

          <div className="input-wrapper">
            {/* <img className="input-icon" alt="icon" src={mailIcon} /> */}
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </div>

          <div className="input-wrapper">
            {/* <img className="input-icon" alt="icon" src={passwordIcon} /> */}
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
