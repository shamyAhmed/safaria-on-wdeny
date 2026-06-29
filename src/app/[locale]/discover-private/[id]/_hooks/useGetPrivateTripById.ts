import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";

const useGetPrivateTripById = (id: string | number) => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  return useQuery({
    queryKey: [apiRoutes.privateTripById(id), id, currency],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<PrivateTrip>>(
        apiRoutes.privateTripById(id),
        { params: { currency } },
      );
      return response.data.data;
    },
    enabled: !!id,
  });
};

export default useGetPrivateTripById;
