import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { FlightOrder } from "../_types/FlightOrder";

const useGetFlightOrder = (id: number | string) => {
  return useQuery({
    queryKey: ["flightOrder", id],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<FlightOrder>>(
        apiRoutes.flightOrderById(id),
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};

export default useGetFlightOrder;
