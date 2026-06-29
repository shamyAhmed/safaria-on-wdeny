"use client";
import { Col, Drawer, Row } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { AirplaneForm } from "../homePage/forms/AirplaneForm";
import { AirplaneCard } from "./cards/AirplaneCard";
import { AirplaneCardSkeleton } from "./cards/AirplaneCardSkeleton";
import { GiSettingsKnobs } from "react-icons/gi";
import { AirplaneFiltersSection } from "./sections/AirplaneFiltersSection";
import { ResultsHeader } from "./sections/results-header";
import style from "../discover/styles/discover.module.scss";
import "./styles/airplane-discover.scss";
import { useSearchParams } from "next/navigation";
import useSearchFlights from "@/app/[locale]/_hooks/useSearchFlights";
import useFilters from "@/app/[locale]/_hooks/useFilters";
import {
  CabinClass,
  SearchFlightPayload,
  TripType,
} from "@/app/[locale]/_types/SearchFlight";
import {
  FlightJourney,
  FlightJourneyLeg,
  FlightOffer,
} from "@/app/[locale]/_types/FlightOffer";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MdOutlineAirplanemodeInactive } from "react-icons/md";

// ─── helpers ────────────────────────────────────────────────────────────────

const getJourneyStops = (
  journey: FlightJourney,
): { code: string; durationMinutes: number }[] => {
  return journey.segment.slice(0, -1).map((seg, i) => {
    const nextSeg = journey.segment[i + 1];
    const layoverMinutes = dayjs(nextSeg.departureDateTime).diff(
      dayjs(seg.arrivalDateTime),
      "minute",
    );
    return { code: seg.destination, durationMinutes: layoverMinutes };
  });
};

const mapJourneyToLeg = (
  journey: FlightJourney,
  isReturn: boolean,
  cabinClass: CabinClass,
): FlightJourneyLeg => {
  const first = journey.segment[0];
  const last = journey.segment[journey.segment.length - 1];
  const totalMinutes = dayjs(last.arrivalDateTime).diff(
    dayjs(first.departureDateTime),
    "minute",
  );
  return {
    departureTime: dayjs(first.departureDateTime).format("HH:mm"),
    departureCity: journey.origin,
    arrivalTime: dayjs(last.arrivalDateTime).format("HH:mm"),
    arrivalCity: journey.destination,
    durationMinutes: totalMinutes,
    date: dayjs(first.departureDateTime).format("DD MMMM YYYY"),
    flightNumber: `${first.marketingCarrierCode}${first.marketingFlightNumber}`,
    class: cabinClass,
    stops: getJourneyStops(journey),
    isReturn,
  };
};

const mapOfferToFlight = (offer: FlightOffer, tripType: TripType, cabinClass: CabinClass) => {
  const outbound = offer.journeys[0];
  const legs = offer.journeys.map((journey, idx) =>
    mapJourneyToLeg(journey, tripType === "round_trip" && idx === 1, cabinClass),
  );
  const totalDurationMinutes = offer.journeys.reduce(
    (total, journey) =>
      total +
      journey.segment.reduce((sum, seg) => sum + seg.flightTimeInMinutes, 0),
    0,
  );

  return {
    id: offer.offerId,
    haveBundles: offer.haveBundles,
    airline:
      outbound.segment[0].operatingCarrierName ??
      outbound.segment[0].operatingCarrierCode,
    airlineLogo:
      outbound.segment[0].operatingCarrierLogo ??
      `https://pics.avs.io/200/200/${outbound.segment[0].operatingCarrierCode}.png`,
    price: offer.totalAmount,
    currency: offer.currency,
    isRefundable: offer.refundability === "Refundable",
    refundability: offer.refundability,
    legs,
    journeys: offer.journeys,
    totalDurationMinutes,
    firstDepartureDateTime: outbound.segment[0].departureDateTime,
    baseAmount: offer.baseAmount,
    taxesAmount: offer.taxesAmount,
    discountAmount: offer.discountAmount,
    serviceChargeAmount: offer.serviceChargeAmount,
    beforeDiscountAmount: offer.beforeDiscountAmount,
    priceClasses: offer.priceClasses,
  };
};

interface FlightExtremes {
  cheapestPrice: number | null;
  mostExpensivePrice: number | null;
  shortestDuration: number | null;
  longestDuration: number | null;
  earliestDeparture: string | null;
  latestDeparture: string | null;
}

export interface CarrierOption {
  code: string;
  name: string;
}

const INITIAL_EXTREMES: FlightExtremes = {
  cheapestPrice: null,
  mostExpensivePrice: null,
  shortestDuration: null,
  longestDuration: null,
  earliestDeparture: null,
  latestDeparture: null,
};

