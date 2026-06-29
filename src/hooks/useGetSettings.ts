import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse, Settings } from "@/app/[locale]/_types/Api";

export const getSettingsAPI = async (): Promise<ApiResponse<Settings>> => {
  const response = await axiosInstance.get<ApiResponse<Settings>>(apiRoutes.settings);
  return response.data;
};

export const useGetSettings = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsAPI,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return {
    settings: data?.data ?? null,
    isLoading,
    error,
  };
};
