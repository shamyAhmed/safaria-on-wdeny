export type BusOrderStation = {
    id: number | string;
    name: string;
    latitude: string | number;
    longitude: string | number;
    price: number | string | null;
};

export type BusOrderPaymentData = {
    status: string;
    /** The gateway's hosted invoice page — the one to send the browser to. */
    invoice_url?: string;
    url?: string;
    redirect_url?: string;
    [key: string]: unknown;
};

export type BusOrder = {
    id: number;
    gateway_order_id: number;
    gateway_id: string;
    /**
     * Only the parent leg's amount on a return booking — the gateway invoice
     * carries the real round-trip total. Not safe to display as the sum.
     */
    total: string;
    parent_order_id: number | null;
    payment_data: BusOrderPaymentData;
    station_from: BusOrderStation;
    station_to: BusOrderStation;
    date: string;
    /** POST-only API route; never redirect the browser here. */
    payment_url?: string;
};

export type CreateTicketPayload = {
    date: string;
    from_city_id: string | number;
    from_location_id: string | number;
    to_city_id: string | number;
    to_location_id: string | number;
    seats: { seat_type_id: string; seat_id: string }[];
    /** Links a return booking to its outbound order. Injected by useCreateTicket. */
    parent_order_id?: number;
};
