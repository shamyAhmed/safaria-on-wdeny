"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BussForm } from "../forms/BussForm";
import { PrivetTripsForm } from "../forms/PrivetTripsForm";
import { AirplaneForm } from "../forms/AirplaneForm";

export function HeroForms() {
  const t = useTranslations("homePage.hero");
  const [currentTab, setCurrentTab] = useState("airplan");

  const tabs = [
    { key: "airplan", label: t("tabs.airplan"), icon: <Image src="/images/icons/plane.webp" alt={t("tabs.airplan")} width={22} height={22} /> },
    { key: "bus", label: t("tabs.bus"), icon: <Image src="/images/icons/bus.webp" alt={t("tabs.bus")} width={22} height={22} /> },
    { key: "privatTrip", label: t("tabs.privateTrip"), icon: <Image src="/images/icons/car.webp" alt={t("tabs.privateTrip")} width={22} height={22} /> },
  ];

  return (
    <>
      {/* ── Tab switcher ─────────────────────────────────── */}
      <div className="flex items-center justify-between sm:justify-center md:justify-normal gap-1 sm:gap-3 h-auto mb-9 w-full">
        {tabs.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setCurrentTab(key)}
            className={`${
              currentTab === key
                ? "bg-primary cursor-auto relative"
                : "bg-white/20 hover:scale-105 backdrop-blur-md cursor-pointer"
            } rounded-[200px] px-4 py-2 sm:px-4 sm:py-4 md:px-12 md:py-[18px] flex items-center text-sm sm:text-base gap-2 md:gap-3 md:text-lg font-medium text-white transition-all duration-200`}>
            <div className="relative z-10">{icon}</div>
            <div className="relative z-10 text-nowrap">{label}</div>
            <div
              className={`bg-primary size-3 sm:size-5 md:h-10 md:w-10 rotate-45 block top-[78%] sm:top-[80%] md:top-1/2 left-1/2 -translate-x-1/2 transition-all duration-200 absolute z-0 ${
                currentTab === key ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── Form card ────────────────────────────────────── */}
      <div className="cardS1 bg-white !rounded-[30px]">
        {currentTab === "bus"        && <BussForm />}
        {currentTab === "privatTrip" && <PrivetTripsForm />}
        {currentTab === "airplan"    && <AirplaneForm />}
      </div>
    </>
  );
}
