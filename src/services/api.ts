// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // We intentionally don't console.error here to avoid Next.js dev overlays for expected API errors like 401s
    return Promise.reject(error);
  }
);

export default api;
