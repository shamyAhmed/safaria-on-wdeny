import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastError } from "@/utils/toastError";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { USER_ADDRESSES_KEY } from "./useGetUserAddresses";
import toast from "react-hot-toast";

const useDeleteAddress = (id: number | string, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance.delete<ApiResponse<unknown>>(apiRoutes.addressBookById(id)),
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: USER_ADDRESSES_KEY });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      toastError(error);
    },
  });
};

export default useDeleteAddress;
