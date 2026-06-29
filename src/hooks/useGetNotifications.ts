import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { useQueryWithRefresh } from "./useQueryWithRefresh";
import { getCookie } from "cookies-next";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { Notification } from "@/types/types";

export const getNotificationsAPI = async (): Promise<ApiResponse<Notification[]>> => {
  const response = await axiosInstance.get<ApiResponse<Notification[]>>(apiRoutes.notifications);
  return response.data;
};

export const useGetNotifications = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("RefreshToken");
  const isAuthenticated = !!(userToken || refreshToken);

  const { data, isLoading, error, refetch } = useQueryWithRefresh({
    queryKey: ["notifications"],
    queryFn: getNotificationsAPI,
    enabled: isAuthenticated,
    staleTime: 1000 * 60,
    retry: false,
    tokenType: "user",
  });

  return {
    notifications: data?.data ?? [],
    isLoading,
    error,
    refetch,
  };
};
