import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import axiosInstance from "@/lib/axios";
import apiRoutes, { type OrderCycle } from "@/lib/apiRoutes";
import { ApiResponse } from "../_types/Api";
import { toastError } from "@/utils/toastError";

/** The cache keys the order hooks use are singular: `busOrders`, not `busesOrders`. */
const QUERY_PREFIX: Record<OrderCycle, string> = {
  buses: "bus",
  flights: "flight",
  private: "private",
};

/**
 * `PUT /{cycle}/orders/:id/cancel` — the Postman collection lists it for all
 * three cycles with no body (the saved ones are create-ticket leftovers), so
 * the id in the path is the whole request.
 */
const useCancelOrder = (cycle: OrderCycle) => {
  const queryClient = useQueryClient();
  const t = useTranslations("profile.myTrips.card.cancel");

  return useMutation({
    mutationFn: async (orderId: number | string) => {
      const response = await axiosInstance.put<ApiResponse<unknown>>(
        apiRoutes.cancelOrder(cycle, orderId),
      );
      return response.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (response) => {
      toast.success(response.message || t("success"));
      // The order lists and any open detail view now hold a stale status.
      queryClient.invalidateQueries({
        queryKey: [`${QUERY_PREFIX[cycle]}Orders`],
      });
      queryClient.invalidateQueries({
        queryKey: [`${QUERY_PREFIX[cycle]}Order`],
      });
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });
};

export default useCancelOrder;
