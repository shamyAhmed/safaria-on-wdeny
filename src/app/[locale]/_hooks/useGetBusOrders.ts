import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { BusOrder } from "../_types/BusOrder";

const useGetBusOrders = () => {
  return useQuery({
    queryKey: ["busOrders"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<BusOrder[]>>(
        apiRoutes.busOrders,
      );
      return response.data.data;
    },
  });
};

export default useGetBusOrders;
