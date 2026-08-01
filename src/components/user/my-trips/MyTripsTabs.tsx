"use client";

import { useState } from "react";
import { MdFlight, MdDirectionsBus } from "react-icons/md";
import { FaCar } from "react-icons/fa6";
import { FlightTicketsContent } from "@/components/user/flight-tickets/FlightTicketsContent";
import { BusTripsEmptyState } from "./BusTripsEmptyState";
import { PrivateTripsEmptyState } from "./PrivateTripsEmptyState";

type TripTab = "flights" | "buses" | "private";

const TABS: { key: TripTab; labelAr: string; icon: React.ReactNode; disabled?: boolean }[] = [
  { key: "flights", labelAr: "الطيران",   icon: <MdFlight size={18} /> },
  { key: "buses",   labelAr: "الاتوبيسات",   icon: <MdDirectionsBus size={18} />, disabled: true },
  { key: "private", labelAr: "الرحلات الخاصة", icon: <FaCar size={16} />, disabled: true },
];

export const MyTripsTabs = () => {
  const [activeTab, setActiveTab] = useState<TripTab>("flights");

  return (
    <div>
      {/* ── Trip-type tab bar ── */}
      <div className="flex items-center gap-2 mb-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative shrink-0 ${
              tab.disabled
                ? "text-gray-300 cursor-not-allowed"
                : activeTab === tab.key
                  ? "text-primary after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-primary"
                  : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.labelAr}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "flights" && <FlightTicketsContent />}
      {activeTab === "buses"   && <BusTripsEmptyState />}
      {activeTab === "private" && <PrivateTripsEmptyState />}
    </div>
  );
};
