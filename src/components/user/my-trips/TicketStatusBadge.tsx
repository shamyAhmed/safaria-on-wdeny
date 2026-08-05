"use client";

export type BadgeColor = "green" | "yellow" | "red" | "gray";

const BADGE: Record<BadgeColor, string> = {
  green: "bg-green-50  text-green-700  border-green-200",
  yellow: "bg-amber-50  text-amber-700  border-amber-200",
  red: "bg-red-50    text-red-600    border-red-200",
  gray: "bg-gray-50   text-gray-600   border-gray-200",
};

export const TicketStatusBadge = ({
  label,
  color,
}: {
  label: string;
  color: BadgeColor | string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
      BADGE[color as BadgeColor] ?? BADGE.gray
    }`}>
    {label}
  </span>
);

/**
 * Every trip type reports a machine status next to an English display string —
 * `status_code` on buses and private trips, `order_status` on flights. The code
 * is the one worth branching on; the display string is not translated by the
 * API. Flights spell theirs in PascalCase (`PendingPayment`, `Booked`), hence
 * the substring matching rather than an exact lookup.
 */
export const orderStatusColor = (code: string): BadgeColor => {
  const s = code.toLowerCase();
  if (s.includes("cancel")) return "red";
  if (s.includes("pending") || s.includes("hold")) return "yellow";
  if (
    s.includes("paid") ||
    s.includes("confirm") ||
    s.includes("complete") ||
    s.includes("book")
  )
    return "green";
  return "gray";
};

/**
 * Maps a status code onto a translation key under `profile.myTrips.status`,
 * falling back to the API's own label when a new code shows up.
 *
 * `pending` is tested before `book` so that a flight sitting on
 * `PendingPayment` reads as pending rather than booked.
 */
export const orderStatusKey = (code: string): string | null => {
  const s = code.toLowerCase();
  if (s.includes("cancel")) return "cancelled";
  if (s.includes("pending")) return "pending";
  if (s.includes("hold")) return "onHold";
  if (s.includes("book")) return "booked";
  if (s.includes("paid")) return "paid";
  if (s.includes("confirm")) return "confirmed";
  if (s.includes("complete")) return "completed";
  if (s.includes("expire")) return "expired";
  if (s.includes("fail")) return "failed";
  return null;
};
