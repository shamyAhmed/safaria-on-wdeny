"use client";
import { useEffect, useState } from "react";
import { Button, Divider, Popover } from "antd";
import { FaChevronDown, FaPlane, FaSuitcase } from "react-icons/fa6";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import Image from "next/image";
import { TbPointFilled } from "react-icons/tb";
import { FlightDetailsModal } from "../modals/FlightDetailsModal";
import { useLocale, useTranslations } from "next-intl";
import { FlightJourney, LocalAirplane } from "@/app/[locale]/_types/FlightOffer";
import useConfirmOffer from "@/app/[locale]/_hooks/useConfirmOffer";
import useGetOfferBundles from "@/app/[locale]/_hooks/useGetOfferBundles";
import { CurrencyLabel } from "../CurrencyLabel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { setConfirmedFlight, ChosenBundle } from "@/store/slices/flight/flightSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import type { FlightLegInfo, FlightStop } from "@/app/[locale]/_types/FlightOffer";


interface AirplaneCardProps {
  flight: LocalAirplane
}
type FlightInfoProps = {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  flightClass: string;
  stops: FlightStop[];
  flightInfo: FlightLegInfo;
  isReturn?: boolean;
};

const CABIN_CLASS_KEY: Record<string, string> = {
  CABIN_CLASS_ECONOMY: "economy",
  CABIN_CLASS_PREMIUM_ECONOMY: "premiumEconomy",
  CABIN_CLASS_BUSINESS: "business",
  CABIN_CLASS_FIRST: "first",
};

const formatDuration = (durationMinutes: number) => {
  const h = Math.floor(durationMinutes / 60);
  const m = durationMinutes % 60;
  return {h, m}
};

