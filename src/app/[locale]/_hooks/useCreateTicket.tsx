import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { AppDispatch, RootState } from "@/store/appStore";
import { setBusParentOrderId } from "@/store/slices/bus/busSlice";
import { ApiResponse } from "../_types/Api";
import { BusOrder, CreateTicketPayload } from "../_types/BusOrder";
import { toastError } from "@/utils/toastError";

// POST /buses/trips/:id/create-ticket
//
// The bus API has no round-trip search, so a return trip is booked as two
// linked one-way orders: the outbound is created first, then the return is
// created with `parent_order_id` pointing at it, and only that second call
// settles the payment for both legs.
const useCreateTicket = (tripId: string | number) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const t = useTranslations("discoverBus.booking");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const { returnDate, parentOrderId } = useSelector((state: RootState) => state.bus);

  // The store is in-memory, so a reload mid-cycle would lose the link to the
  // outbound order. Both values also ride the URL, which BusCard copies onto
  // the booking page, and the store stays the primary source.
  const urlParentOrderId = Number(searchParams.get("parent_order_id")) || null;
  const urlReturnDate = searchParams.get("return_date");
  const activeParentOrderId = parentOrderId ?? urlParentOrderId;
  const activeReturnDate = returnDate ?? urlReturnDate;

  // The return leg retraces the outbound one, so its search swaps the cities.
  const cityFrom = searchParams.get("city_from") ?? searchParams.get("from_city_id");
  const cityTo = searchParams.get("city_to") ?? searchParams.get("to_city_id");

  const isOutboundOfRoundTrip = !!activeReturnDate && !activeParentOrderId;

  return useMutation({
    mutationFn: async (payload: CreateTicketPayload) => {
      const response = await axiosInstance.post<ApiResponse<BusOrder>>(
        apiRoutes.busCreateTicket(tripId),
        {
          ...payload,
          currency,
          ...(activeParentOrderId
            ? { parent_order_id: activeParentOrderId }
            : {}),
        },
      );
      return response.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (response) => {
      const order = response.data;

      // Outbound leg: hold the payment back and send the user to search the
      // return, carrying the order id forward as the parent link.
      if (isOutboundOfRoundTrip && order?.id) {
        dispatch(setBusParentOrderId(order.id));
        const query = new URLSearchParams();
        query.set("city_from", String(cityTo ?? ""));
        query.set("city_to", String(cityFrom ?? ""));
        query.set("date", String(activeReturnDate));
        query.set("trip_type", "one");
        query.set("parent_order_id", String(order.id));
        toast.success(t("outboundBooked"));
        router.push(`/discover-bus?${query.toString()}`);
        return;
      }

      // One-way, or the return leg that settles both: go and pay.
      //
      // `payment_data.invoice_url` is the gateway's own page and the only
      // browser-navigable one. The order's `payment_url` is a POST-only API
      // route (a GET returns 405) and the top-level `invoice_url` downloads a
      // receipt, so neither can be redirected to.
      const redirectUrl =
        order?.payment_data?.invoice_url ||
        order?.payment_data?.url ||
        order?.payment_data?.redirect_url;

      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      toast.success(response.message || t("bookingCreated"));
      router.push("/success-payment");
    },
  });
};

export default useCreateTicket;
