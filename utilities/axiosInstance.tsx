import { STATUS_UNAUTHENTICATED } from "@/Enums/status-enums";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Required for Sanctum to handle cookies
  withXSRFToken: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // Check if the error response status is 401 (unauthenticated) - axios handles only client-side redirect
    if (
      error.response &&
      error.response.status === STATUS_UNAUTHENTICATED &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/auth" &&
      window.location.pathname !== "/"
    ) {
      console.error("Session expired. Redirecting to login...");
      window.location.href = "/auth";
    }

    // Reject the promise so the calling code can handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
