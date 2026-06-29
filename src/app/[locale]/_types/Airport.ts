export type Airport = {
  // shared fields (both endpoints)
  iata_code: string;
  name: string;
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  // old endpoint only
  id?: number;
  icao_code?: string;
  // new endpoint only
  is_domestic?: boolean;
  is_all_airport?: boolean;
  ranking?: number;
};
