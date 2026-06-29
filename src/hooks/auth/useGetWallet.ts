import axiosInstance from "@/lib/axios";
import { useQueryWithRefresh } from "../useQueryWithRefresh";
import { getCookie } from "cookies-next";
import apiRoutes from "@/lib/apiRoutes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import type { ApiResponse, Wallet } from "@/app/[locale]/_types/Api";

export const getWalletAPI = async (
  currency?: string,
): Promise<ApiResponse<Wallet[]>> => {
  const response = await axiosInstance.get(apiRoutes.wallet, {
    params: { currency },
  });
  return response.data;
};

export const useGetWallet = () => {
  const userToken = getCookie("UserToken");
  const refreshToken = getCookie("RefreshToken");
  const isAuthenticated = !!(userToken || refreshToken);
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQueryWithRefresh({
    queryKey: ["wallet", currency],
    queryFn: () => getWalletAPI(currency),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
    tokenType: "user",
  });

  return {
    wallet: data?.data,
    isLoading,
    error,
    refetch,
  };
};
