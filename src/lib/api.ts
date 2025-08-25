import axios, { AxiosError, AxiosInstance } from "axios";
import toast from "react-hot-toast";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

let isRefreshing = false; // prevent multiple refresh calls
let logoutTriggered = false; // track logout state

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // If unauthorized (401) and not retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !logoutTriggered
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Already refreshing → don’t trigger again
        return Promise.reject(error);
      }

      isRefreshing = true;
      try {
        await api.post("/users/refresh-token");
        isRefreshing = false;
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        logoutTriggered = true; // block further retries
        console.error("Refresh token failed → logging out", refreshError);

        // Redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
  const { status, data }:any = error.response;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    toast.error(data.errors[0].msg);
  } else {
    switch (status) {
      case 400:
        toast.error(data?.message || "Bad Request");
        break;
      case 403:
        toast.error(data?.message || "You don’t have permission to do this.");
        break;
      case 404:
        toast.error(data?.message || "Requested resource not found.");
        break;
      case 500:
        toast.error(data?.message || "Server error. Please try again later.");
        break;
      default:
        toast.error(data?.message || "Something went wrong!");
        break;
    }
  }
} else if (error.request) {
  toast.error("No response from server. Please check your connection.");
} else {
  toast.error("Request error: " + error.message);
}

    return Promise.reject(error);
  }
);
