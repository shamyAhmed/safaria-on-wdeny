"use client";

import { Button } from "antd";
import { FaCar } from "react-icons/fa6";
import { FiMapPin, FiUsers } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { useTranslations } from "next-intl";
import useFormatDate from "@/hooks/useFormatDate";
import {
  TicketStatusBadge,
  orderStatusColor,
  orderStatusKey,
} from "@/components/user/my-trips/TicketStatusBadge";
import {
  OrderActions,
  orderPaymentState,
} from "@/components/user/my-trips/OrderActions";
import type { PrivateOrder } from "@/app/[locale]/_types/PrivateOrder";

interface PrivateTicketCardProps {
  order: PrivateOrder;
  onShowDetails: (order: PrivateOrder) => void;
}

export const PrivateTicketCard = ({
  order,
  onShowDetails,
}: PrivateTicketCardProps) => {
  const t = useTranslations("profile.myTrips");
  const tCard = useTranslations("profile.myTrips.card");
  const tDetail = useTranslations("profile.myTrips.privateDetail");
  const date = useFormatDate();

  const statusKey = orderStatusKey(order.status);
  const payStatus = order.transaction?.status ?? "";
  const payKey = orderStatusKey(payStatus);
  const vehicle = order.trip?.vehicle;

  // The order status settles a cancellation; otherwise the transaction says
  // whether it is still waiting to be paid.
  const paymentState = order.status.toLowerCase().includes("cancel")
    ? "closed"
    : orderPaymentState(payStatus || order.status);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FaCar size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight truncate">
              {order.trip?.company?.name ?? "—"}
              {vehicle?.category_name && (
                <span className="text-gray-400 font-normal">
                  {" "}
                  · {vehicle.category_name}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono truncate">
              #{order.id}
              {order.rounded && ` · ${tDetail("roundTrip")}`}
            </p>
          </div>
        </div>
        <TicketStatusBadge
          label={statusKey ? t(`status.${statusKey}`) : order.status}
          color={orderStatusColor(order.status)}
        />
      </div>

      {/* ── Route row ── */}
      <div className="px-4 py-4 sm:px-5 border-b border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center min-w-0 flex-1">
            <FiMapPin size={14} className="text-primary mb-1" />
            <p className="text-sm font-black text-gray-900 leading-tight truncate max-w-full">
              {order.trip?.from_location?.name ?? "—"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {date.medium(order.departure_date)}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 px-1 shrink-0">
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              <FaCar size={13} className="text-primary rtl:-scale-x-100" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>

          <div className="flex flex-col items-center min-w-0 flex-1">
            <FiMapPin size={14} className="text-primary mb-1" />
            <p className="text-sm font-black text-gray-900 leading-tight truncate max-w-full">
              {order.trip?.to_location?.name ?? "—"}
            </p>
            {order.return_date && (
              <p className="text-xs text-gray-500 mt-0.5">
                {date.medium(order.return_date)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="px-4 py-3 sm:px-5 border-b border-gray-100 flex items-center gap-3 sm:gap-5 flex-wrap">
        {vehicle?.seats_number != null && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <FiUsers size={14} className="text-gray-400" />
            <span>{tDetail("seatsCount", { count: vehicle.seats_number })}</span>
          </div>
        )}
        {vehicle?.gear_type && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <TbManualGearbox size={15} className="text-gray-400" />
            <span className="capitalize">{vehicle.gear_type}</span>
          </div>
        )}
        {vehicle?.big_bags_count != null && (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MdOutlineLuggage size={15} className="text-gray-400" />
            <span>
              {tDetail("bagsSummary", {
                big: vehicle.big_bags_count,
                small: vehicle.small_bags_count,
              })}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
          <span>{Number(order.price).toLocaleString()}</span>
          <span className="text-gray-400 font-normal">{order.currency}</span>
        </div>
      </div>

      {/* ── Footer: payment + actions ── */}
      <div className="px-4 py-3 sm:px-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60">
        <div className="flex items-center gap-2 flex-wrap">
          <BsCreditCard2Front size={15} className="text-gray-400" />
          <span className="text-xs text-gray-500">{tCard("paymentLabel")}</span>
          {order.transaction ? (
            <TicketStatusBadge
              label={payKey ? t(`status.${payKey}`) : payStatus}
              color={orderStatusColor(payStatus)}
            />
          ) : (
            <span className="text-xs text-gray-400">{tCard("noTransactions")}</span>
          )}
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <OrderActions
            cycle="private"
            orderId={order.id}
            paymentState={paymentState}
            payUrl={order.transaction?.invoice_url}
            invoiceUrl={order.transaction?.invoice_url}
            departureAt={order.departure_date}
            canCancel={order.can_be_cancel ?? true}
          />
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
