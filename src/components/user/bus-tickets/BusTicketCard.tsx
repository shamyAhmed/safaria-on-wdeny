"use client";

import { Button } from "antd";
import Image from "next/image";
import { MdDirectionsBus } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { useTranslations } from "next-intl";
import useFormatDate from "@/hooks/useFormatDate";
import {
  TicketStatusBadge,
  orderStatusColor,
  orderStatusKey,
} from "@/components/user/my-trips/TicketStatusBadge";
import type { BusOrder } from "@/app/[locale]/_types/BusOrder";

/** "2026-08-20 05:45 am" — the station stamps are not ISO, so split them. */
const stationTime = (arrivalAt?: string) =>
  arrivalAt?.split(" ").slice(1).join(" ").toUpperCase() ?? "";

interface BusTicketCardProps {
  order: BusOrder;
  onShowDetails: (order: BusOrder) => void;
}

export const BusTicketCard = ({ order, onShowDetails }: BusTicketCardProps) => {
  const t = useTranslations("profile.myTrips");
  const tCard = useTranslations("profile.myTrips.card");
  const date = useFormatDate();

  const statusCode = order.status_code ?? "";
  const statusKey = orderStatusKey(statusCode);
  const statusLabel = statusKey ? t(`status.${statusKey}`) : order.status ?? "";

  const payCode = order.payment_data?.status_code ?? "";
  const payKey = orderStatusKey(payCode);
  const payLabel = payKey ? t(`status.${payKey}`) : order.payment_data?.status;

  const seats = order.tickets ?? [];
  const gatewayUrl = order.payment_data?.invoice_url;
  const isCancelled = statusCode.toLowerCase().includes("cancel");
  const logo = order.company_data?.avatar;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
            {logo ? (
              <Image
                src={logo}
                alt={order.company_name ?? ""}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <MdDirectionsBus size={18} className="text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">
              {order.company_name ?? order.gateway_id}
              {order.category && (
                <span className="text-gray-400 font-normal"> · {order.category}</span>
              )}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">
              {order.number ?? order.id}
            </p>
          </div>
        </div>
        <TicketStatusBadge
          label={statusLabel}
          color={orderStatusColor(statusCode)}
        />
      </div>

      {/* ── Route row ── */}
      <div className="px-4 py-4 sm:px-5 border-b border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center min-w-0 flex-1">
            <FiMapPin size={14} className="text-primary mb-1" />
            <p className="text-sm font-black text-gray-900 leading-tight truncate max-w-full">
              {order.station_from?.city_name ?? "—"}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-full">
              {order.station_from?.name}
            </p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">
              {stationTime(order.station_from?.arrival_at)}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 px-1 shrink-0">
            <p className="text-[10px] text-gray-400 whitespace-nowrap">
              {date.medium(order.date)}
            </p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              <MdDirectionsBus size={14} className="text-primary rtl:-scale-x-100" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          <div className="flex flex-col items-center min-w-0 flex-1">
            <FiMapPin size={14} className="text-primary mb-1" />
            <p className="text-sm font-black text-gray-900 leading-tight truncate max-w-full">
              {order.station_to?.city_name ?? "—"}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-full">
              {order.station_to?.name}
            </p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">
              {stationTime(order.station_to?.arrival_at)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-4 py-3 sm:px-5 border-b border-gray-100 flex items-center gap-3 sm:gap-6 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <span className="text-gray-400">{tCard("seats")}</span>
          <span className="font-semibold">
            {seats.map((s) => s.seat_number).join(", ") || "—"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          {order.total}
        </div>
      </div>

      {/* ── Footer: payment + actions ── */}
      <div className="px-4 py-3 sm:px-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60">
        <div className="flex items-center gap-2 flex-wrap">
          <BsCreditCard2Front size={15} className="text-gray-400" />
          <span className="text-xs text-gray-500">{tCard("paymentLabel")}</span>
          {payLabel ? (
            <TicketStatusBadge
              label={payLabel}
              color={orderStatusColor(payCode)}
            />
          ) : (
            <span className="text-xs text-gray-400">{tCard("noTransactions")}</span>
          )}
          {!isCancelled && payCode.toLowerCase() === "pending" && gatewayUrl && (
            <a href={gatewayUrl}>
              <Button
                size="small"
                type="primary"
                className="!rounded-lg !h-7 !px-3 !text-xs !font-semibold">
                {tCard("actions.pay")}
              </Button>
            </a>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {order.invoice_url && (
            <a href={order.invoice_url} target="_blank" rel="noopener noreferrer">
              <Button
                size="small"
                className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold">
                {tCard("actions.invoice")}
              </Button>
            </a>
          )}
          <Button
            size="small"
            className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold"
            onClick={() => onShowDetails(order)}>
            {tCard("actions.details")}
          </Button>
        </div>
      </div>
    </div>
  );
};
