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
 * Buses and private trips both report a machine `status_code` next to an
 * English display string. The code is the one worth branching on — the display
 * string is not translated by the API.
 */
export const orderStatusColor = (code: string): BadgeColor => {
  const s = code.toLowerCase();
  if (s.includes("cancel")) return "red";
  if (s.includes("pending") || s.includes("hold")) return "yellow";
  if (s.includes("paid") || s.includes("confirm") || s.includes("complete"))
    return "green";
  return "gray";
};

/**
 * Maps a status code onto a translation key under `profile.myTrips.status`,
 * falling back to the API's own label when a new code shows up.
 */
export const orderStatusKey = (code: string): string | null => {
  const s = code.toLowerCase();
  if (s.includes("cancel")) return "cancelled";
  if (s.includes("pending")) return "pending";
  if (s.includes("hold")) return "onHold";
  if (s.includes("paid")) return "paid";
  if (s.includes("confirm")) return "confirmed";
  if (s.includes("complete")) return "completed";
  if (s.includes("expire")) return "expired";
  if (s.includes("fail")) return "failed";
  return null;
};
