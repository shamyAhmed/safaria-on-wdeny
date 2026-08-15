import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import usePollForNewResults from "@/hooks/usePollForNewResults";
import { PaginatedApiResponse } from "../_types/Api";
import { BusTrip } from "../_types/BusTrip";

export type BusTripsFilters = {
  city_from?: number | string;
  city_to?: number | string;
  date?: string;
  currency?: string;
};

const useGetBusTrips = (filters: BusTripsFilters) => {
  const refetchInterval = usePollForNewResults({
    selectItems: (data: InfiniteData<PaginatedApiResponse<BusTrip[]>>) =>
      data.pages.flatMap((page) => page.data),
    getId: (trip) => trip.id,
    resetKey: JSON.stringify(filters),
    // A full page means the rest is already sitting on the server and belongs
    // to pagination; only a short page says the results are still filling up.
    shouldPoll: (data) => {
      const lastPage = data.pages.at(-1);
      return !lastPage || lastPage.data.length < lastPage.pagination.perPage;
    },
  });

  return useInfiniteQuery({
    queryKey: [apiRoutes.busTrips, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      if (filters.city_from) params.set("city_from", String(filters.city_from));
      if (filters.city_to) params.set("city_to", String(filters.city_to));
      if (filters.date) params.set("date", filters.date);
      if (filters.currency) params.set("currency", filters.currency);
      params.set("page", String(pageParam));

      const response = await axiosInstance.get<PaginatedApiResponse<BusTrip[]>>(
        `${apiRoutes.busTrips}?${params.toString()}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, lastPage: totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!(filters.city_from && filters.city_to && filters.date),
    refetchOnMount: "always",
    refetchInterval,
  });
};

export default useGetBusTrips;
