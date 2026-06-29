import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { SearchFlightPayload } from "../_types/SearchFlight";
import { FlightOffer } from "../_types/FlightOffer";

const useSearchFlights = (payload: SearchFlightPayload | null) => {
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

    return useQuery({
        enabled: !!payload,
        queryKey: [apiRoutes.searchFlight, payload, currency],
        queryFn: async () => {
            const response = await axiosInstance.post<ApiResponse<FlightOffer[]>>(
                apiRoutes.searchFlight,
                payload,
                { params: { currency } },
            );
            return response.data.data;
        },
    });
};

export default useSearchFlights;
