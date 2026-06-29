import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { PageContent } from "@/app/[locale]/_types/Page";
import { useLocale } from "next-intl";

export const useGetPageContent = (slug?: string) => {
  const locale = useLocale();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pages", slug, locale],
    queryFn: async () => {
      const response = await axiosInstance.get(`/pages/${slug}`);
      return response.data as PageContent;
    },
    enabled: !!slug,
  });

  return { data, isLoading, error };
};
