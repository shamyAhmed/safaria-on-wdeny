import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { BusTrip } from "../_types/BusTrip";

export type BusTripByIdParams = {
  // The route context is REQUIRED for the by-id endpoint to populate
  // cities_from/cities_to/stations_from/stations_to — without it they come
  // back empty.
  city_from?: string | number;
  city_to?: string | number;
  date?: string;
  currency?: string;
};

// GET /buses/trips/:id — returns a single trip object (not an array).
const useGetBusTrip = (id: string | number, params: BusTripByIdParams = {}) => {
  const { city_from, city_to, date, currency } = params;

  return useQuery({
    queryKey: [apiRoutes.busTripById(id), city_from, city_to, date, currency],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<BusTrip>>(
        apiRoutes.busTripById(id),
        {
          params: {
            ...(city_from != null ? { city_from } : {}),
            ...(city_to != null ? { city_to } : {}),
            ...(date ? { date } : {}),
            ...(currency ? { currency } : {}),
          },
        },
      );
      return response.data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetBusTrip;
