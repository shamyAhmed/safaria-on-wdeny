import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "../_types/Api";
import { BusOrder, CreateTicketPayload } from "../_types/BusOrder";
import { toastError } from "@/utils/toastError";

// POST /buses/trips/:id/create-ticket
//
// NOTE: The new Wdeny bus API has no round-trip / return-ticket endpoint, and
// the create-ticket response does NOT include a payment URL — `payment_data`
// only carries `{ status: "pending" }`. There is no separate pay-order endpoint
// for buses in the collection either. Until the payment redirect flow is
// clarified by the backend, we redirect only if the gateway happens to surface
// a URL, otherwise we confirm the booking and route to the success page.
const useCreateTicket = (tripId: string | number) => {
  const router = useRouter();
  const t = useTranslations("discoverBus.booking");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  return useMutation({
    mutationFn: async (payload: CreateTicketPayload) => {
      const response = await axiosInstance.post<ApiResponse<BusOrder>>(
        apiRoutes.busCreateTicket(tripId),
        { ...payload, currency },
      );
      return response.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (response) => {
      const order = response.data;

      // Defensive: redirect if any gateway redirect URL is present.
      const redirectUrl =
        order?.payment_url ||
        order?.payment_data?.url ||
        order?.payment_data?.redirect_url ||
        order?.payment_data?.invoice_url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      // TODO(payment): No payment URL is returned by create-ticket. Wire the
      // real payment redirect once the backend exposes a bus pay endpoint.
      toast.success(response.message || t("bookingCreated"));
      router.push("/success-payment");
    },
  });
};

export default useCreateTicket;
