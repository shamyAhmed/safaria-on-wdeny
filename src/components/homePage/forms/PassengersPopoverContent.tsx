"use client";

import { useTranslations } from "next-intl";

type Passengers = { adt: number; chd: number; inf: number };

interface PassengersPopoverContentProps {
  passengers: Passengers;
  totalPassengers: number;
  maxPassengers: number;
  onPassengersChange: (key: keyof Passengers, value: number) => void;
  onApply: () => void;
}

export function PassengersPopoverContent({
  passengers,
  totalPassengers,
  maxPassengers,
  onPassengersChange,
  onApply,
}: PassengersPopoverContentProps) {
  const t = useTranslations("homePage.airplaneForm");

  const rows: { key: keyof Passengers; subtitle: string }[] = [
    { key: "adt", subtitle: t("passengersSubtitles.adt") },
    { key: "chd", subtitle: t("passengersSubtitles.chd") },
    { key: "inf", subtitle: t("passengersSubtitles.inf") },
  ];

  return (
    <div className="w-64 flex flex-col gap-1 py-1">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">
          {t("fields.passengers.label")}
        </span>
        <span className="text-sm font-semibold text-primary">
          {totalPassengers} / {maxPassengers}
        </span>
      </div>

      {/* Passenger type rows */}
      {rows.map(({ key, subtitle }) => {
        const current = passengers[key];
        const atMax = totalPassengers >= maxPassengers;
        const atInfantMax = key === "inf" && current === passengers.adt;
        const atAdultMin = key === "adt" && current === 1;

        return (
          <div
            key={key}
            className="flex items-center justify-between py-3 border-b last:border-b-0 border-gray-100">
            <div>
              <p className="font-semibold text-sm text-gray-800">{t(key)}</p>
              <p className="text-xs text-gray-400">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={current === 0 || atAdultMin}
                onClick={() => onPassengersChange(key, current - 1)}
                className="disabled:opacity-40 disabled:cursor-not-allowed size-8 border border-primary text-primary rounded-full flex justify-center items-center text-lg font-light hover:bg-primary hover:text-white transition-colors">
                −
              </button>
              <span className="w-4 text-center font-semibold text-sm">
                {current}
              </span>
              <button
                type="button"
                disabled={atMax || atInfantMax}
                onClick={() => onPassengersChange(key, current + 1)}
                className="disabled:opacity-40 disabled:cursor-not-allowed size-8 border border-primary text-primary rounded-full flex justify-center items-center text-lg font-light hover:bg-primary hover:text-white transition-colors">
                +
              </button>
            </div>
          </div>
        );
      })}

      {/* Max-reached warning */}
      {totalPassengers >= maxPassengers && (
        <p className="text-xs text-amber-500 mt-2 text-center">
          {t("fields.passengers.maxReached")}
        </p>
      )}

      {/* Apply button */}
      <button
        type="button"
        onClick={onApply}
        className="mt-3 w-full bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
        {t("actions.apply")}
      </button>
    </div>
  );
}
