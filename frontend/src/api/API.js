import axios from "axios";
import { refreshToken } from "./refreshAPI";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Required to send cookies
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken(); // Server should set new accessToken cookie
        return API(originalRequest); // Retry the original request
      } catch (err) {
        console.error("Refresh token failed:", err.message);
        window.location.href = "/login"; // Redirect to login on failure
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); // Other errors
  }
);

export default API;
