import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/app/[locale]/_types/Api";

const addBalanceAPI = async (amount: number): Promise<ApiResponse<{ link: string }>> => {
  const response = await axiosInstance.post(`/profile/wallet/${amount}/charge`);
  return response.data;
};

export const useAddBalance = () => {
  const { mutateAsync: addBalanceMutation, isPending: addBalanceLoading } =
    useMutation({
      mutationFn: addBalanceAPI,
      onSuccess: ({ data }) => {
        if (data?.link) {
          window.open(data.link, "_blank");
        }
      },
    });

  return { addBalanceMutation, addBalanceLoading };
};
