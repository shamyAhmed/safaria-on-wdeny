import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { ApiResponse } from "../_types/Api";

export interface Currency {
  id: number;
  code: string;
  name: string;
}

const useGetCurrencies = () => {
  const locale = useLocale();

  return useQuery({
    queryKey: ["currencies", locale],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Currency[]>>("/currencies");
      return response.data.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetCurrencies;
