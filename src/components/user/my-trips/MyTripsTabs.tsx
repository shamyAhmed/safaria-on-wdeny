"use client";

import { useState } from "react";
import { MdFlight, MdDirectionsBus } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { BusTicketsContent } from "@/components/user/bus-tickets/BusTicketsContent";
import { PrivateTicketsContent } from "@/components/user/private-tickets/PrivateTicketsContent";

type TripTab = "flights" | "buses" | "private";

export const MyTripsTabs = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("flights");
  const t = useTranslations("profile.myTrips.tripTypes");

  const TABS: { key: TripTab; label: string; icon: React.ReactNode }[] = [
    { key: "flights", label: t("flights"), icon: <MdFlight size={18} /> },
    { key: "buses", label: t("buses"), icon: <MdDirectionsBus size={18} /> },
    { key: "private", label: t("private"), icon: <FaCar size={16} /> },
  ];

  return (
    <div>
      {/* ── Trip-type tab bar ── */}
      <div className="flex items-center gap-2 mb-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative shrink-0 ${
              activeTab === tab.key
                ? "text-primary after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "flights" && <FlightTicketsContent />}
      {activeTab === "buses" && <BusTicketsContent />}
      {activeTab === "private" && <PrivateTicketsContent />}
    </div>
  );
};
