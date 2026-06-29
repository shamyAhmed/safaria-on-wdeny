import axiosInstance from "@/lib/axios";

export const getAllCategoriesData = async () => {
  try {
    const response = await axiosInstance.get("/categories");

    return response.data; // includes .data, .total, etc.
  } catch (error) {
    return { data: [], total: 0 };
  }
};
