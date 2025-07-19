import axios from "axios";
import { refreshToken } from "./authAPI";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return API(originalRequest);
      } catch (err) {
        console.error("Token refresh failed");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