export const FlightInfo = ({
  airline,
  airlineLogo,
  flightNumber,
  flightClass,
  stops,
  flightInfo,
  isReturn = false,
}: FlightInfoProps) => {
  const hasStop = stops.length > 0;
  const locale = useLocale();
  const t = useTranslations("airplaneCard");
  const tTimeline = useTranslations("flightModal.timeline");
  const classLabel = t(`classOptions.${CABIN_CLASS_KEY[flightClass] ?? "economy"}` as any);

  return (
    <div>
      <div className="flex items-center pt-[14px] justify-between mb-4">
        <span className="text-primary font-bold text-base flex items-center gap-2">
          {isReturn ? t("return") : t("departure")}
          <span className="text-primary font-normal">
            {t("on")} {flightInfo.date}
          </span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-4">
          <div className="flex gap-8">
            <div className="rounded-lg">
              <div className="relative shrink-0 size-[60px] bg-white rounded-sm flex items-center justify-center text-[8px] text-secondary">
                <Image
                  src={airlineLogo}
                  alt={airline}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-right sm:max-w-[80px] text-xs font-normal">
              <p className=" text-sm text-wrap">{airline}</p>
              <p className="text-xs text-gray-400">
                {flightNumber} . {classLabel}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex relative md:max-lg:min-h-[78px] md:max-lg:items-start">
          <div className="text-center min-w-[80px] md:max-lg:absolute md:max-lg:top-0 md:max-lg:start-0 md:max-lg:z-10">
            <p className="text-xl font-bold">{flightInfo.departureTime}</p>
            <p className="text-sm text-gray-500">{flightInfo.departureCity}</p>
          </div>
          <div className="flex-1 px-4 relative flex flex-col items-center justify-center md:max-lg:absolute md:max-lg:inset-x-0 md:max-lg:bottom-0 md:max-lg:px-0">
            <p className="text-xs text-gray-400 mb-1">
              {hasStop ? stops.map((s) => s.code).join(" - ") : ""}
            </p>

            <div className="w-full h-[1px] bg-gray-200 relative">
              <div
                className={`absolute top-1/2 -translate-y-[46%] start-0 ${locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"} `}>
                <TbPointFilled
                  className="text-primary text-lg"
                  size={20}
                />
              </div>
              {hasStop && (
                <Popover
                  trigger="hover"
                  placement="bottom"
                  overlayClassName="flight-stop-popover"
                  content={
                    <div className="rounded-[16px] bg-primary text-white text-center px-4 py-2 leading-tight flex flex-col gap-2">
                      {stops.map((stop) => (
                        <div key={stop.code}>
                          <p className="text-xs font-semibold">
                            {tTimeline("durationFormat", formatDuration(stop.durationMinutes))}
                          </p>
                          <p className="text-base font-bold">{stop.code}</p>
                        </div>
                      ))}
                    </div>
                  }>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 border border-gray-300 h-[10px] rounded-lg min-w-8 sm:min-w-14 text-[10px] text-[#666]"></button>
                </Popover>
              )}
              <div
                className={`absolute top-1/2 -translate-y-[46%] end-0 ${locale === "ar" ? "translate-x-0" : "-translate-x-1/2"} `}>
                <FaPlane className="text-primary text-xs rotate-180" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              <span className="hidden sm:inline">{t("totalTime")} : </span>{tTimeline("durationFormat", formatDuration(flightInfo.durationMinutes))}
            </p>
          </div>

          <div className="text-center min-w-[80px] md:max-lg:absolute md:max-lg:top-0 md:max-lg:end-0 md:max-lg:z-10">
            <p className="text-xl font-bold">{flightInfo.arrivalTime}</p>
            <p className="text-sm text-gray-500">{flightInfo.arrivalCity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AirplaneCard = ({ flight }: AirplaneCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [confirmedOfferId, setConfirmedOfferId] = useState("");
  const router = useRouter();
  const tCard = useTranslations("airplaneCard");
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  const confirmMutation = useConfirmOffer(flight.id);

  const bundleOfferId =
    confirmedOfferId && flight.haveBundles ? confirmedOfferId : "";
  const { data: bundles } = useGetOfferBundles(
    bundleOfferId,
    flight.haveBundles,
  );

  const offerShortId = flight.id.slice(0, 40);

  const handleReserve = () => {
    setExpanded((prev) => !prev);
    if (!confirmedOfferId)
      confirmMutation.mutate(undefined, {
        onSuccess: (data) => {
          const offerId = (data as any)?.offerId ?? flight.id;
          if (!flight.haveBundles) {
            dispatch(setConfirmedFlight({
              flight,
              confirmCode: offerId,
              chosenBundle: null,
            }));
            router.push(
              `/discover-airplan/booking?adt=${searchParams.get("adt")}&chd=${searchParams.get("chd")}&inf=${searchParams.get("inf")}`,
            );
          } else {
            setConfirmedOfferId(offerId);
          }
        },
      });
  };

  const handleSelectBundle = (bundle: any) => {
    const chosenBundle: ChosenBundle = {
      bundle_code: bundle.bundle_code,
      bundle_name: bundle.bundle_name,
      bundle_prices: bundle.bundle_prices,
      included_services: bundle.included_services,
      journeyId: bundles?.offer_journey_id ?? null,
    };
    dispatch(setConfirmedFlight({
      flight,
      confirmCode: confirmedOfferId,
      chosenBundle,
    }));
    router.push(
      `/discover-airplan/booking?adt=${searchParams.get("adt")}&chd=${searchParams.get("chd")}&inf=${searchParams.get("inf")}`,
    );
  };

  return (
    <div className="airplane-card w-full bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-6">
      <div className="flex flex-col min-[896px]:flex-row">
        {/* Main Content */}
        <div className="flex-1 px-5 py-4">
          {flight.legs.map((leg, idx) => (
            <FlightInfo
              key={idx}
              airline={flight.airline}
              airlineLogo={flight.airlineLogo}
              flightNumber={leg.flightNumber}
              flightClass={leg.class}
              stops={leg.stops}
              flightInfo={leg}
              isReturn={leg.isReturn}
            />
          ))}
        </div>

        {/* Pricing Actions */}
        <div
          className={`flex flex-col h-full ${flight.legs.length > 1 ? "min-h-[300px]" : "min-h-[200px]"}`}>
          <div className="w-full flex-1 min-[896px]:w-[220px] bg-primary flex flex-col items-center justify-center p-6 text-white text-center relative">
            <p className="text-lg font-bold mb-1">
              {flight.price} <CurrencyLabel currency={currency} color="white" />
            </p>
            <p className="text-[12px] opacity-80 mb-4 font-bold">
              {flight.refundability === "Refundable"
                ? tCard("refundable")
                : flight.refundability === "PartiallyRefundable"
                  ? tCard("partiallyRefundable")
                  : tCard("nonRefundable")}
            </p>
            <p className="text-[12px] mb-4">{flight.airline}</p>
            <Button
              onClick={handleReserve}
              loading={confirmMutation.isPending}
              className="w-full !border-none rounded-xl !bg-[#F47522] !text-white hover:!text-primary font-bold h-10 hover:!bg-gray-100">
              {tCard("selectFlight")}
            </Button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center font-bold text-center gap-1 text-md opacity-90 hover:opacity-100 transition-opacity bg-[#E9EDF0] w-full h-[40px]">
            {tCard("flightDetails")}
          </button>
        </div>
      </div>

      {Boolean(expanded && flight.haveBundles) && (
        <div className="bg-[#FBFAFA] p-8 border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="relative px-6 py-5">
            <button
              type="button"
              className={`bundle-prev-${offerShortId} absolute top-1/2 -translate-y-1/2 start-3 z-10 h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm`}>
              <FaChevronDown className="-rotate-90" />
            </button>
            <button
              type="button"
              className={`bundle-next-${offerShortId} absolute top-1/2 -translate-y-1/2 end-3 z-10 h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm`}>
              <FaChevronDown className="rotate-90" />
            </button>

            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={11}
              breakpoints={{
                992: {
                  slidesPerView: 2,
                },
              }}
              navigation={{
                prevEl: `.bundle-prev-${offerShortId}`,
                nextEl: `.bundle-next-${offerShortId}`,
              }}
              className="!px-8 max-w-full">
              {(bundles?.bundles || []).map((bundle) => (
                <SwiperSlide key={bundle.bundle_code}>
                  <div className="bg-[#F9F9FA] rounded-[22px] overflow-hidden border border-[#CFCFD3] h-full max-w-[260px] mx-auto">
                    <div className="bg-[#EFE5E7] px-5 py-4 text-start border-b border-dashed border-[#CFCFD3]">
                      <h5 className="font-bold text-[22px] leading-none mb-1">
                        {bundle.bundle_name}
                      </h5>
                      <p className="text-[13px] text-[#666]">
                        {bundle.bundle_code}
                      </p>
                    </div>

                    <div className="px-5 py-4">
                      <div className="flex items-center justify-start mb-3 text-start">
                        <div className="font-normal flex items-center gap-2 text-base text-[#4B5563]">
                          {flight.legs[0].departureCity} - {flight.legs[0].arrivalCity}
                        </div>
                      </div>

                      <Divider
                        dashed
                        className="!my-3 !border-gray-300"
                      />

                      <div className="flex flex-col gap-4 text-start items-start">
                        {bundle.included_services.map((service) => (
                          <p className="text-xs text-[#7C7C80] leading-relaxed text-start flex items-start gap-2">
                            <IoCheckmarkCircle className="text-green-600 text-base shrink-0 mt-0.5" />
                            {service}
                          </p>
                        ))}
                      </div>

                      <Divider
                        dashed
                        className="!my-4 !border-gray-300"
                      />

                      <div className="flex flex-col items-center gap-3 pb-1">
                        <p className="text-[30px] font-semibold text-[#101010] leading-none">
                          {bundle.bundle_prices.total_amount}
                          <CurrencyLabel currency={currency} className="text-sm font-medium text-[#6B7280] ms-2" />
                        </p>
                        <Button
                          type="primary"
                          onClick={() => handleSelectBundle(bundle)}
                          className="!h-11 !px-10 !rounded-full !font-bold !text-base !bg-primary !text-white !border !border-primary hover:!bg-white hover:!text-primary">
                          {tCard("bookNow")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Flight Details Modal */}
      <FlightDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
      />
    </div>
  );
};
