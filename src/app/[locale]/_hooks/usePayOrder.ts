import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios";
import apiRoutes, { type OrderCycle } from "@/lib/apiRoutes";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { toastError } from "@/utils/toastError";

export type PaymentMethod = "card" | "wallet";

/**
 * Settles an already-created order through `POST /{cycle}/orders/:id/pay`.
 *
 * The Postman collection documents the route for all three cycles but carries
 * no body for it (the saved bodies are leftovers from create-ticket), so the
 * method flag is sent explicitly and lives here alone — if the backend names it
 * differently, this is the only place to change.
 */
const usePayOrder = (cycle: OrderCycle) => {
  const queryClient = useQueryClient();
  const currency = useSelector(
    (state: RootState) => state.currency.selected?.code ?? "",
  );

  return useMutation({
    mutationFn: async ({
      orderId,
      method = "wallet",
    }: {
      orderId: number | string;
      method?: PaymentMethod;
    }) => {
      const response = await axiosInstance.post<ApiResponse<unknown>>(
        apiRoutes.payOrder(cycle, orderId),
        { payment_method: method, currency },
      );
      return response.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: () => {
      // A wallet payment moves money, so the cached balance is now stale.
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};

export default usePayOrder;
