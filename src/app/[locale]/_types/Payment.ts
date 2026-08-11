/**
 * How an order is settled, sent as `payment_method` on every booking endpoint.
 *
 * `credit` is the API's default and hands the browser to the gateway invoice.
 * `wallet` charges the balance as part of the booking call itself, so there is
 * no payment link to open — those bookings come back already paid.
 */
export type PaymentMethod = "credit" | "wallet";

export const DEFAULT_PAYMENT_METHOD: PaymentMethod = "credit";
