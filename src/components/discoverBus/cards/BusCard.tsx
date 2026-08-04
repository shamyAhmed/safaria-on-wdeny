"use client";

import { memo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { FaChevronLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { PiBusBold } from "react-icons/pi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { BusTrip, BusTripStation } from "@/app/[locale]/_types/BusTrip";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";
import useFormatDate from "@/hooks/useFormatDate";

// ─── Station Picker ───────────────────────────────────────────────────────────

interface StationPickerProps {
  label: string;
  stations: BusTripStation[];
  selected: string;
  onSelect: (id: string) => void;
}

const StationPicker = ({ label, stations, selected, onSelect }: StationPickerProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3 bg-white rounded-2xl p-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MdOutlineLocationOn className="text-primary shrink-0" size={14} />
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
            <FaChevronLeft size={11} className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <FaChevronLeft size={11} className="rotate-180 rtl:rotate-0" />
          </button>
        </div>
      </div>

      {/* Station pills */}
      <div className="overflow-hidden w-full">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          slidesPerView={4}
          spaceBetween={8}
          dir="rtl"
          className="w-full">
          {stations.map((station) => (
            <SwiperSlide key={station.id} className="!h-auto">
              <button
                type="button"
                onClick={() => onSelect(station.id)}
                className={`w-full py-2 px-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap truncate ${
                  selected === station.id
                    ? "bg-primary/10 text-primary border-primary"
                    : "bg-white text-gray-400 border-gray-200"
                }`}>
                {station.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Selected station arrival time */}
      {(() => {
        const sel = stations.find((s) => s.id === selected);
        if (!sel) return null;
        const time = sel.arrival_at.split(" ")[1]?.slice(0, 5) ?? "";
        return (
          <p className="text-[11px] text-gray-400 flex items-center gap-1">
            <IoTimeOutline size={12} />
            {time}
          </p>
        );
      })()}
    </div>
  );
};

// ─── Bus Card ─────────────────────────────────────────────────────────────────

const BusCardComponent = ({ trip }: { trip: BusTrip }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("discoverBus.card");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const date = useFormatDate();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [fromStation, setFromStation] = useState<string>(
    trip.stations_from[0]?.id ?? ""
  );
  const [toStation, setToStation] = useState<string>(
    trip.stations_to[0]?.id ?? ""
  );

  const id = String(trip.id).slice(0, 16);

  const busImages = trip.company_data.bus_image
    ? [trip.company_data.bus_image, trip.company_data.bus_image]
    : [];

  const syncNav = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const fromCity = trip.cities_from[0]?.name ?? "—";
  const toCity   = trip.cities_to[0]?.name   ?? "—";

  // ── Derive times from selected stations ──────────────────────────────────────
  const selectedFromStation = trip.stations_from.find((s) => s.id === fromStation);
  const selectedToStation   = trip.stations_to.find((s) => s.id === toStation);

  const formatTime = (datetime: string | undefined) => {
    if (!datetime) return "—";
    return datetime.split(" ")[1]?.slice(0, 5) ?? "—";
  };

  const formatDate = (datetime: string | undefined) => {
    if (!datetime) return "—";
    // "2026-08-20 05:45 am" — only the date half parses reliably.
    return date.medium(datetime.split(" ")[0], { withYear: false });
  };

  const departureTime = formatTime(selectedFromStation?.arrival_at);
  const departureDate = formatDate(selectedFromStation?.arrival_at);
  const arrivalTime   = formatTime(selectedToStation?.arrival_at);
  const arrivalDate   = formatDate(selectedToStation?.arrival_at);

  // ── Duration ─────────────────────────────────────────────────────────────────
  const duration = (() => {
    if (!selectedFromStation?.arrival_at || !selectedToStation?.arrival_at) return "—";
    const from = new Date(selectedFromStation.arrival_at).getTime();
    const to   = new Date(selectedToStation.arrival_at).getTime();
    const diffMs  = Math.abs(to - from);
    const hours   = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return t("duration", { hours, minutes });
  })();

  return (
    <div className="w-full bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-[18px] py-[28px] space-y-4">

      {/* ── Top Row ── */}
      <div className="flex flex-col md:flex-row gap-5">

        {/* 1 ── Bus image swiper ───────────────────────────────────────────── */}
        <div className="relative shrink-0 w-full md:w-[180px] h-[180px] sm:h-[300px] md:h-[140px] rounded-lg overflow-hidden bg-[#F7F7F7]">
          {busImages.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: `.bus-next-${id}`,
                  prevEl: `.bus-prev-${id}`,
                }}
                pagination={{
                  el: `.bus-dots-${id}`,
                  clickable: false,
                  bulletClass: "swiper-pagination-bullet !w-1 !h-1 !bg-white",
                  bulletActiveClass: "swiper-pagination-bullet-active !w-3 !rounded-md",
                }}
                loop={false}
                onSwiper={(s) => { syncNav(s); }}
                onSlideChange={syncNav}
                className="w-full h-full">
                {busImages.map((img, i) => (
                  <SwiperSlide key={i} className="relative h-[180px] sm:h-[300px] md:h-[140px]">
                    <Image src={img} alt={`${trip.company} ${i + 1}`} fill className="object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={`bus-dots-${id} absolute !left-1/2 !bottom-2 -translate-x-1/2 z-10 flex items-center justify-center gap-1.5`} />

              <button
                type="button"
                className={`bus-next-${id} absolute end-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowLeft className="text-gray-600 text-sm ltr:rotate-180" />
              </button>

              <button
                type="button"
                className={`bus-prev-${id} absolute start-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowRight size={12} className="text-gray-600 ltr:rotate-180" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <PiBusBold size={56} />
            </div>
          )}
        </div>

        {/* 2 ── Company info + Timeline ───────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-between min-w-0">

          {/* Company: avatar + name */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative w-[50px] h-[50px] shrink-0 rounded-full overflow-hidden border border-gray-100 bg-[#F7F7F7]">
              {trip.company_data.avatar ? (
                <Image src={trip.company_data.avatar} alt={trip.company} fill className="object-contain p-1" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <PiBusBold size={24} className="text-gray-300" />
                </div>
              )}
            </div>
            <p className="font-medium text-xl text-gray-900">{trip.company}</p>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="text-center shrink-0">
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <MdOutlineLocationOn className="text-primary" size={14} />
                <span className="font-semibold text-gray-800">{fromCity}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 leading-none">{departureTime}</p>
              <p className="text-[10px] text-gray-400 mt-1">{departureDate}</p>
            </div>

            {/* Bus icon + line + duration */}
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <PiBusBold className="text-primary" size={28} />
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full shrink-0 bg-white border-2 border-gray-300" />
                <div className="flex-1 h-px bg-gray-200" />
                <div className="w-2 h-2 rounded-full shrink-0 bg-primary border-2 border-primary/20" />
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 bg-white rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
                <IoTimeOutline size={13} />
                <span>{duration}</span>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-center shrink-0">
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <MdOutlineLocationOn className="text-primary" size={14} />
                <span className="font-semibold text-gray-800">{toCity}</span>
              </div>
              <p className="text-sm font-medium text-gray-900 leading-none">{arrivalTime}</p>
              <p className="text-[10px] text-gray-400 mt-1">{arrivalDate}</p>
            </div>
          </div>
        </div>

        {/* 3 ── Price ─────────────────────────────────────────────────────── */}
        <div className="flex sm:flex-col gap-3 shrink-0 sm:justify-center border-t sm:border-t-0 sm:border-s border-gray-100 sm:ps-4">
          <div className="border border-gray-200 rounded-xl px-4 py-3 min-w-[130px] bg-white">
            <p className="text-sm font-bold mb-1 text-gray-700">{trip.category}</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-gray-900 leading-none">{trip.price_start_with}</p>
              <p className="text-[11px] text-gray-400">
                <CurrencyLabel currency={currency} size={11} color="#9ca3af" /> {t("perSeat")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Station Pickers ── */}
      {(trip.stations_from.length > 0 || trip.stations_to.length > 0) && (
        <div className="py-2 flex flex-col md:flex-row gap-4">
          {trip.stations_from.length > 0 && (
            <StationPicker
              label={t("fromLabel", { city: fromCity })}
              stations={trip.stations_from}
              selected={fromStation}
              onSelect={setFromStation}
            />
          )}
          {trip.stations_from.length > 0 && trip.stations_to.length > 0 && (
            <div className="hidden sm:block w-px bg-gray-100 self-stretch" />
          )}
          {trip.stations_to.length > 0 && (
            <StationPicker
              label={t("toLabel", { city: toCity })}
              stations={trip.stations_to}
              selected={toStation}
              onSelect={setToStation}
            />
          )}
        </div>
      )}

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-end gap-4">
        <Button
          type="primary"
          className="!py-2 !px-5 !h-auto !rounded-xl !text-sm !font-bold flex items-center gap-2"
          onClick={() => {
            const fromCityId = trip.cities_from[0]?.id ?? "";
            const toCityId   = trip.cities_to[0]?.id   ?? "";

            // Trip details are no longer stored in Redux — the booking page
            // re-fetches the trip by id and reads the selected stations/date
            // from these URL params.
            const query = new URLSearchParams(searchParams.toString());
            query.set("from_city_id",     String(fromCityId));
            query.set("to_city_id",       String(toCityId));
            query.set("from_location_id", fromStation);
            query.set("to_location_id",   toStation);
            router.push(`/discover-bus/${trip.id}?${query.toString()}`);
          }}>
          {t("selectSeat")}
          <FaChevronLeft size={11} className="ltr:rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export const BusCard = memo(BusCardComponent);
