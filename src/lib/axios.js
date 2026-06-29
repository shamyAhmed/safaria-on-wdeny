// lib/axios.js
import axios from "axios";
import Cookies from "js-cookie";
import allUrl from "../configs/allUrl.json";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || allUrl.apiUrl,
  headers: {
    common: {
      platform: "web",
    },
  },
});

// Request Interceptor - Add token based on current page context
axiosInstance.interceptors.request.use(
  async (config) => {
    const isServer = typeof window === "undefined";
    let token;
    let locale;

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        locale = cookieStore.get("NEXT_LOCALE")?.value;
      } catch {
        // ignore
      }
    } else {
      locale = Cookies.get("NEXT_LOCALE");
    }

    if (!config.headers["Accept-Language"]) {
      config.headers["Accept-Language"] = locale || "en";
    }

    // Determine if we're in admin context by checking current page path
    let isAdminContext = false;

    if (!isServer && typeof window !== "undefined") {
      // Client-side: check if we're on an admin page
      isAdminContext = window.location.pathname.includes("/admin");
    } else {
      // Server-side: check if config has admin marker (you can set this when making the call)
      isAdminContext = config.headers?.["x-admin-context"] === "true";
    }

    const tokenName = isAdminContext ? "AdminToken" : "UserToken";

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        token = cookieStore.get(tokenName)?.value;
      } catch (error) {
        console.error("Error reading server cookies:", error);
      }
    } else {
      token = Cookies.get(tokenName);

      // Fallback: check if token exists in Authorization header
      if (!token && axiosInstance.defaults.headers.common.Authorization) {
        const authHeader = axiosInstance.defaults.headers.common.Authorization;
        token = authHeader.replace("Bearer ", "");
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Just forward errors (hook will handle refresh)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Just reject - let the hook handle refresh
    return Promise.reject(error);
  }
);

export default axiosInstance;
