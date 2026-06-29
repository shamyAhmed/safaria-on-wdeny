import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { BusLocation } from "../_types/BusLocation";

const useGetBusLocations = (term?: string) => {
    return useQuery({
        queryKey: [apiRoutes.busLocations, term ?? ""],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse<BusLocation[]>>(
                apiRoutes.busLocations,
                { params: term ? { term } : undefined },
            );
            return response.data.data;
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};

export default useGetBusLocations;
