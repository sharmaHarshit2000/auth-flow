import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import LoginVerifyPage from "../pages/auth/LoginVerifyPage";
import SignupPage from "../pages/auth/SignupPage";
import SignupVerifyPage from "../pages/auth/SignupVerifyPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Default route: redirect to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/verify" element={<LoginVerifyPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/verify" element={<SignupVerifyPage />} />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRoutes;
