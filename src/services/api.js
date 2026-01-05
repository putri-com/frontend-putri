// src/services/api.js
import axios from "axios";

// Buat instance Axios
const API = axios.create({
  baseURL: "https://api.tiketapp.com", // ganti sesuai backend nyata
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: otomatis set Authorization dari token di localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi helper login
export const loginUser = (credentials) => API.post("/auth/login", credentials);

export default API;
