"use client";

import { useMemo, useState } from "react";
import { MdDirectionsBus } from "react-icons/md";
import { useTranslations } from "next-intl";
import useGetBusOrders from "@/app/[locale]/_hooks/useGetBusOrders";
import { TicketCardSkeleton } from "@/components/user/my-trips/TicketCardSkeleton";
import { BusTicketCard } from "./BusTicketCard";
import { BusTicketDetailModal } from "./BusTicketDetailModal";
import type { BusOrder } from "@/app/[locale]/_types/BusOrder";

type TabKey = "all" | "pending" | "confirmed" | "cancelled";

const matchesTab = (order: BusOrder, tab: TabKey): boolean => {
  if (tab === "all") return true;
  const s = (order.status_code ?? order.status ?? "").toLowerCase();
  if (tab === "pending") return s.includes("pending") || s.includes("hold");
  if (tab === "confirmed")
    return s.includes("confirm") || s.includes("paid") || s.includes("complete");
  if (tab === "cancelled") return s.includes("cancel");
  return true;
};

export const BusTicketsContent = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [detailId, setDetailId] = useState<number | null>(null);
  const { data, isLoading } = useGetBusOrders();
  const t = useTranslations("profile.myTrips");

  const FILTER_TABS: { key: TabKey; label: string }[] = [
    { key: "all", label: t("tabs.all") },
    { key: "pending", label: t("tabs.pending") },
    { key: "confirmed", label: t("tabs.confirmed") },
    { key: "cancelled", label: t("tabs.cancelled") },
  ];

  const visible = useMemo(
    () => (data ?? []).filter((o) => matchesTab(o, activeTab)),
    [data, activeTab],
  );

  const counts: Record<TabKey, number> = useMemo(
    () => ({
      all: (data ?? []).length,
      pending: (data ?? []).filter((o) => matchesTab(o, "pending")).length,
      confirmed: (data ?? []).filter((o) => matchesTab(o, "confirmed")).length,
      cancelled: (data ?? []).filter((o) => matchesTab(o, "cancelled")).length,
    }),
    [data],
  );

  return (
    <div className="formS1 !border-none">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        {t("busTitle")}
      </h2>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <span className="text-sm text-gray-500">
          {t("resultsCount", { count: isLoading ? "—" : counts[activeTab] })}
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center border-b border-[#E2E2E2] mb-8 overflow-x-auto scrollbar-hide">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 whitespace-nowrap px-2 text-center pb-3 text-sm font-medium transition-colors relative ${
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
          {Array.from({ length: 3 }).map((_, i) => (
            <TicketCardSkeleton key={i} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
            <MdDirectionsBus className="text-4xl text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {t("busEmptyState.title")}
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            {t("busEmptyState.description")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((order) => (
            <BusTicketCard
              key={order.id}
              order={order}
              onShowDetails={(o) => setDetailId(o.id)}
            />
          ))}
        </div>
      )}

      <BusTicketDetailModal
        orderId={detailId}
        open={detailId !== null}
        onClose={() => setDetailId(null)}
      />
    </div>
  );
};
