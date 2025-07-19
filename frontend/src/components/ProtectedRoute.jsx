import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { refreshToken } from "../api/refreshAPI";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("accessToken");
      if (token) {
        setAuthenticated(true);
        setLoading(false);
        return;
      }

      try {
        const res = await refreshToken(); // try to refresh
        console.log("Refreshed in protected route:", res.data.message);
        setAuthenticated(true);
      } catch (err) {
        console.log("Refresh failed in protected route.");
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
