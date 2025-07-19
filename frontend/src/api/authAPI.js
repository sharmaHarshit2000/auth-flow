import API from "./API";

export const signup = (data) => API.post("/auth/signup", data);
export const verifySignup = (data) => API.post("/auth/signup/verify", data);
export const login = (data) => API.post("/auth/login", data);
export const verifyLogin = (data) => API.post("/auth/login/verify", data);
export const refreshToken = (data) => API.get("/auth/refresh-token", data);
