import axiosInstance from "@/lib/axios";

interface PageReturnedData {
  updated_at: string;

  page: {
    data: string;
    image_urls: Record<string, string>;
  };
}

export const getPageData = async (page: string): Promise<PageReturnedData> => {
  try {
    const response = await axiosInstance.get<PageReturnedData>(
      `/pages/${page}`,
    );
    return response.data;
  } catch (error) {
    return error as PageReturnedData;
  }
};
