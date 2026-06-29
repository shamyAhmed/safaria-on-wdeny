import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Page } from "@/app/[locale]/_types/Page";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { useLocale } from "next-intl";

export const useGetPages = () => {
  const locale = useLocale();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pages", locale],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<Page[]>>("/pages");
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
