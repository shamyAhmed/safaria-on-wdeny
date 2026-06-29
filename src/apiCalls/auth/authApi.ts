// apiCalls/auth/authApi.ts
import axiosInstance from "@/lib/axios";

export const loginAPI = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const refreshTokenAPI = async (refreshToken: string) => {
  const response = await axiosInstance.post("/auth/refresh", { refreshToken });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
