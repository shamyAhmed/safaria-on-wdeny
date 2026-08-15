import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import usePollForNewResults from "@/hooks/usePollForNewResults";
import { ApiResponse } from "../_types/Api";
import { SearchFlightPayload } from "../_types/SearchFlight";
import { FlightOffer } from "../_types/FlightOffer";

const useSearchFlights = (payload: SearchFlightPayload | null) => {
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

    const refetchInterval = usePollForNewResults({
        selectItems: (offers: FlightOffer[]) => offers,
        getId: (offer) => offer.offerId,
        resetKey: JSON.stringify([payload, currency]),
    });

    return useQuery({
        enabled: !!payload,
        refetchInterval,
        queryKey: [apiRoutes.searchFlight, payload, currency],
        queryFn: async () => {
            try {
                const response = await axiosInstance.post<ApiResponse<FlightOffer[]>>(
                    apiRoutes.searchFlight,
                    payload,
                    { params: { currency } },
                );
                return response.data.data;
            } catch (error) {
                // A combination with nothing to sell (say, first class on a route
                // that has none) comes back as a 400, not an empty list. That is
                // an empty result, not a failure worth retrying.
                if (isAxiosError(error) && error.response?.status === 400) {
                    return [] as FlightOffer[];
                }
                throw error;
            }
        },
    });
};

export default useSearchFlights;
