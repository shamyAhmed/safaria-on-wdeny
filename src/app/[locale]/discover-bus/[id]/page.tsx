"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import useGetSeats from "@/app/[locale]/_hooks/useGetSeats";
import useGetBusTrip from "@/app/[locale]/_hooks/useGetBusTrip";
import useCreateTicket from "@/app/[locale]/_hooks/useCreateTicket";
import { useGetUserProfile } from "@/hooks/auth/useGetProfile";
import SeatMap from "./_components/SeatMap";
import BusRouteMap from "./_components/BusRouteMap";
import { BussForm } from "@/components/homePage/forms/BussForm";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { Button, Checkbox } from "antd";
import { Link } from "@/i18n/navigation";
import { PiBusBold } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";
import useFormatDate from "@/hooks/useFormatDate";
import type { BusTrip, BusTripStation } from "@/app/[locale]/_types/BusTrip";

const formatTime = (datetime: string | undefined) => {
  if (!datetime) return "—";
  return datetime.split(" ")[1]?.slice(0, 5) ?? "—";
};

// ── Booking Summary Panel ─────────────────────────────────────────────────────

const BookingSummaryPanel = ({
  trip,
  fromStation,
  toStation,
  fromCityId,
  toCityId,
  date,
  seatCount,
  selectedSeats,
}: {
  trip: BusTrip;
  fromStation: BusTripStation | undefined;
  toStation: BusTripStation | undefined;
  fromCityId: string | number;
  toCityId: string | number;
  date: string;
  seatCount: number;
  selectedSeats: string[];
}) => {
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const { isAuthenticated } = useGetUserProfile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("discoverBus.booking");
  const formatDate = useFormatDate();

  const [agreed, setAgreed] = useState(false);

  const { mutate: createTicket, isPending } = useCreateTicket(trip.id);

  const fromCityName = trip.cities_from[0]?.name ?? fromStation?.city_name ?? "—";
  const toCityName   = trip.cities_to[0]?.name   ?? toStation?.city_name   ?? "—";

  // "{city} {station}" queries used by the route map to geocode each endpoint.
  const originQuery = fromStation ? `${fromCityName} ${fromStation.name}` : "";
  const destinationQuery = toStation ? `${toCityName} ${toStation.name}` : "";

  const seatPrice = trip.price_start_with;
  const total = seatPrice * seatCount;

  const handleConfirm = () => {
    if (!fromStation || !toStation) return;
    createTicket({
      date,
      from_city_id: fromCityId,
      from_location_id: fromStation.id,
      to_city_id: toCityId,
      to_location_id: toStation.id,
      seats: selectedSeats.map((id) => ({ seat_type_id: id, seat_id: id })),
    });
  };

  const query = searchParams.toString();
  const fullPath = query ? `${pathname}?${query}` : pathname;
  const loginHref = {
    pathname: "/auth/login" as const,
    query: { redirect: fullPath },
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Route map — geocodes both stations and draws the route between them */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <p className="text-base font-bold text-gray-900 px-4 pt-4 pb-2">
          {t("mapTitle")}
        </p>
        {originQuery && destinationQuery ? (
          <BusRouteMap origin={originQuery} destination={destinationQuery} />
        ) : (
          <div className="relative w-full h-[180px] bg-gray-50" />
        )}
      </div>

      {/* Company + Route */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4">
        {/* Company */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
            {trip.company_data.avatar ? (
              <Image
                src={trip.company_data.avatar}
                alt={trip.company}
                width={40}
                height={40}
                className="object-contain p-1"
              />
            ) : (
              <PiBusBold
                size={20}
                className="text-primary"
              />
            )}
          </div>
          <div>
            <p className="font-bold text-gray-900 text-base">
              {trip.company}
            </p>
            <p className="text-xs text-gray-400">{trip.category}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center w-full gap-3">
          {/* From city */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-0.5 leading-none">
                {t("from")}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {fromCityName}
              </span>
            </div>
            {fromStation?.name && (
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-1 self-start">
                {fromStation.name}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <IoCalendarOutline size={11} />
              <span>
                {formatDate.medium(date)} — {formatTime(fromStation?.arrival_at)}
              </span>
            </div>
          </div>

          {/* Connector line */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <PiBusBold
              className="text-primary"
              size={20}
            />
            <div className="flex items-center w-full">
              <div className="w-2 h-2 rounded-full shrink-0 border-2 border-gray-300 bg-white" />
              <div className="flex-1 h-px bg-gray-200" />
              <div className="w-2 h-2 rounded-full shrink-0 bg-primary border-2 border-primary/20" />
            </div>
          </div>

          {/* To city */}
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-white bg-gray-400 rounded-full px-2 py-0.5 leading-none">
                {t("to")}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {toCityName}
              </span>
            </div>
            {toStation?.name && (
              <span className="text-[10px] text-white bg-primary rounded-full px-2 py-1 self-end">
                {toStation.name}
              </span>
            )}
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span>
                {formatTime(toStation?.arrival_at)} — {formatDate.medium(date)}
              </span>
              <IoCalendarOutline size={11} />
            </div>
          </div>
        </div>
      </div>

      {/* Passengers count */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-between">
        <p className="text-base font-bold text-gray-900">{t("passengersCount")}</p>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
          {seatCount}
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{t("seatPrice")}</span>
          <span className="text-gray-500 text-sm font-medium">
            {seatPrice} <CurrencyLabel currency={currency} />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{t("seatsCount")}</span>
          <span className="text-gray-500 text-sm font-medium">{seatCount}</span>
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">{t("total")}</span>
          <span className="text-primary text-lg font-bold">{total} <CurrencyLabel currency={currency} /></span>
        </div>
      </div>

      {/* Terms + Confirm */}
      <div className="bg-white rounded-2xl shadow-sm px-4 py-4 space-y-4">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                {t("agreeTo")}{" "}
                <span className="text-primary cursor-pointer underline">
                  {t("termsAndConditions")}
                </span>
              </span>
            </div>
            <Button
              type="primary"
              block
              loading={isPending}
              disabled={!agreed || seatCount === 0 || !fromStation || !toStation}
              onClick={handleConfirm}
              className="!rounded-xl !h-12 !text-base !font-bold">
              {t("confirmSeats", { count: seatCount })}
            </Button>
          </>
        ) : (
          <Link href={loginHref}>
            <Button
              block
              className="!rounded-xl !h-12 !text-base !font-bold !bg-orange-500 !text-white !border-orange-500 hover:!bg-orange-400">
              {t("loginToContinue")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

const DiscoverBusSeatPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const t = useTranslations("discoverBus.booking");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  // Defaults flow in via URL params (set by the bus card on the list page).
  const urlFromCityId = searchParams.get("from_city_id") ?? undefined;
  const urlToCityId = searchParams.get("to_city_id") ?? undefined;
  const urlFromLocationId = searchParams.get("from_location_id") ?? undefined;
  const urlToLocationId = searchParams.get("to_location_id") ?? undefined;
  const urlDate = searchParams.get("date") ?? undefined;

  // The by-id endpoint needs the route context to populate its
  // cities/stations — pass the same city/date the search used.
  const cityFromParam = searchParams.get("city_from") ?? urlFromCityId;
  const cityToParam = searchParams.get("city_to") ?? urlToCityId;

  const { data: trip, isLoading } = useGetBusTrip(id, {
    city_from: cityFromParam ?? undefined,
    city_to: cityToParam ?? undefined,
    date: urlDate,
    currency,
  });

  // User-selectable station choice — defaults to the URL params.
  const [fromLocationId, setFromLocationId] = useState<string | undefined>(urlFromLocationId);
  const [toLocationId, setToLocationId] = useState<string | undefined>(urlToLocationId);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Once the trip loads, make sure a valid station is selected on each side.
  useEffect(() => {
    if (!trip) return;
    setFromLocationId((prev) => {
      if (prev && trip.stations_from.some((s) => s.id === prev)) return prev;
      return trip.stations_from[0]?.id;
    });
    setToLocationId((prev) => {
      if (prev && trip.stations_to.some((s) => s.id === prev)) return prev;
      return trip.stations_to[0]?.id;
    });
  }, [trip]);

  const fromCityId = urlFromCityId ?? trip?.cities_from[0]?.id ?? "";
  const toCityId = urlToCityId ?? trip?.cities_to[0]?.id ?? "";
  const date = urlDate ?? trip?.date ?? "";

  const fromStation = useMemo(
    () => trip?.stations_from.find((s) => s.id === fromLocationId),
    [trip, fromLocationId],
  );
  const toStation = useMemo(
    () => trip?.stations_to.find((s) => s.id === toLocationId),
    [trip, toLocationId],
  );

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  const { data: seatsData } = useGetSeats(id, {
    from_city_id: fromCityId,
    to_city_id: toCityId,
    from_location_id: fromLocationId,
    to_location_id: toLocationId,
    date,
  });

  if (isLoading || !trip) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px] bg-white rounded-2xl shadow-sm text-gray-300 text-sm">
          {t("loadingTrip")}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl px-6 py-4 shadow-sm gap-3">
        <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600">{t("legendYourSeat")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-600">{t("legendAvailable")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-600">{t("legendBooked")}</span>
          </div>
        </div>
      </div>

      {/* Trip search summary — the bus form rendered read-only */}
      <div className="cardS1 bg-white px-6 py-6 rounded-2xl shadow-sm">
        <BussForm readonly />
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left — seat map */}
        <div className="flex-1 bg-white w-full rounded-2xl shadow-sm p-0 sm:p-6 min-h-[400px]">
          {seatsData ? (
            <SeatMap
              data={seatsData}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 text-sm">
              {t("loadingSeats")}
            </div>
          )}
        </div>

        {/* Right — booking summary */}
        <div className="flex-1 w-full">
          <BookingSummaryPanel
            trip={trip}
            fromStation={fromStation}
            toStation={toStation}
            fromCityId={fromCityId}
            toCityId={toCityId}
            date={date}
            seatCount={selectedSeats.length}
            selectedSeats={selectedSeats}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverBusSeatPage;
