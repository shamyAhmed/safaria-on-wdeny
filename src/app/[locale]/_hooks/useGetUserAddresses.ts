import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";

export type UserAddress = {
  id: number;
  name: string;
  notes: string;
  map_location: {
    lat: string;
    lng: string;
    address_name: string;
  };
};

export const USER_ADDRESSES_KEY = ["userAddresses"] as const;

const useGetUserAddresses = () => {
  return useQuery({
    queryKey: USER_ADDRESSES_KEY,
    queryFn: async () => {
      const res = await axiosInstance.get<ApiResponse<UserAddress[]>>(
        apiRoutes.addressBook,
      );
      return res.data.data;
    },
  });
};

export default useGetUserAddresses;
