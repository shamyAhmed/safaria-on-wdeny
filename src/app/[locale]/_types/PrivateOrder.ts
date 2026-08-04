import { PrivateTrip } from "./PrivateTrip";

export type PrivateOrderPoint = {
  latitude: number;
  longitude: number;
};

export type PrivateOrderTransaction = {
  id: number;
  gateway: string;
  status: string;
  paid_at: string | null;
  /** The gateway's hosted invoice page — the one to send the browser to. */
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
  currency: string;
  rounded: boolean;
  departure_date: string;
  return_date: string | null;
  currency_id: number;
  base_currency_id: number;
  exchange_rate: string;
  /** The coordinates the customer picked, not the trip's canonical cities. */
  from: PrivateOrderPoint;
  to: PrivateOrderPoint;
  trip: PrivateTrip;
  transaction: PrivateOrderTransaction | null;
  can_be_cancel: boolean;
  created_at: string;
};
