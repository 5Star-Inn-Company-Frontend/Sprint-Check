import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthLogin";
import Signup from "./pages/AuthSignUp";
import ForgotPassword from "./pages/AuthForgotPsw";
import ResetPassword from "./pages/AuthSetPsw";
import VerificationCode from "./pages/AuthVerifyCode";

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerificationCode />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
