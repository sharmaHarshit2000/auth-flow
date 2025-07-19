import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {

  useEffect(() => {
    // Try refreshing token when app loads
    const tryRefresh = async () => {
      if (!Cookies.get("refreshToken")) {
        console.log("No refresh token. Skipping refresh.");
        return;
      }

      try {
        const res = await refreshToken();
        console.log("Access token refreshed:", res.data.message);
      } catch (err) {
        console.log("Refresh token failed", err?.response?.data?.message);
        toast.error("Session expired, please log in again.");
        window.location.href = "/login";
      }
    };

    tryRefresh();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
