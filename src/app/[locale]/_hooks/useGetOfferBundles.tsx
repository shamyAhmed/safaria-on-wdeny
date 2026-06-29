import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { FlightBundles } from "../_types/SearchFlight";

const useGetOfferBundles = (offerId: string, haveBundles?: boolean) => {
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

    return useQuery({
        enabled: !!(offerId && haveBundles),
        queryKey: [apiRoutes.offerBundles(offerId), currency],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse<FlightBundles[]>>(
                apiRoutes.offerBundles(offerId),
                { params: { currency } },
            );
            return response.data.data?.[0];
        },
    });
};

export default useGetOfferBundles;
