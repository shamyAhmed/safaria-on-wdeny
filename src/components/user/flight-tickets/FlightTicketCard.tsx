"use client";

import { Button } from "antd";
import { MdFlight, MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import useFormatDate from "@/hooks/useFormatDate";
import {
  TicketStatusBadge as StatusBadge,
  orderStatusColor,
  orderStatusKey,
} from "@/components/user/my-trips/TicketStatusBadge";
import {
  OrderActions,
  orderPaymentState,
} from "@/components/user/my-trips/OrderActions";
import type { FlightOrder, FlightPaymentTransaction } from "@/app/[locale]/_types/FlightOrder";

// ── Card ───────────────────────────────────────────────────────────────────────

interface FlightTicketCardProps {
  order: FlightOrder;
}

export const FlightTicketCard = ({ order }: FlightTicketCardProps) => {
  const router = useRouter();
  const t = useTranslations("profile.myTrips.card");
  const tStatus = useTranslations("profile.myTrips.status");
  const tRefund = useTranslations("airplaneCard");
  const tTimeline = useTranslations("flightModal.timeline");
  const date = useFormatDate();

  const resolvePaymentStatus = (
    transactions: FlightPaymentTransaction[],
  ): { label: string; color: string } | null => {
    if (!transactions.length) return null;
    const paid = transactions.find((tx) => tx.status === "paid");
    if (paid) return { label: t("paymentStatus.paid"), color: "green" };
    const latest = transactions.reduce((a, b) => (b.id > a.id ? b : a));
    const statusMap: Record<string, { label: string; color: string }> = {
      failed:  { label: t("paymentStatus.failed"),  color: "red"    },
      pending: { label: t("paymentStatus.pending"), color: "yellow" },
    };
    return statusMap[latest.status] ?? { label: latest.status, color: "gray" };
  };

  // The API sends `order_status` untranslated ("PendingPayment", "Booked"), so
  // the code is mapped onto a message key and only falls back to the raw string
  // when a status we don't know about turns up.
  const resolveOrderStatus = (o: FlightOrder): { label: string; color: string } => {
    const code = o.order_status ?? o.status ?? "";
    const key = orderStatusKey(code);
    return {
      label: key ? tStatus(key) : code,
      color: orderStatusColor(code),
    };
  };

  const refundabilityLabel = (value: string): string =>
    value === "Refundable"
      ? tRefund("refundable")
      : value === "PartiallyRefundable"
        ? tRefund("partiallyRefundable")
        : tRefund("nonRefundable");

  const orderStatus  = resolveOrderStatus(order);
  const payStatus    = resolvePaymentStatus(order.payment_transactions);
  const isPaid       = order.payment_transactions.some((t) => t.status === "paid");
  const invoiceUrl   = isPaid ? (order.invoice_url ?? order.payment_transactions.find((t) => t.status === "paid")?.invoice_url ?? null) : null;
  const pendingPayUrl = (() => {
    if (!order.payment_transactions.length) return null;
    const latest = order.payment_transactions.reduce((a, b) => (b.id > a.id ? b : a));
    return latest.status === "pending" ? latest.invoice_url : null;
  })();

  // Use first journey for the route summary
  const firstJourney = order.journeys[0];
  const firstSeg     = order.segments[0];
  const lastSeg      = order.segments[order.segments.length - 1];

  const totalMinutes = order.segments.reduce(
    (sum, s) => sum + s.flight_time_in_minutes,
    0,
  );

  const carrierCode  = firstSeg?.marketing_carrier_code ?? "—";
  const flightNumber = firstSeg?.marketing_flight_number ?? "";

  // A cancelled order can still carry a pending transaction, so the order
  // status decides and the payment record only breaks the paid/unpaid tie.
  const paymentState = orderPaymentState(order.order_status ?? order.status)
    === "closed"
    ? "closed"
    : isPaid
      ? "paid"
      : "pending";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <MdFlight size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">
              {carrierCode}{flightNumber && ` · ${flightNumber}`}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">
              {order.airline_pnr || order.ndc_booking_reference}
            </p>
          </div>
        </div>
        <StatusBadge label={orderStatus.label} color={orderStatus.color} />
      </div>

      {/* ── Route row ── */}
      <div className="px-4 py-4 sm:px-5 border-b border-gray-100">
        <div className="flex items-center gap-1 sm:gap-2">

          {/* Departure */}
          <div className="flex flex-col items-center w-[60px] sm:w-auto sm:min-w-[64px]">
            <MdFlightTakeoff size={16} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
            <p className="text-lg sm:text-xl font-black text-gray-900 leading-tight">{firstSeg?.origin ?? firstJourney?.origin ?? "—"}</p>
            <p className="text-xs text-gray-500 font-medium">
              {firstSeg ? date.time(firstSeg.departure_datetime) : "—"}
            </p>
            <p className="text-[10px] text-gray-400 text-center">
              {firstSeg ? date.medium(firstSeg.departure_datetime, { withYear: false }) : ""}
            </p>
          </div>

          {/* Middle line + stops */}
          <div className="flex-1 flex flex-col items-center gap-1 px-1 sm:px-2 min-w-0">
            <p className="text-[10px] text-gray-400 whitespace-nowrap">{tTimeline("durationFormat", { h: Math.floor(totalMinutes / 60), m: totalMinutes % 60 })}</p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              {firstJourney && firstJourney.number_of_stops > 0 ? (
                <div className="flex items-center gap-1">
                  {Array.from({ length: firstJourney.number_of_stops }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  ))}
                </div>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <p className="text-[10px] text-gray-400 whitespace-nowrap">
              {firstJourney
                ? firstJourney.number_of_stops === 0
                  ? t("direct")
                  : `${firstJourney.number_of_stops} ${firstJourney.number_of_stops === 1 ? t("stop") : t("stops")}`
                : ""}
            </p>
          </div>

          {/* Arrival */}
          <div className="flex flex-col items-center w-[60px] sm:w-auto sm:min-w-[64px]">
            <MdFlightLand size={16} className="text-primary mb-0.5 rtl:-scale-x-100 rtl:origin-center" />
            <p className="text-lg sm:text-xl font-black text-gray-900 leading-tight">{lastSeg?.destination ?? firstJourney?.destination ?? "—"}</p>
            <p className="text-xs text-gray-500 font-medium">
              {lastSeg ? date.time(lastSeg.arrival_datetime) : "—"}
            </p>
            <p className="text-[10px] text-gray-400 text-center">
              {lastSeg ? date.medium(lastSeg.arrival_datetime, { withYear: false }) : ""}
            </p>
          </div>

        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-4 py-3 sm:px-5 border-b border-gray-100 flex items-center gap-3 sm:gap-6 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <FiUsers size={14} className="text-gray-400" />
          <span>{order.passengers.length} {order.passengers.length === 1 ? t("passengers.one") : t("passengers.many")}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <span>{order.total_amount.toLocaleString()}</span>
          <span className="text-gray-400 font-normal">{order.currency}</span>
        </div>
        {order.refundability && (
          <span className="text-xs text-gray-400">
            {refundabilityLabel(order.refundability)}
          </span>
        )}
      </div>

      {/* ── Footer: payment + actions ── */}
      <div className="px-4 py-3 sm:px-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60">
        <div className="flex items-center gap-2 flex-wrap">
          <BsCreditCard2Front size={15} className="text-gray-400" />
          <span className="text-xs text-gray-500">{t("paymentLabel")}</span>
          {payStatus ? (
            <StatusBadge label={payStatus.label} color={payStatus.color} />
          ) : (
            <span className="text-xs text-gray-400">{t("noTransactions")}</span>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <OrderActions
            cycle="flights"
            orderId={order.id}
            paymentState={paymentState}
            payUrl={pendingPayUrl}
            invoiceUrl={invoiceUrl}
            departureAt={firstSeg?.departure_datetime}
          />
          <Button
            size="small"
            className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold"
            onClick={() => router.push(`/user/my-trips/${order.id}`)}>
            {t("actions.details")}
          </Button>
        </div>
      </div>

    </div>
  );
};
