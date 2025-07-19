import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import LoginVerifyPage from "../pages/auth/LoginVerifyPage";
import SignupPage from "../pages/auth/SignupPage";
import SignupVerifyPage from "../pages/auth/SignupVerifyPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/verify" element={<LoginVerifyPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/verify" element={<SignupVerifyPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AuthRoutes;
