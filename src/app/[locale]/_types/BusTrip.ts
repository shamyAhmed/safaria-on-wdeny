export type BusTripCity = {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    price: number;
};

export type BusTripStation = {
    id: string;
    name: string;
    city_id: number;
    city_name: string;
    arrival_at: string;
    latitude: string;
    longitude: string;
    price: number;
    original_price: number;
    final_price: number;
    categories: unknown[];
};

export type BusTripBus = {
    id: number;
    code: string;
    category: string;
    salon: string;
    type: string;
    seats_count: number;
};

export type BusTripCompanyData = {
    id: number;
    name: string;
    avatar: string;
    bus_image: string;
    pin: string;
};

export type BusTripPrices = {
    original_price: number;
    final_price: number;
    offer_price: number | string;
};

export type BusTrip = {
    id: number;
    gateway_id: string;
    company: string;
    company_data: BusTripCompanyData;
    category: string;
    date: string;
    time: string;
    date_time: string;
    bus: BusTripBus;
    cities_from: BusTripCity[];
    cities_to: BusTripCity[];
    stations_from: BusTripStation[];
    stations_to: BusTripStation[];
    pricing: unknown[];
    price_start_with: number;
    prices_start_with: BusTripPrices;
    available_seats: number;
    original_price: number;
    foreigner_price: number;
};
