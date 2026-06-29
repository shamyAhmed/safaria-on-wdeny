import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";
import { getCookie } from "cookies-next";

export const getUserProfileAPI = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};

export const useGetUserProfile = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("RefreshToken");
  const isAuthenticated = !!(userToken || refreshToken);

  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQueryWithRefresh({
    queryKey: ["userProfile"],
    queryFn: getUserProfileAPI, // Calls /users/me
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
    tokenType: "user", // ← Specify token type
  });

  return {
    user: userData?.data,
    isLoading,
    error,
    refetch,
    isAuthenticated,
  };
};

