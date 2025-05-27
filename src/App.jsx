import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/AuthLogin";
import Signup from "./pages/AuthSignUp";
import ForgotPassword from "./pages/AuthForgotPsw";
import ResetPassword from "./pages/AuthSetPsw";
import VerificationCode from "./pages/AuthVerifyCode";
import Dashboard from "./pages/Dashboard";
import ApiLogs from "./pages/apiLogs";
import Billing from "./pages/Billing";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apilogs" element={<ApiLogs />} />
        <Route path="/billing" element={<Billing/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-code" element={<VerificationCode />} />
      </Routes>
    </Router>
  );
}

export default App;
