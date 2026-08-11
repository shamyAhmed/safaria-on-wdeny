import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/app/[locale]/_types/Api";

export type AddBalanceArgs = {
  amount: number;
  /** Currency code the top-up is charged in, e.g. `EGP`. */
  currency: string;
};

const addBalanceAPI = async ({
  amount,
  currency,
}: AddBalanceArgs): Promise<ApiResponse<{ link: string }>> => {
  const response = await axiosInstance.post(
    `/profile/wallet/${amount}/charge`,
    undefined,
    { params: { currency } },
  );
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
