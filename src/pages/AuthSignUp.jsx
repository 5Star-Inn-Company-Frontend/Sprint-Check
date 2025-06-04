import { useState, useRef, useEffect } from "react";
import mailIcon from "../assets/codicon_mail.png";
import passwordIcon from "../assets/bx_bxs-lock-alt.png";
import userIcon from "../assets/mdi_user-outline.png";
import Logog from "../assets/dashboardAssets/logof 2.png";
import { Link } from "react-router-dom";
import userPhone from "../assets/line-md_phone.png";
import { useNavigate } from "react-router-dom";
export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);

  // src/api/auth.js
  const ApiKey = "scb1edcd88-64f7485186d9781ca624a903";

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

    if (!res.ok) {
      throw new Error(data.message || "Failed to register");
    }

    console.log(data); // usually returns user info or token
  }

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      business_name: userName,
      phone_number: phone,
    };

    setLoading(true);
    try {
      await registerUser(userData);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <img src={Logog} alt="logo" />
      <div className="login">
        <form className="login-form">
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

          <div className="input-wrapper">
            <img className="input-icon" alt="icon" src={passwordIcon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ cursor: "pointer" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="login-signup">
            Already have an account?{" "}
            <Link to="/login">
              <strong style={{ cursor: "pointer" }}>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
