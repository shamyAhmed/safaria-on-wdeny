"use client";

import { useMemo, useState } from "react";
import { Button, Col, Drawer, Row } from "antd";
import { FaFilter } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { BussForm } from "../homePage/forms/BussForm";
import { BusCard } from "./cards/BusCard";
import { BusCardSkeleton } from "./cards/BusCardSkeleton";
import { BusFiltersSection } from "./sections/BusFiltersSection";
import {
  BusFiltersProvider,
  useBusFiltersContext,
} from "./context/BusFiltersContext";
import style from "../discover/styles/discover.module.scss";
import { Link } from "@/i18n/navigation";
import { PiBusBold } from "react-icons/pi";
import { useTranslations } from "next-intl";
import useGetBusTrips from "@/app/[locale]/_hooks/useGetBusTrips";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import "../discoverAirplan/styles/airplane-discover.scss";
import type { BusTrip } from "@/app/[locale]/_types/BusTrip";

// ─── Inner component (needs context) ─────────────────────────────────────────

const DiscoverBusInner = () => {
  const t = useTranslations("discoverBus");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { deferredFilters, reset } = useBusFiltersContext();
  const searchParams = useSearchParams();
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");

  const cityFrom = searchParams.get("city_from") ?? undefined;
  const cityTo = searchParams.get("city_to") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  const {
    data: busTripsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetBusTrips({
    city_from: cityFrom,
    city_to: cityTo,
    date,
    currency,
  });

  const allTrips: BusTrip[] = useMemo(
    () => busTripsData?.pages.flatMap((page) => page.data) ?? [],
    [busTripsData],
  );

  // ── Derived filter options from actual data ───────────────────────────────
  const companyOptions = useMemo(
    () => [...new Set(allTrips.map((t) => t.company).filter(Boolean))],
    [allTrips],
  );

  const fromStationOptions = useMemo(
    () => [
      ...new Set(
        allTrips
          .flatMap((t) => t.stations_from.map((s) => s.name))
          .filter(Boolean),
      ),
    ],
    [allTrips],
  );

  const toStationOptions = useMemo(
    () => [
      ...new Set(
        allTrips
          .flatMap((t) => t.stations_to.map((s) => s.name))
          .filter(Boolean),
      ),
    ],
    [allTrips],
  );

  const minPrice = useMemo(
    () =>
      allTrips.length
        ? Math.min(...allTrips.map((t) => t.price_start_with))
        : undefined,
    [allTrips],
  );

  const maxPrice = useMemo(
    () =>
      allTrips.length
        ? Math.max(...allTrips.map((t) => t.price_start_with))
        : undefined,
    [allTrips],
  );

  // ── Locally filtered trips (derived state via memo) ───────────────────────
  const visibleTrips = useMemo(() => {
    const { companies, fromStations, toStations, priceRange } = deferredFilters;

    return allTrips.filter((trip) => {
      if (companies.length > 0 && !companies.includes(trip.company))
        return false;

      if (fromStations.length > 0) {
        const names = trip.stations_from.map((s) => s.name);
        if (!fromStations.some((s) => names.includes(s))) return false;
      }

      if (toStations.length > 0) {
        const names = trip.stations_to.map((s) => s.name);
        if (!toStations.some((s) => names.includes(s))) return false;
      }

      if (priceRange.from !== null && trip.price_start_with < priceRange.from)
        return false;
      if (priceRange.to !== null && trip.price_start_with > priceRange.to)
        return false;

      return true;
    });
  }, [allTrips, deferredFilters]);

  const filterSidebar = (
    <BusFiltersSection
      companyOptions={companyOptions}
      fromStationOptions={fromStationOptions}
      toStationOptions={toStationOptions}
      minPrice={minPrice}
      maxPrice={maxPrice}
    />
  );

  return (
    <div className={style.discover}>
      <PageBannerSection
        title={t("pageTitle")}
        currentLink="/discover-bus"
        currentPage={t("pageTitle")}
      />

      <div className="container">
        <div className="pt-10 pb-8 my-10 cardS1 bg-white">
          <BussForm />
        </div>

        <Row gutter={[24, 24]}>
          {/* ── Filters sidebar (desktop) ── */}
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
                {t("filters.title")}
              </h4>
              <button
                onClick={reset}
                className="text-primary text-sm">
                {t("filters.reset")}
              </button>
            </div>
            <div className="rounded-[20px] bg-white py-8 px-6 mb-6">
              {filterSidebar}
            </div>
          </Col>

          {/* ── Results ── */}
          <Col
            className="max-xl:!basis-full max-xl:!max-w-full"
            xs={24}
            xl={18}>
            <div className="flex py-8 flex-col gap-6">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="xl:hidden fixed bottom-6 end-6 z-40 h-12 px-5 rounded-full bg-primary text-white font-bold flex items-center gap-2 shadow-lg">
                <FaFilter size={14} />
                {t("filters.title")}
              </button>

              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <BusCardSkeleton key={i} />
                ))
              ) : visibleTrips.length > 0 ? (
                <>
                  {visibleTrips.map((trip) => (
                    <BusCard
                      key={trip.id}
                      trip={trip}
                    />
                  ))}

                  {/* Load-more — button fetches the next server page on click;
                      while fetching, show skeletons instead of the button. */}
                  {hasNextPage &&
                    (isFetchingNextPage ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <BusCardSkeleton key={`load-more-skeleton-${i}`} />
                      ))
                    ) : (
                      <div className="flex justify-center pt-2">
                        <Button
                          type="default"
                          onClick={() => fetchNextPage()}
                          className="!rounded-xl !h-11 !px-8 !text-sm !font-bold !border-primary !text-primary">
                          {t("loadMore")}
                        </Button>
                      </div>
                    ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
                    <PiBusBold size={44} />
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
              )}
            </div>
          </Col>
        </Row>
      </div>

      {/* ── Filters drawer (mobile) ── */}
      <Drawer
        title={t("filters.title")}
        placement="right"
        width={360}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="xl:!hidden"
        rootClassName="xl:!hidden"
        footer={
          <button
            onClick={() => {
              reset();
              setIsDrawerOpen(false);
            }}
            className="w-full text-center text-primary font-medium py-2">
            {t("filters.resetFilters")}
          </button>
        }>
        <div className="rounded-[20px] bg-white">{filterSidebar}</div>
      </Drawer>
    </div>
  );
};

// ─── Public export wrapped in provider ───────────────────────────────────────

export const DiscoverBusComponent = () => (
  <BusFiltersProvider>
    <DiscoverBusInner />
  </BusFiltersProvider>
);
