import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { BusSeatsPayload } from "../_types/BusSeats";

export type SeatsFilters = {
    from_city_id?:    string | number;
    to_city_id?:      string | number;
    from_location_id?: string | number;
    to_location_id?:  string | number;
    date?:            string;
};

const useGetSeats = (id: string | number, filters: SeatsFilters) => {
    return useQuery({
        queryKey: [apiRoutes.busSeats(id), filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters.from_city_id)    params.set("from_city_id",    String(filters.from_city_id));
            if (filters.to_city_id)      params.set("to_city_id",      String(filters.to_city_id));
            if (filters.from_location_id) params.set("from_location_id", String(filters.from_location_id));
            if (filters.to_location_id)  params.set("to_location_id",  String(filters.to_location_id));
            if (filters.date)            params.set("date",             filters.date);

            const response = await axiosInstance.get<ApiResponse<BusSeatsPayload>>(
                `${apiRoutes.busSeats(id)}?${params.toString()}`,
            );
            return response.data.data;
        },
        enabled: !!id && !!(
            filters.from_city_id &&
            filters.to_city_id &&
            filters.from_location_id &&
            filters.to_location_id &&
            filters.date
        ),
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};

export default useGetSeats;
