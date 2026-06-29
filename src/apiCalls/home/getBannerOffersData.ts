import axiosInstance from "@/lib/axios";

export const getBannerOffersData = async () => {
  try {
    const response = await axiosInstance.get("/sliders/active");

    return response.data;
  } catch (error) {
    return { data: [], total: 0 };
  }
};
