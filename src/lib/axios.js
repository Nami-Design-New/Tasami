import axios from "axios";
import { getToken, removeToken } from "../utils/token";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  const lang = localStorage.getItem("i18nextLng") || "ar";
  config.headers["Accept-Language"] = lang;
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        removeToken();
        window.location.href = "/login";
        break;

      case 403:
        window.location.href = "/forbidden";
        break;

      case 500:
        console.error("Server error:", error.response?.data);
        break;

      default:
        break;
    }

    // Important! Always return a rejected promise
    return Promise.reject(error);
  }
);
