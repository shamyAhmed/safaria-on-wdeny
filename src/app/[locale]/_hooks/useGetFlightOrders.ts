import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { FlightOrder } from "../_types/FlightOrder";

const useGetFlightOrders = () => {
  return useQuery({
    queryKey: ["flightOrders"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<FlightOrder[]>>(
        apiRoutes.flightOrders,
      );
      return response.data.data;
    },
  });
};

export default useGetFlightOrders;
