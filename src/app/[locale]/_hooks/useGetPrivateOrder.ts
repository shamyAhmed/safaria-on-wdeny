import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { PrivateOrder } from "../_types/PrivateOrder";

const useGetPrivateOrder = (id: number | string) => {
  return useQuery({
    queryKey: ["privateOrder", id],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<PrivateOrder>>(
        apiRoutes.privateOrderById(id),
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};

export default useGetPrivateOrder;
