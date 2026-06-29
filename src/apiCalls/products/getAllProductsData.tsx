"use server";
import axiosInstance from "@/lib/axios";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
}

export const getAllProductsData = async (params?: GetProductsParams) => {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  if (params?.minPrice)
    queryParams.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice)
    queryParams.append("maxPrice", params.maxPrice.toString());
  if (params?.minRating)
    queryParams.append("minRating", params.minRating.toString());

  // Only include category if it exists and is not "all"
  if (params?.categoryId && params.categoryId !== "all") {
    queryParams.append("categoryId", params.categoryId);
  }

  // Only include sortBy if it exists
  if (params?.sortBy && params.sortBy !== "null") {
    queryParams.append("sortBy", params.sortBy);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/products?${queryString}` : "/products";

  const response = await axiosInstance.get(url);
  return response.data;
};

interface InsightReturnedData {
  data: {};
}

export const getSingleProductData = async (
  id: number | string
): Promise<InsightReturnedData> => {
  try {
    const response = await axiosInstance.get<InsightReturnedData>(
      `/products/${id}`
    );
    return response.data;
  } catch (error) {
    return { data: [] };
  }
};
export const getRelatedProductsData = async (params: {
  categoryId: string;
  limit?: number;
}) => {
  return axiosInstance.get("/products", {
    params: {
      categoryId: params.categoryId,
      per_page: params.limit ?? 4,
    },
  });
};

export const getLimitedProductsData = async (params: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  categoryId?: string;
}) => {
  return axiosInstance.get("/products", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 6,
      sortBy: params.sortBy ?? "createdAt",
      sortOrder: params.sortOrder ?? "desc",
      categoryId: params.categoryId,
    },
  });
};
