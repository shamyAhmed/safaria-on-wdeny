import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { PrivateOrder } from "../_types/PrivateOrder";

const useGetPrivateOrders = () => {
  return useQuery({
    queryKey: ["privateOrders"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<PrivateOrder[]>>(
        apiRoutes.privateOrders,
      );
      return response.data.data;
    },
  });
};

export default useGetPrivateOrders;
