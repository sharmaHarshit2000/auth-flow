import axios from "axios";

const RawAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const refreshToken = async () => {
  try {
    const res = await RawAPI.get("/auth/refresh-token");
    console.log("Refresh successful:", res.data);
    return res;
  } catch (err) {
    console.warn("Refresh failed:", err.response?.data || err.message);
    throw err;
  }
};
