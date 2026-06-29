import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { Airport } from "../_types/Airport";
import { ApiResponse } from "../_types/Api";

const USE_OLD_AIRPORTS = process.env.NEXT_PUBLIC_AIRPORT_SEARCH === "old";

const useGetAirports = (query?: string, typingLocale?: string) => {
    const locale = useLocale();
    const lang = typingLocale ?? locale;

    return useQuery({
        enabled: !!query,
        queryKey: USE_OLD_AIRPORTS
            ? [apiRoutes.airports, lang, query]
            : [apiRoutes.airportsSearch, lang, query],
        queryFn: async () => {
            const headers = { "Accept-Language": lang };

            if (USE_OLD_AIRPORTS) {
                const response = await axiosInstance.get<ApiResponse<Airport[]>>(
                    apiRoutes.airports,
                    { params: { search: query }, headers },
                );
                return response.data.data;
            }

            const response = await axiosInstance.get<ApiResponse<Airport[]>>(
                apiRoutes.airportsSearch,
                { params: { term: query }, headers },
            );
            return response.data.data;
        },
    });
};

export default useGetAirports;
