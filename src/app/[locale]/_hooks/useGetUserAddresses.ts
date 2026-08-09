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

/**
 * `enabled` lets guest-facing callers (the private-trip search form) skip the
 * request instead of firing a 401 the address book page would never see.
 */
const useGetUserAddresses = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: USER_ADDRESSES_KEY,
    enabled,
    queryFn: async () => {
      const res = await axiosInstance.get<ApiResponse<UserAddress[]>>(
        apiRoutes.addressBook,
      );
      return res.data.data;
    },
  });
};

export default useGetUserAddresses;
