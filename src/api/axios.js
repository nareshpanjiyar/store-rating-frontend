import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      toast.error(
        error.response?.data?.message || "Session expired. Logging out...",
      );

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  },
);

export default api;
