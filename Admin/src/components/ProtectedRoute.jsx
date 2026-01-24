// components/ProtectedRoute.js
import { Navigate } from "react-router";
export default function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isLoggedInAdmin") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
