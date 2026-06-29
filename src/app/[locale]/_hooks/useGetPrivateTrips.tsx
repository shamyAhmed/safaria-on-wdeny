import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { PrivateTrip } from "../_types/PrivateTrip";

export type PrivateTripsFilters = {
  from_lat?: string | number;
  from_lng?: string | number;
  to_lat?: string | number;
  to_lng?: string | number;
  rounded?: boolean;
};

const useGetPrivateTrips = (filters: PrivateTripsFilters) => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  const enabled =
    filters.from_lat != null &&
    filters.from_lng != null &&
    filters.to_lat != null &&
    filters.to_lng != null;

  return useQuery({
    queryKey: [apiRoutes.privateSearch, filters, currency],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("from_latitude", String(filters.from_lat));
      params.set("from_longitude", String(filters.from_lng));
      params.set("to_latitude", String(filters.to_lat));
      params.set("to_longitude", String(filters.to_lng));
      params.set("rounded", filters.rounded ? "true" : "false");
      params.set("currency", currency);

      const response = await axiosInstance.get<ApiResponse<PrivateTrip[]>>(
        `${apiRoutes.privateSearch}?${params.toString()}`,
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetPrivateTrips;
