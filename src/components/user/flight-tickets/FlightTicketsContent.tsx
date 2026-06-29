"use client";

import { useMemo, useState } from "react";
import { Skeleton } from "antd";
import { MdFlight } from "react-icons/md";
import { useTranslations } from "next-intl";
import useGetFlightOrders from "@/app/[locale]/_hooks/useGetFlightOrders";
import { FlightTicketCard } from "./FlightTicketCard";
import type { FlightOrder } from "@/app/[locale]/_types/FlightOrder";

// ── Filter helpers ─────────────────────────────────────────────────────────────

type TabKey = "all" | "pending" | "booked";

const matchesTab = (order: FlightOrder, tab: TabKey): boolean => {
  if (tab === "all") return true;
  const s = (order.order_status ?? order.status ?? "").toLowerCase();
  if (tab === "pending") return s.includes("hold") || s === "held";
  if (tab === "booked")  return s.includes("book") || s === "booked";
  return true;
};

// ── Skeleton ───────────────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton.Avatar active size={40} shape="square" style={{ borderRadius: 12 }} />
      <div className="flex-1 space-y-2">
        <Skeleton.Input active size="small" className="!w-32 !rounded" />
        <Skeleton.Input active size="small" className="!w-48 !rounded" />
      </div>
    </div>
    <Skeleton.Input active size="default" block className="!rounded-xl" />
    <div className="flex gap-6">
      <Skeleton.Input active size="small" className="!w-20 !rounded" />
      <Skeleton.Input active size="small" className="!w-24 !rounded" />
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────────

export const FlightTicketsContent = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const { data, isLoading } = useGetFlightOrders();
  const t = useTranslations("profile.myTrips");

  const FILTER_TABS: { key: TabKey; label: string }[] = [
    { key: "all",     label: t("tabs.all")     },
    { key: "pending", label: t("tabs.pending") },
    { key: "booked",  label: t("tabs.booked")  },
  ];

  const visible = useMemo(
    () => (data ?? []).filter((o) => matchesTab(o, activeTab)),
    [data, activeTab],
  );

  const counts: Record<TabKey, number> = useMemo(() => ({
    all:     (data ?? []).length,
    pending: (data ?? []).filter((o) => matchesTab(o, "pending")).length,
    booked:  (data ?? []).filter((o) => matchesTab(o, "booked")).length,
  }), [data]);

  return (
    <div className="formS1 !border-none">

      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        {t("title")}
      </h2>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <span className="text-sm text-gray-500">
          {t("resultsCount", { count: isLoading ? "—" : counts[activeTab] })}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center border-b border-[#E2E2E2] mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 text-center pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? "text-primary after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            {tab.label}
            {!isLoading && counts[tab.key] > 0 && (
              <span
                className={`ms-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-500"
                }`}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <MdFlight className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {t("emptyState.title")}
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            {t("emptyState.description")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((order) => (
            <FlightTicketCard key={order.id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
};
