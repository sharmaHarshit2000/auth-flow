import axios from "axios";
import { refreshToken } from "./refreshAPI";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Required to send cookies (access & refresh tokens)
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid retry/redirect loop if already retried or it's the login route
    const isLoginRoute = originalRequest.url.includes("/auth/login");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRoute
    ) {
      originalRequest._retry = true;
      try {
        await refreshToken(); // Attempt to refresh access token
        return API(originalRequest); // Retry the original request
      } catch (err) {
        console.error("Refresh token failed:", err?.response?.data?.message || err.message);
        // Manually redirect only if not already on login route
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error); 
  }
);

export default API;
