import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";
import { toastError } from "@/utils/toastError";
import usePayOrder, { type PaymentMethod } from "@/app/[locale]/_hooks/usePayOrder";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export type CreatePrivateOrderPayload = {
  trip_id: number | string;
  rounded: boolean;
  departure: {
    latitude: string;
    longitude: string;
    date: string; // "YYYY-MM-DD"
  };
  destination: {
    latitude: string;
    longitude: string;
    date?: string; // "YYYY-MM-DD" — only included when rounded is true
  };
};

type PrivateOrderTransaction = {
  id: number;
  gateway: string;
  status: string;
  paid_at: string | null;
  invoice_url: string;
  meta_data: {
    trip_id: number;
    order_id: number;
    invoice_id: number;
  };
  created_at: string;
};

export type PrivateOrder = {
  id: number;
  status: string;
  price: string;
  rounded: boolean;
  departure_date: string;
  return_date: string | null;
  currency_id: number;
  base_currency_id: number;
  exchange_rate: string;
  from: { latitude: number; longitude: number };
  to: { latitude: number; longitude: number };
  trip: PrivateTrip;
  transaction: PrivateOrderTransaction;
  created_at: string;
};

const useCreatePrivateTicket = (paymentMethod: PaymentMethod = "card") => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const router = useRouter();
  const t = useTranslations("checkoutPayment");

  const payMutation = usePayOrder("private");
  const { mutate: payOrder } = payMutation;

  const createMutation = useMutation({
    mutationFn: async (payload: CreatePrivateOrderPayload) => {
      const response = await axiosInstance.post<ApiResponse<PrivateOrder>>(
        apiRoutes.privateCreateOrder,
        { ...payload, currency },
      );
      return response.data.data;
    },
    onError: (error: unknown) => {
      toastError(error);
    },
    onSuccess: (order) => {
      // Wallet: settle the freshly created order off the balance rather than
      // handing the browser over to the gateway.
      if (paymentMethod === "wallet" && order?.id) {
        payOrder(
          { orderId: order.id },
          {
            onSuccess: () => {
              toast.success(t("walletPaid"));
              router.push("/success-payment");
            },
          },
        );
        return;
      }

      const url = order?.transaction?.invoice_url;
      if (url) window.location.href = url;
    },
  });

  // Two calls, one action — keep the button busy until the wallet charge lands.
  return {
    ...createMutation,
    isPending: createMutation.isPending || payMutation.isPending,
  };
};

export default useCreatePrivateTicket;
