import axios from "axios";
import { refreshToken } from "./refreshAPI";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Access token expired. Trying refresh token...");

      originalRequest._retry = true;
      try {
        await refreshToken();
        console.log("Token refreshed. Retrying original request...");
        return API(originalRequest);
      } catch (err) {
        console.error("Token refresh failed. Redirecting to login...");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
