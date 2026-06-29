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

type AddPassengerResult = { offerId: string };

type PendingTripBody = {
  currency: string;
  selectedBundles?: {
    journeyKey: string;
    selectedBundleCode: string;
  }[];
};

const useAddPassenger = (offerId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const chosenBundle = useSelector((state: RootState) => state.flight.chosenBundle);
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  return useMutation({
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

      toast.success("تم الحجز بنجاح! جارٍ تحويلك إلى صفحة الدفع...");

      // Navigate to the payment invoice URL returned by the hold endpoint
      window.location.href = data.transaction.invoice_url;
    },
  });
};

export default useAddPassenger;
