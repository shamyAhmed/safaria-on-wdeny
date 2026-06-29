import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";
import { Country } from "../_types/Country";

const useGetCountries = () => {
    return useQuery({
        queryKey: [apiRoutes.countries],
        queryFn: async () => {
            const response = await axiosInstance.get<ApiResponse<Country[]>>(apiRoutes.countries);
            return response.data.data;
        },
        staleTime: Infinity,
        refetchOnMount: false,
    });
};

export default useGetCountries;
