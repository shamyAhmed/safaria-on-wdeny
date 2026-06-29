import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { ConfirmResponse } from "../_types/FlightOffer";
import { toastError } from "@/utils/toastError";

const useConfirmOffer = (offerId: string) => {
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post<ApiResponse<ConfirmResponse>>(
                apiRoutes.confirmOffer(offerId),
                undefined,
                { params: { currency } },
            );
            return response.data.data;
        },
        onError: (error: unknown) => {
            toastError(error);
        },
    });
};

export default useConfirmOffer;
