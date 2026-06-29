export type PrivateTripCompany = {
  id: number;
  name: string;
  refundability: boolean;
  refund_policy: string;
  logo_url: string;
  logo_mime_type: string;
};

export type PrivateTripPlace = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
};

export type PrivateTripVehicle = {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  seats_number: number;
  model: string;
  year: number;
  big_bags_count: number;
  small_bags_count: number;
  gear_type: string;
  featured_url: string;
  featured_mime_type: string;
};

export type PrivateTrip = {
  id: number;
  rounded: boolean;
  go_price: string;
  round_price: string;
  status: boolean;
  currency_id: number;
  base_currency_id: number;
  exchange_rate: string;
  company: PrivateTripCompany;
  from_location: PrivateTripPlace;
  to_location: PrivateTripPlace;
  vehicle: PrivateTripVehicle;
};
