export type FlightOrderCustomer = {
  id: number;
  name: string;
  email: string;
  mobile: string;
};

export type FlightOrderPassenger = {
  id: number;
  passenger_type_code: string;
  title: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  birth_date: string;
  gender: string;
  nationality_country_code: string;
  email: string;
  phone: string;
  ticket_number?: string;
};

export type FlightOrderSegment = {
  id: number;
  origin: string;
  destination: string;
  departure_datetime: string;
  arrival_datetime: string;
  departure_terminal: string | null;
  arrival_terminal: string | null;
  flight_time_in_minutes: number;
  equipment: string;
  operating_carrier_code: string;
  operating_flight_number: string;
  marketing_carrier_code: string;
  marketing_flight_number: string;
};

export type FlightOrderJourney = {
  id: number;
  journey_reference_id: string;
  origin: string;
  destination: string;
  number_of_stops: number;
  segment_reference_ids: string[];
  bundle_reference_ids: string[];
};

export type FlightPaymentTransaction = {
  id: number;
  gateway: string;
  status: string;
  paid_at: string | null;
  invoice_url: string;
  invoice_id: number;
};

export type FlightOrder = {
  id: number;
  provider: string;
  ndc_booking_reference: string;
  airline_pnr: string;
  gds_pnr: string;
  offer_id: string;
  status: string;
  order_status: string;
  refundability: string;
  total_amount: number;
  base_amount: number;
  taxes_amount: number;
  discount_amount: number;
  before_discount_amount: number;
  service_charge_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
  customer: FlightOrderCustomer;
  passengers: FlightOrderPassenger[];
  segments: FlightOrderSegment[];
  journeys: FlightOrderJourney[];
  included_bundles: unknown[];
  bundles_total: number;
  payment_status: string | null;
  payment_transactions: FlightPaymentTransaction[];
  invoice_url: string | null;
};