export const DiscoverAirplanComponent = () => {
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const t = useTranslations("discoverAirplan");
  const searchParams = useSearchParams();
  const {
    filters,
    deferredFilters,
    onChange: onFilterChange,
    reset: resetFilters,
  } = useFilters();

  const origin = searchParams.get("from_0") ?? "";
  const destination = searchParams.get("to_0") ?? "";
  const date = searchParams.get("date_0") ?? "";
  const returnDate = searchParams.get("returnDate_0");
  const tripType = (searchParams.get("tripType") ?? "one_way") as TripType;
  const cabinClass = (searchParams.get("class") ??
    "CABIN_CLASS_ECONOMY") as CabinClass;
  const adt = Number(searchParams.get("adt") ?? 1);
  const chd = Number(searchParams.get("chd") ?? 0);
  const inf = Number(searchParams.get("inf") ?? 0);

  const passengers = [
    { passengerTypeCode: "ADT" as const, count: adt },
    { passengerTypeCode: "CHD" as const, count: chd },
    { passengerTypeCode: "INF" as const, count: inf },
  ].filter((p) => p.count > 0);

  const sharedPayload = {
    passengers,
    sortingCriteria: deferredFilters.sort,
    cabinClass: deferredFilters.cabinClass ?? cabinClass,
    directFlightsOnly: deferredFilters.directFlightsOnly,
    ...(deferredFilters.refundableOnly ? { refundability: "Refundable" as const } : {}),
  };

  const payload: SearchFlightPayload | null = (() => {
    if (tripType === "multi_city") {
      const segments = [];
      let i = 0;
      while (searchParams.get(`from_${i}`) && searchParams.get(`to_${i}`)) {
        segments.push({
          origin: searchParams.get(`from_${i}`)!,
          destination: searchParams.get(`to_${i}`)!,
          date: searchParams.get(`date_${i}`) ?? "",
        });
        i++;
      }
      if (segments.length < 2) return null;
      return { ...sharedPayload, segments, trip_type: "multi_city" as const };
    }
    if (!origin || !destination || !date) return null;
    if (tripType === "round_trip") {
      if (!returnDate) return null;
      return {
        ...sharedPayload,
        origin,
        destination,
        date,
        return_date: returnDate,
        trip_type: "round_trip" as const,
      };
    }
    return {
      ...sharedPayload,
      origin,
      destination,
      date,
      trip_type: "one_way" as const,
    };
  })();

  const { data, isLoading } = useSearchFlights(payload);

  const flights = (data ?? [])
    .map((offer) => mapOfferToFlight(offer, tripType, cabinClass))
    .filter((flight) => flight.haveBundles === false);

  const visibleFlights = useMemo(() => {
    const { from, to } = deferredFilters.priceRange;
    const { selectedCarriers } = deferredFilters;
    return flights.filter((flight) => {
      if (from !== null && flight.price < from) return false;
      if (to !== null && flight.price > to) return false;
      if (selectedCarriers.length > 0) {
        const flightCodes = new Set(
          flight.journeys.flatMap((j) =>
            j.segment.map((s) => s.operatingCarrierCode),
          ),
        );
        if (!selectedCarriers.some((code) => flightCodes.has(code))) return false;
      }
      return true;
    });
  }, [flights, deferredFilters.priceRange, deferredFilters.selectedCarriers]);

  const [cachedExtremes, setCachedExtremes] =
    useState<FlightExtremes>(INITIAL_EXTREMES);
  const [cachedCarriers, setCachedCarriers] = useState<CarrierOption[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const result = flights.reduce(
      (acc, flight) => ({
        cheapestPrice: Math.min(acc.cheapestPrice, flight.price),
        mostExpensivePrice: Math.max(acc.mostExpensivePrice, flight.price),
        shortestDuration: Math.min(
          acc.shortestDuration,
          flight.totalDurationMinutes,
        ),
        longestDuration: Math.max(
          acc.longestDuration,
          flight.totalDurationMinutes,
        ),
        earliestDeparture:
          flight.firstDepartureDateTime < acc.earliestDeparture
            ? flight.firstDepartureDateTime
            : acc.earliestDeparture,
        latestDeparture:
          flight.firstDepartureDateTime > acc.latestDeparture
            ? flight.firstDepartureDateTime
            : acc.latestDeparture,
      }),
      {
        cheapestPrice: Infinity,
        mostExpensivePrice: -Infinity,
        shortestDuration: Infinity,
        longestDuration: -Infinity,
        earliestDeparture: "9999",
        latestDeparture: "",
      },
    );

    setCachedExtremes({
      cheapestPrice: isFinite(result.cheapestPrice)
        ? result.cheapestPrice
        : null,
      mostExpensivePrice: isFinite(result.mostExpensivePrice)
        ? result.mostExpensivePrice
        : null,
      shortestDuration: isFinite(result.shortestDuration)
        ? result.shortestDuration
        : null,
      longestDuration: isFinite(result.longestDuration)
        ? result.longestDuration
        : null,
      earliestDeparture:
        result.earliestDeparture !== "9999" ? result.earliestDeparture : null,
      latestDeparture:
        result.latestDeparture !== "" ? result.latestDeparture : null,
    });

    // Build deduplicated carrier list from all segments across all flights
    const carrierMap = new Map<string, string>();
    flights.forEach((flight) => {
      flight.journeys.forEach((journey) => {
        journey.segment.forEach((seg) => {
          if (!carrierMap.has(seg.operatingCarrierCode)) {
            carrierMap.set(
              seg.operatingCarrierCode,
              seg.operatingCarrierName ?? seg.operatingCarrierCode,
            );
          }
        });
      });
    });
    setCachedCarriers(
      Array.from(carrierMap.entries())
        .map(([code, name]) => ({ code, name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
  }, [data]);

  return (
    <div className={style.discover}>
      <PageBannerSection
        title={t("pageTitle")}
        currentLink="/discover-airplan"
        currentPage={t("pageTitle")}
      />
      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <AirplaneForm readonly />
        </div>
        <Row gutter={[24, 24]}>
          <Col
            xs={24}
            xl={6}
            className="max-xl:!hidden">
            <div className="rounded-[20px] bg-white py-8 px-6 flex items-center justify-between mb-4">
              <h4 className="flex items-center gap-2 font-bold text-lg text-[#333]">
                <GiSettingsKnobs
                  size={24}
                  className="text-[#B6B6B6] rotate-90"
                />
                <p>{t("filters.title")}</p>
              </h4>
              <button className="text-primary">{t("filters.reset")}</button>
            </div>
            <div className="rounded-[20px] bg-white py-8 px-6 mb-6">
              <AirplaneFiltersSection
                onPriceRangeChange={(from, to) =>
                  onFilterChange("priceRange", { from, to })
                }
                minPrice={cachedExtremes.cheapestPrice ?? undefined}
                maxPrice={cachedExtremes.mostExpensivePrice ?? undefined}
                directFlightsOnly={filters.directFlightsOnly}
                refundableOnly={filters.refundableOnly}
                onDirectFlightsOnlyChange={(v) => onFilterChange("directFlightsOnly", v)}
                onRefundableOnlyChange={(v) => onFilterChange("refundableOnly", v)}
                carriers={cachedCarriers}
                selectedCarriers={filters.selectedCarriers}
                onCarriersChange={(codes) => onFilterChange("selectedCarriers", codes)}
              />
            </div>
          </Col>
          <Col
            className="max-xl:!basis-full max-xl:!max-w-full"
            xs={24}
            xl={18}>
            <div className="flex py-8 flex-col gap-6">
              <button
                type="button"
                onClick={() => setIsFiltersDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                {t("filters.filterButton")}
              </button>

              <ResultsHeader
                onSortChange={(sort) => onFilterChange("sort", sort)}
                currentSort={filters.sort}
                cheapestPrice={cachedExtremes.cheapestPrice}
                mostExpensivePrice={cachedExtremes.mostExpensivePrice}
                shortestDuration={cachedExtremes.shortestDuration}
                longestDuration={cachedExtremes.longestDuration}
                earliestDeparture={cachedExtremes.earliestDeparture}
                latestDeparture={cachedExtremes.latestDeparture}
              />
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <AirplaneCardSkeleton key={i} />
                ))
              ) : visibleFlights.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
                    <MdOutlineAirplanemodeInactive size={44} />
                  </div>
                  <h3 className="text-xl font-bold text-[#111113]">
                    {t("emptyState.title")}
                  </h3>
                  <p className="text-[#B0B0B3] max-w-sm text-sm leading-relaxed">
                    {t("emptyState.description")}
                  </p>
                  <Link
                    href="/"
                    className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                    {t("emptyState.backToHome")}
                  </Link>
                </div>
              ) : (
                visibleFlights.map((flight) => (
                  <AirplaneCard
                    key={flight.id}
                    flight={flight}
                  />
                ))
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Drawer
        title={t("filters.title")}
        placement="right"
        width={360}
        open={isFiltersDrawerOpen}
        onClose={() => setIsFiltersDrawerOpen(false)}
        className="xl:!hidden"
        rootClassName="xl:!hidden">
        <div className="rounded-[20px] bg-white">
          <AirplaneFiltersSection
            onPriceRangeChange={(from, to) =>
              onFilterChange("priceRange", { from, to })
            }
            minPrice={cachedExtremes.cheapestPrice ?? undefined}
            maxPrice={cachedExtremes.mostExpensivePrice ?? undefined}
            directFlightsOnly={filters.directFlightsOnly}
            refundableOnly={filters.refundableOnly}
            onDirectFlightsOnlyChange={(v) => onFilterChange("directFlightsOnly", v)}
            onRefundableOnlyChange={(v) => onFilterChange("refundableOnly", v)}
            carriers={cachedCarriers}
            selectedCarriers={filters.selectedCarriers}
            onCarriersChange={(codes) => onFilterChange("selectedCarriers", codes)}
          />
        </div>
      </Drawer>
    </div>
  );
};
