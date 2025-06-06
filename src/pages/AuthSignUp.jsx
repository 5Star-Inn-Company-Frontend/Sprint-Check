import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, EyeIcon } from "lucide-react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import userIcon from "../assets/mdi_user-outline.png";
import Logog from "../assets/dashboardAssets/logof 2.png";
import userPhone from "../assets/line-md_phone.png";

export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();
  const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  async function registerUser(userData) {
    const res = await fetch(
      "https://sprintcheck.megasprintlimited.com.ng/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `ApiKey ${ApiKey}`,
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to register");
    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userName || !email || !phone || !password) {
      toast.error("All fields are required.");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const userData = {
      email,
      password,
      business_name: userName,
      phone_number: phone,
    };

    setLoading(true);
    try {
      await registerUser(userData);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <ToastContainer position="top-right" autoClose={3000} />
      <img src={Logog} alt="logo" />
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
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
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-wrapper" style={{ position: "relative" }}>
            <img className="input-icon" alt="icon" src={passwordIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
                fontSize: "0.85rem",
                color: "#333",
              }}
            >
              {showPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>

          <button
            type="submit"
            style={{ cursor: "pointer" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-signup">
            Already have an account?{" "}
            <Link to="/">
              <strong style={{ cursor: "pointer" }}>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
