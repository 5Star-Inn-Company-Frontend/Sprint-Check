import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";

import Login from "./pages/AuthLogin";
import Signup from "./pages/AuthSignUp";
import ForgotPassword from "./pages/AuthForgotPsw";
import ResetPassword from "./pages/AuthSetPsw";
import VerificationCode from "./pages/AuthVerifyCode";
import Dashboard from "./pages/Dashboard";
import ApiLogs from "./pages/apiLogs";
import Billing from "./pages/Billing";
import Developer from "./pages/Developer";
import ApiDoc from "./pages/ApiDoc";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}

        <Route path="/verify-code" element={<VerificationCode /> } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apilogs"
          element={
            <ProtectedRoute>
              <ApiLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer"
          element={
            <ProtectedRoute>
              <Developer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apiDoc"
          element={
            <ProtectedRoute>
              <ApiDoc />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
