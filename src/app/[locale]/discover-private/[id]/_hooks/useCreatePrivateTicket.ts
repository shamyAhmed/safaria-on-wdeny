import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "@/lib/axios";
import apiRoutes from "@/lib/apiRoutes";
import { RootState } from "@/store/appStore";
import { ApiResponse } from "@/app/[locale]/_types/Api";
import { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";
import { toastError } from "@/utils/toastError";

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

const useCreatePrivateTicket = () => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  return useMutation({
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
      const url = order?.transaction?.invoice_url;
      if (url) window.location.href = url;
    },
  });
};

export default useCreatePrivateTicket;
