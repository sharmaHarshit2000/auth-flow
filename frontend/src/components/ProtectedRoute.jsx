import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { refreshToken } from "../api/refreshAPI";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await refreshToken();
        console.log("Session verified via refresh:", res.data.message);
        setAuthenticated(true);
      } catch (err) {
        console.warn("Session invalid:", err?.response?.data?.message || err.message);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
