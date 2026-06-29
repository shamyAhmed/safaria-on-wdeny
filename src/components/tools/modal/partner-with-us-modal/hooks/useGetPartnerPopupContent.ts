import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";

export const useGetPartnerPopupContent = () => {
  const locale = useLocale();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pages", "partner-with-us", locale],
    queryFn: async () => {
      const response = await axiosInstance
        .get(`/pages/partner-with-us`)
        .then((response) => response.data);

      return response;
    },
  });
  return { data, isLoading, error };
};
