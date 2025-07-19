import axios from "axios";

const RawAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const refreshToken = async () => {
  return await RawAPI.get("/auth/refresh-token"); 
};
