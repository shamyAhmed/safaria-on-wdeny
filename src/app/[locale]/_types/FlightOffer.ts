import { PassengerTypeCode } from "./SearchFlight";

export type FlightSegment = {
  id: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  departureTerminal: string;
  arrivalTerminal: string;
  flightTimeInMinutes: number;
  operatingCarrierCode: string;
  operatingCarrierName: string | null;
  operatingCarrierLogo: string | null;
  operatingFlightNumber: string;
  marketingCarrierCode: string;
  marketingFlightNumber: string;
  equipment: string;
};

export type FlightJourney = {
  id: string;
  origin: string;
  destination: string;
  numberOfStops: number;
  segment: FlightSegment[];
};

export type FlightPriceClass = {
  classId: string;
  priceClassName: string;
  fareType: "PublicFare" | "PrivateFare" | string;
  rulesAndPenalties: string[] | null;
};

export type PriceDetails = {
  totalAmount: number;
  taxesAmount: number;
  baseAmount: number;
  discountAmount: number;
  beforeDiscountAmount: number;
  serviceChargeAmount: number;
};

interface ConfirmPassengers {
  numberOfPassengers: number;
  passengerTypeCode: PassengerTypeCode;
}

export interface FlightLegInfo {
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  durationMinutes: number;
  date: string;
  flightNumber: string;
  class: string;
}

export type FlightStop = { code: string; durationMinutes: number };

export type FlightJourneyLeg = {
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  durationMinutes: number;
  date: string;
  flightNumber: string;
  class: string;
  stops: FlightStop[];
  isReturn: boolean;
};

export interface LocalAirplane {
  id: string;
  airline: string;
  airlineLogo: string;
  price: number;
  currency: string;
  isRefundable: boolean;
  haveBundles: boolean;
  refundability: string;
  legs: FlightJourneyLeg[];
  journeys: FlightJourney[];
  totalDurationMinutes: number;
  firstDepartureDateTime: string;
  baseAmount: number;
  taxesAmount: number;
  discountAmount: number;
  serviceChargeAmount: number;
  beforeDiscountAmount: number;
}

export type ConfirmResponse = {
  segments: FlightSegment[];
  priceDetails: PriceDetails;
  offerId: string;
  journey_id: string;
  passengerFareBreakdown: ConfirmPassengers;
};

// ── Hold booking response ──────────────────────────────────────────────────────

type AmountWithCurrency = { amount: number; currency: string };

type TaxOrFee = {
  code: string;
  measure: string;
  amount: AmountWithCurrency;
};

type PassengerFareBreakdown = {
  passengerTypeCode: string;
  numberOfPassengers: number;
  passengerTotalAmount: AmountWithCurrency;
  passengerTaxesAmount: AmountWithCurrency;
  passengerBaseAmount: AmountWithCurrency;
  passengerDiscountAmount: AmountWithCurrency;
  passengerBeforeDiscountAmount: AmountWithCurrency;
  passengerServiceChargeAmount: AmountWithCurrency;
  taxesAndFees: TaxOrFee[];
  segmentDetails: {
    segmentReferenceId: string;
    priceClassReferenceId: string;
    baggageDetailsReferenceId: string;
    cabinCode: string;
    rbd: string;
  }[];
};

type HoldPriceDetails = {
  totalAmount: AmountWithCurrency;
  taxesAmount: AmountWithCurrency;
  baseAmount: AmountWithCurrency;
  discountAmount: AmountWithCurrency;
  serviceChargeAmount: AmountWithCurrency;
  beforeDiscountAmount: AmountWithCurrency;
  taxesAndFees: TaxOrFee[];
  refundability: string;
};

type HoldOrderData = {
  journeys: string[];
  passengerFareBreakdown: PassengerFareBreakdown[];
  priceDetails: HoldPriceDetails;
};

type HoldPassenger = {
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
};

type HoldSegment = {
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

type HoldJourney = {
  id: number;
  journey_reference_id: string;
  origin: string;
  destination: string;
  number_of_stops: number;
  segment_reference_ids: string[];
  bundle_reference_ids: string[];
};

type HoldTransaction = {
  id: number;
  gateway: string;
  status: string;
  paid_at: string | null;
  invoice_url: string;
  invoice_id: number;
};

export type HoldResponse = {
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
  order_data: HoldOrderData;
  passengers: HoldPassenger[];
  segments: HoldSegment[];
  journeys: HoldJourney[];
  transaction: HoldTransaction;
};

// ── Flight offer ───────────────────────────────────────────────────────────────

export type FlightOffer = PriceDetails & {
  offerId: string;
  haveBundles: boolean;
  canBeHeld: boolean;
  refundability:
    | "NotRefundable"
    | "Refundable"
    | "PartiallyRefundable"
    | string;
  journeys: FlightJourney[];
  currency: string;
  priceClasses: FlightPriceClass[];
};
