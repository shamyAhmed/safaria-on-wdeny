import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  image: {
    url: string;
  };
  category: {
    id: number;
    name: string;
  };
};

export type BlogPostDetail = BlogPost & {
  created_at: string | null;
};

const useGetBlogs = (category?: number) => {
  return useQuery({
    queryKey: [apiRoutes.posts, category],
    queryFn: async () => {
      const params = category ? { category_id: category } : undefined;
      const response = await axiosInstance.get<ApiResponse<BlogPost[]>>(apiRoutes.posts, { params });
      return response.data.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetBlogs;
