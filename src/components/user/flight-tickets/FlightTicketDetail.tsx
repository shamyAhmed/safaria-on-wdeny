"use client";

import { Skeleton } from "antd";
import {
  MdFlight,
  MdFlightLand,
  MdFlightTakeoff,
} from "react-icons/md";
import {
  FiArrowLeft,
  FiCalendar,
  FiExternalLink,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { BsCreditCard2Front, BsTagFill } from "react-icons/bs";
import { useRouter } from "@/i18n/navigation";
import useFormatDate from "@/hooks/useFormatDate";
import { useTranslations } from "next-intl";
import useGetFlightOrder from "@/app/[locale]/_hooks/useGetFlightOrder";
import type {
  FlightOrder,
  FlightOrderJourney,
  FlightOrderSegment,
  FlightPaymentTransaction,
} from "@/app/[locale]/_types/FlightOrder";

// ── Status helpers (labels resolved inside component with t()) ─────────────────

const BADGE: Record<string, string> = {
  green:  "bg-green-50  text-green-700  border-green-200",
  yellow: "bg-amber-50  text-amber-700  border-amber-200",
  red:    "bg-red-50    text-red-600    border-red-200",
  gray:   "bg-gray-50   text-gray-600   border-gray-200",
};

const StatusBadge = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${BADGE[color] ?? BADGE.gray}`}>
    {label}
  </span>
);

const TxStatusBadge = ({ status, labels }: { status: string; labels: Record<string, { label: string; color: string }> }) => {
  const s = status.toLowerCase();
  const found = labels[s];
  if (found) return <StatusBadge label={found.label} color={found.color} />;
  return <StatusBadge label={status} color="gray" />;
};

// ── Section wrapper ─────────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-5 py-3.5 border-b border-gray-100">
      <h3 className="font-bold text-sm text-gray-700">{title}</h3>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

// ── Helpers ─────────────────────────────────────────────────────────────────────


const segmentsForJourney = (
  journey: FlightOrderJourney,
  segments: FlightOrderSegment[],
): FlightOrderSegment[] => {
  const matched = segments.filter((s) =>
    journey.segment_reference_ids.includes(String(s.id)),
  );
  return matched.length > 0 ? matched : segments;
};


// ── Skeleton ────────────────────────────────────────────────────────────────────

const DetailSkeleton = () => (
  <div className="flex flex-col gap-5">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <Skeleton.Input active size="small" className="!w-32 !rounded" />
        <Skeleton.Input active size="default" block className="!rounded-xl" />
        <Skeleton.Input active size="small" className="!w-56 !rounded" />
      </div>
    ))}
  </div>
);

// ── Main component ──────────────────────────────────────────────────────────────

interface FlightTicketDetailProps {
  orderId: number | string;
}

export const FlightTicketDetail = ({ orderId }: FlightTicketDetailProps) => {
  const router = useRouter();
  const t = useTranslations("profile.myTrips.detail");
  const tTimeline = useTranslations("flightModal.timeline");
  const date = useFormatDate();
  const formatDuration = (mins: number) => tTimeline("durationFormat", { h: Math.floor(mins / 60), m: mins % 60 });
  const { data: order, isLoading, isError } = useGetFlightOrder(orderId);

  const PTYPE: Record<string, string> = {
    ADT: t("passengerTypes.adult"),
    CHD: t("passengerTypes.child"),
    INF: t("passengerTypes.infant"),
  };

  const paymentStatusLabels: Record<string, { label: string; color: string }> = {
    paid:    { label: t("paymentStatus.paid"),    color: "green"  },
    failed:  { label: t("paymentStatus.failed"),  color: "red"    },
    pending: { label: t("paymentStatus.pending"), color: "yellow" },
  };

  const resolveOrderStatus = (o: FlightOrder) => {
    const s = (o.order_status ?? o.status ?? "").toLowerCase();
    if (s.includes("hold") || s === "held")   return { label: t("orderStatus.onHold"),    color: "yellow" };
    if (s.includes("book") || s === "booked") return { label: t("orderStatus.booked"),    color: "green"  };
    if (s.includes("cancel"))                 return { label: t("orderStatus.cancelled"), color: "red"    };
    return { label: o.order_status || o.status, color: "gray" };
  };

  const resolvePaymentStatus = (transactions: FlightPaymentTransaction[]) => {
    if (!transactions.length) return null;
    const paid = transactions.find((tx) => tx.status === "paid");
    if (paid) return paymentStatusLabels.paid;
    const latest = transactions.reduce((a, b) => (b.id > a.id ? b : a));
    return paymentStatusLabels[latest.status] ?? { label: latest.status, color: "gray" };
  };

  if (isLoading) return <DetailSkeleton />;

  if (isError || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <MdFlight className="text-3xl text-red-300" />
        </div>
        <p className="text-gray-500 text-sm">{t("errorMessage")}</p>
      </div>
    );
  }

  const orderStatus = resolveOrderStatus(order);
  const payStatus   = resolvePaymentStatus(order.payment_transactions);
  const firstSeg    = order.segments[0];

  return (
    <div className="flex flex-col gap-5">

      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors shrink-0">
          <FiArrowLeft size={16} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">{t("pageTitle")}</h2>
      </div>

      {/* ── Overview ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
          {/* Carrier + References */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <MdFlight size={22} className="text-primary" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-base leading-tight">
                {firstSeg?.marketing_carrier_code ?? "—"}
                {firstSeg?.marketing_flight_number ? ` · ${firstSeg.marketing_flight_number}` : ""}
              </p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {[order.airline_pnr, order.ndc_booking_reference, order.gds_pnr]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={orderStatus.label} color={orderStatus.color} />
            {payStatus && <StatusBadge label={payStatus.label} color={payStatus.color} />}
          </div>
        </div>

        <div className="px-5 pb-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <FiCalendar size={12} className="text-gray-400" />
            {date.dateTime(order.created_at, { style: "long" })}
          </span>
          <span className="flex items-center gap-1.5">
            <FiUsers size={12} className="text-gray-400" />
            {t("passengerCount", { count: order.passengers.length })}
          </span>
          {order.refundability && (
            <span className="flex items-center gap-1.5">
              <BsTagFill size={11} className="text-gray-400" />
              {order.refundability}
            </span>
          )}
        </div>
      </div>

      {/* ── Itinerary ── */}
      {order.journeys.map((journey, ji) => {
        const segs = segmentsForJourney(journey, order.segments);
        const totalMins = segs.reduce((s, seg) => s + seg.flight_time_in_minutes, 0);

        return (
          <Section key={journey.id} title={order.journeys.length > 1 ? t("journeyN", { n: ji + 1 }) : t("journey")}>
            {/* Route summary line */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg font-black text-gray-900">{journey.origin}</span>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-[10px] text-gray-400 mb-0.5">{formatDuration(totalMins)}</p>
                <div className="w-full flex items-center gap-1">
                  <div className="flex-1 h-px bg-gray-200" />
                  <MdFlight size={14} className="text-primary" />
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {journey.number_of_stops === 0
                    ? t("direct")
                    : `${journey.number_of_stops} ${journey.number_of_stops === 1 ? t("stop") : t("stops")}`}
                </p>
              </div>
              <span className="text-lg font-black text-gray-900">{journey.destination}</span>
            </div>

            {/* Segment chain */}
            <div className="flex flex-col gap-0">
              {segs.map((seg, si) => (
                <div key={seg.id}>
                  {/* Segment card */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
                    <div className="flex items-start gap-3">

                      {/* Departure */}
                      <div className="flex flex-col items-center min-w-[54px]">
                        <MdFlightTakeoff size={16} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
                        <p className="text-lg font-black text-gray-900 leading-none">{seg.origin}</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">
                          {date.time(seg.departure_datetime)}
                        </p>
                        <p className="text-[10px] text-gray-400 text-center">
                          {date.medium(seg.departure_datetime)}
                        </p>
                        {seg.departure_terminal && (
                          <p className="text-[10px] text-gray-400 mt-0.5">T{seg.departure_terminal}</p>
                        )}
                      </div>

                      {/* Middle */}
                      <div className="flex-1 flex flex-col items-center justify-center gap-1 pt-1">
                        <p className="text-[10px] text-gray-400">{formatDuration(seg.flight_time_in_minutes)}</p>
                        <div className="w-full flex items-center gap-1">
                          <div className="flex-1 h-px bg-gray-300 border-dashed" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <div className="flex-1 h-px bg-gray-300" />
                        </div>
                        <p className="text-[10px] font-mono text-gray-500">
                          {seg.marketing_carrier_code}{seg.marketing_flight_number}
                        </p>
                        {seg.equipment && (
                          <p className="text-[10px] text-gray-400">{seg.equipment}</p>
                        )}
                      </div>

                      {/* Arrival */}
                      <div className="flex flex-col items-center min-w-[54px]">
                        <MdFlightLand size={16} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
                        <p className="text-lg font-black text-gray-900 leading-none">{seg.destination}</p>
                        <p className="text-xs font-semibold text-gray-700 mt-0.5">
                          {date.time(seg.arrival_datetime)}
                        </p>
                        <p className="text-[10px] text-gray-400 text-center">
                          {date.medium(seg.arrival_datetime)}
                        </p>
                        {seg.arrival_terminal && (
                          <p className="text-[10px] text-gray-400 mt-0.5">T{seg.arrival_terminal}</p>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Layover connector */}
                  {si < segs.length - 1 && (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="h-4 w-px bg-gray-200" />
                      <span className="text-[11px] text-gray-400 px-2">
                        {t("layoverAt", { city: seg.destination })}
                      </span>
                      <div className="h-4 w-px bg-gray-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        );
      })}

      {/* ── Passengers ── */}
      <Section title={t("passengers")}>
        <div className="flex flex-col divide-y divide-gray-100">
          {order.passengers.map((p, i) => (
            <div key={p.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiUser size={13} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">
                  {[p.title, p.first_name, p.middle_name, p.last_name].filter(Boolean).join(" ")}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                  <span className="text-xs text-gray-400">
                    {PTYPE[p.passenger_type_code as string] ?? p.passenger_type_code}
                  </span>
                  <span className="text-xs text-gray-400">
                    {p.nationality_country_code}
                  </span>
                  <span className="text-xs text-gray-400">
                    {date.medium(p.birth_date)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                  {p.email && <span className="text-xs text-gray-400">{p.email}</span>}
                  {p.phone && <span className="text-xs text-gray-400 font-mono">{p.phone}</span>}
                </div>
                {p.ticket_number && (
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    🎫 {p.ticket_number}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 shrink-0">{i + 1}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Price Breakdown ── */}
      <Section title={t("priceDetails")}>
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <span>{t("baseFare")}</span>
            <span className="font-medium tabular-nums">{order.base_amount.toLocaleString()} <span className="text-gray-400 text-xs">{order.currency}</span></span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span>{t("taxesAndFees")}</span>
            <span className="font-medium tabular-nums">{order.taxes_amount.toLocaleString()} <span className="text-gray-400 text-xs">{order.currency}</span></span>
          </div>
          {order.service_charge_amount > 0 && (
            <div className="flex items-center justify-between text-gray-600">
              <span>{t("serviceCharge")}</span>
              <span className="font-medium tabular-nums">{order.service_charge_amount.toLocaleString()} <span className="text-gray-400 text-xs">{order.currency}</span></span>
            </div>
          )}
          {order.discount_amount > 0 && (
            <div className="flex items-center justify-between text-green-600">
              <span>{t("discount")}</span>
              <span className="font-medium tabular-nums">- {order.discount_amount.toLocaleString()} <span className="text-green-400 text-xs">{order.currency}</span></span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
            <span className="font-bold text-gray-900">{t("total")}</span>
            <span className="font-bold text-primary tabular-nums text-base">
              {order.total_amount.toLocaleString()} <span className="text-sm">{order.currency}</span>
            </span>
          </div>
        </div>
      </Section>

      {/* ── Payment Transactions ── */}
      {order.payment_transactions.length > 0 && (
        <Section title={t("transactions")}>
          <div className="flex flex-col divide-y divide-gray-100">
            {order.payment_transactions.map((tx) => (
              <div key={tx.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3 flex-wrap">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <BsCreditCard2Front size={13} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 capitalize">{tx.gateway}</p>
                  {tx.paid_at && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {date.dateTime(tx.paid_at)}
                    </p>
                  )}
                </div>
                <TxStatusBadge status={tx.status} labels={paymentStatusLabels} />
                {tx.invoice_url && (
                  <a
                    href={tx.invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity font-medium shrink-0">
                    {t("invoice")}
                    <FiExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

    </div>
  );
};
