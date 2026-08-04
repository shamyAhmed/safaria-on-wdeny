export type BusOrderStation = {
    id: number | string;
    station_id?: number | string;
    name: string;
    city_id?: number;
    city_name?: string;
    latitude: string | number;
    longitude: string | number;
    /** Local departure/arrival stamp for this leg, e.g. "2026-08-20 05:45 am". */
    arrival_at?: string;
    price?: number | string | null;
};

export type BusOrderPaymentData = {
    status: string;
    status_code?: string;
    invoice_id?: number;
    gateway?: string;
    /** The gateway's hosted invoice page — the one to send the browser to. */
    invoice_url?: string;
    url?: string;
    redirect_url?: string;
    [key: string]: unknown;
};

export type BusOrderCompany = {
    name: string;
    avatar: string;
    bus_image: string;
    pin: string;
};

export type BusOrderTicket = {
    id: number;
    seat_number: string;
    price: string;
};

export type BusOrder = {
    id: number;
    /** Human-facing reference, e.g. "000002488". Absent on the create response. */
    number?: string;
    trip_id?: string;
    gateway_order_id: number | string;
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

    // ── Present on /profile/buses/orders only ────────────────────────────────
    company_data?: BusOrderCompany;
    company_name?: string;
    /** Localised label, e.g. "Pending". Pair with `status_code` for logic. */
    status?: string;
    status_code?: string;
    category?: string;
    can_be_cancel?: boolean;
    trip_type?: string;
    is_confirmed?: number;
    review?: unknown;
    can_review?: boolean;
    /** Downloadable receipt — not the gateway page. */
    invoice_url?: string;
    tickets?: BusOrderTicket[];
    /** Departure stamp with the time, e.g. "2026-08-20 12:01 AM". */
    date_time?: string;
    cancel_url?: string;
    /** Money fields arrive pre-formatted with the currency, e.g. "EGP 280.00". */
    original_tickets_totals?: string;
    discount?: string;
    wallet_discount?: string;
    tickets_totals_after_discount?: string;
    payment_fees?: string;
    currency?: string;
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
