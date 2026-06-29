export type BusOrderStation = {
    id: number | string;
    name: string;
    latitude: string | number;
    longitude: string | number;
    price: number | string | null;
};

export type BusOrderPaymentData = {
    status: string;
    // The create-ticket response does NOT include a payment URL — only a status.
    // A redirect URL (if the gateway ever returns one) may appear here.
    url?: string;
    redirect_url?: string;
    invoice_url?: string;
    [key: string]: unknown;
};

export type BusOrder = {
    id: number;
    gateway_order_id: number;
    gateway_id: string;
    total: string;
    payment_data: BusOrderPaymentData;
    station_from: BusOrderStation;
    station_to: BusOrderStation;
    date: string;
    // Defensive: some gateways may surface a redirect URL at the top level.
    payment_url?: string;
};

export type CreateTicketPayload = {
    date: string;
    from_city_id: string | number;
    from_location_id: string | number;
    to_city_id: string | number;
    to_location_id: string | number;
    seats: { seat_type_id: string; seat_id: string }[];
};
