import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/appStore";
import { clearFlight, clearSearchState } from "@/store/slices/flight/flightSlice";
import { ApiResponse } from "../_types/Api";
import { HoldResponse } from "../_types/FlightOffer";
import { SubmitPassengersPayload } from "@/components/discoverAirplan/booking/types";
import toast from "react-hot-toast";
import { toastError } from "@/utils/toastError";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import usePayOrder, { type PaymentMethod } from "./usePayOrder";

type AddPassengerResult = { offerId: string };

type PendingTripBody = {
  currency: string;
  selectedBundles?: {
    journeyKey: string;
    selectedBundleCode: string;
  }[];
};

const useAddPassenger = (
  offerId: string,
  paymentMethod: PaymentMethod = "card",
) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const tPay = useTranslations("checkoutPayment");
  const chosenBundle = useSelector((state: RootState) => state.flight.chosenBundle);
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  const payMutation = usePayOrder("flights");
  const { mutate: payOrder } = payMutation;

  const submitMutation = useMutation({
    mutationFn: async (payload: SubmitPassengersPayload) => {
      // Step 1 — submit passengers
      const passengersRes = await axiosInstance.post<
        ApiResponse<AddPassengerResult>
      >(apiRoutes.submitPassengers(offerId), payload, { params: { currency } });
      const { offerId: returnedOfferId } = passengersRes.data.data;

      // Step 2 — pending trip
      const pendingBody: PendingTripBody = {
        currency,
        ...(chosenBundle && {
          selectedBundles: [
            {
              journeyKey: chosenBundle.journeyId ?? "",
              selectedBundleCode: chosenBundle.bundle_code,
            },
          ],
        }),
      };

      const holdRes = await axiosInstance.post<ApiResponse<HoldResponse>>(
        apiRoutes.pendingTrip(returnedOfferId),
        pendingBody,
      );

      return holdRes.data.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (data) => {
      //* Redux store will be emptied once the user navigates away from the page anyways.
      // Clear all flight & search state from Redux
      // dispatch(clearFlight());
      // dispatch(clearSearchState());

      // Wallet: the hold already produced an order, so charge it against the
      // balance instead of sending the browser to the gateway invoice.
      if (paymentMethod === "wallet" && data?.id) {
        payOrder(
          { orderId: data.id },
          {
            onSuccess: () => {
              toast.success(tPay("walletPaid"));
              router.push("/success-payment");
            },
          },
        );
        return;
      }

      toast.success(tPay("redirectingToGateway"));

      // Navigate to the payment invoice URL returned by the hold endpoint
      window.location.href = data.transaction.invoice_url;
    },
  });

  // Passengers → hold → wallet charge is one action to the user, so the submit
  // button stays busy across all of it.
  return {
    ...submitMutation,
    isPending: submitMutation.isPending || payMutation.isPending,
  };
};

export default useAddPassenger;
