import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  section_name: string;
  faq: FaqItem[];
};

const useGetFaqs = () => {
  return useQuery({
    queryKey: [apiRoutes.faqs],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<FaqSection[]>>(apiRoutes.faqs);
      return response.data.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetFaqs;
