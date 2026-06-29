"use client";
import Image from "next/image";
import { FaPlane } from "react-icons/fa";
import dayjs from "dayjs";
import {
  FlightJourney,
  FlightSegment,
} from "@/app/[locale]/_types/FlightOffer";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const getLayoverMinutes = (seg: FlightSegment, nextSeg: FlightSegment) =>
  dayjs(nextSeg.departureDateTime).diff(dayjs(seg.arrivalDateTime), "minute");

const getJourneyDurationMinutes = (journey: FlightJourney) => {
  const first = journey.segment[0];
  const last = journey.segment[journey.segment.length - 1];
  return dayjs(last.arrivalDateTime).diff(
    dayjs(first.departureDateTime),
    "minute",
  );
};

const formatDuration = (totalMinutes: number) => {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return {
    h,
    m,
  };
};

export const FlightTimelineTab = ({ flight }: { flight: any }) => {
  const journeys: FlightJourney[] = flight?.journeys ?? [];
  const t = useTranslations("flightModal.timeline");

  return (
    <div className="flight-timeline">
      {journeys.map((journey, journeyIdx) => {
        const firstSeg = journey.segment[0];
        const routeTitle = `${journey.origin} ${t("to")} ${journey.destination}`;
        const dateLabel = dayjs(firstSeg.departureDateTime).format(
          "DD MMMM YYYY",
        );
        const totalDuration = useMemo(() => {
          return t(
            "durationFormat",
            formatDuration(getJourneyDurationMinutes(journey)),
          );
        }, [t]);

        return (
          <div
            key={journey.id}
            className={
              journeyIdx > 0
                ? "mt-10 pt-10 border-t border-dashed border-gray-300"
                : ""
            }>
            {/* Journey header */}
            <div className="mb-8 border-b border-[#e9e9e9] pb-4">
              <div className="flex items-center gap-2 text-primary font-bold text-2xl mb-2">
                <span>{routeTitle}</span>
                <FaPlane className="text-lg" />
              </div>
              <div className="flex items-center justify-between text-[#707070] text-sm">
                <span>{dateLabel}</span>
                <span>
                  {t("totalDuration")}: {totalDuration}
                </span>
              </div>
            </div>

            {/* Segments */}
            <div className="space-y-7 pb-7">
              {journey.segment.map((seg, idx) => {
                const departTime = dayjs(seg.departureDateTime).format("HH:mm");
                const arriveTime = dayjs(seg.arrivalDateTime).format("HH:mm");
                const departDate = dayjs(seg.departureDateTime).format(
                  "DD MMM",
                );
                const arriveDate = dayjs(seg.arrivalDateTime).format("DD MMM");
                const flightDuration = t("durationFormat", formatDuration(seg.flightTimeInMinutes))
                const fromTerminal = seg.departureTerminal
                  ? `${t("terminal")} ${seg.departureTerminal}`
                  : "";
                const toTerminal = seg.arrivalTerminal
                  ? `${t("terminal")} ${seg.arrivalTerminal}`
                  : "";
                const isLastSegment = idx === journey.segment.length - 1;
                const nextSeg = journey.segment[idx + 1];
                const layoverMinutes = !isLastSegment
                  ? getLayoverMinutes(seg, nextSeg)
                  : 0;

                return (
                  <div key={seg.id}>
                    <div className="grid grid-cols-[70px_54px_1fr] sm:grid-cols-[84px_62px_1fr] gap-2 sm:gap-4">
                      {/* Times column */}
                      <div className="flex flex-col justify-between text-right min-h-[188px] py-1">
                        <div>
                          <p className="text-xl leading-none text-[#666]">
                            {departTime}
                          </p>
                          <p className="text-xs text-[#9b9b9b]">
                            {departDate}.
                          </p>
                        </div>
                        <div>
                          <p className="text-xl leading-none text-[#666]">
                            {arriveTime}
                          </p>
                          <p className="text-xs text-[#9b9b9b]">
                            {arriveDate}.
                          </p>
                        </div>
                      </div>

                      {/* Timeline column */}
                      <div className="relative flex flex-col items-center justify-between py-1 min-h-[188px]">
                        <div className="absolute top-4 bottom-4 w-[1.5px] bg-[#d2d2d2]">
                          <span className="inline-flex absolute top-1/2 -translate-y-1/2 w-fit text-nowrap items-center justify-center self-end h-8 min-w-[72px] end-full rounded-s-full bg-primary text-white text-xs px-4">
                            {flightDuration}
                          </span>
                        </div>
                        <span className="relative z-10 size-8 rounded-full bg-primary" />
                        <span className="relative z-10 size-8 rounded-full bg-primary" />
                      </div>

                      {/* Info column */}
                      <div className="text-right space-y-5">
                        <div>
                          <p className="text-base sm:text-lg leading-none text-[#777] font-light">
                            {seg.origin}
                          </p>
                          {fromTerminal && (
                            <p className="text-xs text-[#9b9b9b]">
                              {fromTerminal}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-5 py-1">
                          <div className="relative w-[54px] h-[54px] shrink-0">
                            <Image
                              src={
                                seg.operatingCarrierLogo ??
                                `https://pics.avs.io/200/200/${seg.operatingCarrierCode}.png`
                              }
                              alt={
                                seg.operatingCarrierName ??
                                seg.operatingCarrierCode
                              }
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#8d8d8d] leading-6 text-right">
                            <p className="font-semibold text-sm text-[#444]">
                              {seg.operatingCarrierName ??
                                seg.operatingCarrierCode}
                              <span className="ms-1 font-normal text-[#aaa]">
                                ({seg.operatingCarrierCode})
                              </span>
                            </p>
                            <p>
                              {t("flightNumber")}: {seg.marketingCarrierCode}
                              {seg.marketingFlightNumber}
                            </p>
                            {seg.equipment && (
                              <p>
                                {t("aircraft")}: {seg.equipment}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-base sm:text-lg leading-none text-[#777] font-light">
                            {seg.destination}
                          </p>
                          {toTerminal && (
                            <p className="text-xs text-[#9b9b9b]">
                              {toTerminal}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Layover badge between segments */}
                    {!isLastSegment && (
                      <div className="bg-[#edd0d0] rounded-xl text-center text-sm text-[#6b6b6b] py-3 mt-5">
                        {t("transitTime")}:{" "}
                        {t("durationFormat", formatDuration(layoverMinutes))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
