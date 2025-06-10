import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // or your actual login check

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children;
};

export default ProtectedRoute;
