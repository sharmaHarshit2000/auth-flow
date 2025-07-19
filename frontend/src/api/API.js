import axios from "axios";
import { refreshToken } from "./refreshAPI";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for cookie auth
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        console.log("Refresh success:", res.data.message);

        // Retry the original request
        return API(originalRequest);
      } catch (err) {
        console.error("Refresh failed:", err.response?.data || err.message);
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
