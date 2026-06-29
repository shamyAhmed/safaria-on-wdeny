"use client";

import { useState } from "react";
import { BusSeatsPayload, BusSeat } from "@/app/[locale]/_types/BusSeats";
import { GiSteeringWheel } from "react-icons/gi";
import { LuDoorOpen } from "react-icons/lu";
import { MdOutlineWc } from "react-icons/md";

// ── Level labels ──────────────────────────────────────────────────────────────

const LEVEL_LABELS: Record<number, string> = {
  1: "الدور الأول",
  2: "الدور الثاني",
  3: "الدور الثالث",
  4: "الدور الرابع",
};

const levelLabel = (n: number) => LEVEL_LABELS[n] ?? `الدور ${n}`;

// ── Individual cell ───────────────────────────────────────────────────────────

interface SeatCellProps {
  seat: BusSeat;
  selected: boolean;
  onSelect: (id: string) => void;
}

const SeatCell = ({ seat, selected, onSelect }: SeatCellProps) => {
  if (seat.class === "driver") {
    return (
      <div className="flex items-center justify-center w-[56px] h-[56px] rounded-2xl bg-primary">
        <GiSteeringWheel size={28} className="text-white" />
      </div>
    );
  }

  if (seat.class === "space") {
    return <div className="w-[56px] h-[56px]" />;
  }

  if (seat.class === "door") {
    return (
      <div className="flex items-center justify-center w-[56px] h-[56px] rounded-2xl border-2 border-red-400 bg-red-50">
        <LuDoorOpen size={26} className="text-red-400" />
      </div>
    );
  }

  if (seat.class === "wc") {
    return (
      <div className="flex items-center justify-center w-[56px] h-[56px] rounded-2xl border-2 border-blue-300 bg-blue-50">
        <MdOutlineWc size={26} className="text-blue-400" />
      </div>
    );
  }

  if (seat.class === "booked") {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center w-[56px] h-[56px] rounded-2xl bg-red-100 cursor-not-allowed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/seat.svg" alt="booked seat" width={26} height={32} className="opacity-60" />
        </div>
        {seat.seat_no && (
          <span className="text-[10px] text-gray-400">{seat.seat_no}</span>
        )}
      </div>
    );
  }

  if (seat.class === "available") {
    return (
      <button
        type="button"
        onClick={() => seat.id && onSelect(seat.id)}
        className="flex flex-col items-center gap-1">
        <div className={`flex items-center justify-center w-[56px] h-[56px] rounded-2xl transition-colors cursor-pointer ${
          selected ? "bg-green-100 hover:bg-green-200" : "bg-gray-100 hover:bg-primary/10"
        }`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/seat.svg" alt="seat" width={26} height={32} />
        </div>
        {seat.seat_no && (
          <span className={`text-[10px] font-medium ${selected ? "text-green-600" : "text-gray-400"}`}>
            {seat.seat_no}
          </span>
        )}
      </button>
    );
  }

  return null;
};

// ── Seat Map ──────────────────────────────────────────────────────────────────

interface SeatMapProps {
  data: BusSeatsPayload;
  selectedSeats: string[];
  onToggleSeat: (id: string) => void;
}

const SeatMap = ({ data, selectedSeats, onToggleSeat }: SeatMapProps) => {
  const { salon, seats_map } = data;
  const isMultiLevel = salon.levels > 1;

  const [activeLevel, setActiveLevel] = useState(1);

  const visibleSeats = isMultiLevel
    ? seats_map.filter((s) => s.level === activeLevel)
    : seats_map;

  return (
    <div className="flex flex-col w-full gap-5">

      {/* Level switcher */}
      {isMultiLevel && (
        <div className="flex items-center gap-6 border-b border-gray-100">
          {Array.from({ length: salon.levels }, (_, i) => i + 1).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              className={`pb-2 text-sm transition-colors border-b-2 -mb-px ${
                activeLevel === level
                  ? "text-primary font-bold border-primary"
                  : "text-gray-400 font-normal border-transparent hover:text-gray-600"
              }`}>
              {levelLabel(level)}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div
        dir="ltr"
        className="grid gap-3 w-full justify-center"
        style={{ gridTemplateColumns: `repeat(${salon.columns}, 56px)` }}
      >
        {visibleSeats.map((seat, i) => (
          <SeatCell
            key={seat.id ?? `${activeLevel}-${i}`}
            seat={seat}
            selected={!!seat.id && selectedSeats.includes(seat.id)}
            onSelect={onToggleSeat}
          />
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
