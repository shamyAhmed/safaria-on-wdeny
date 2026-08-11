"use client";

import { Modal } from "antd";
import { FaCar } from "react-icons/fa6";
import { FiCalendar, FiExternalLink, FiMapPin, FiUsers } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineLuggage } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { useTranslations } from "next-intl";
import useGetPrivateOrder from "@/app/[locale]/_hooks/useGetPrivateOrder";
import useFormatDate from "@/hooks/useFormatDate";
import { TicketDetailSkeleton } from "@/components/user/my-trips/TicketCardSkeleton";
import {
  TicketStatusBadge,
  orderStatusColor,
  orderStatusKey,
} from "@/components/user/my-trips/TicketStatusBadge";
import { orderPaymentState } from "@/components/user/my-trips/OrderActions";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-5 py-3.5 border-b border-gray-100">
      <h3 className="font-bold text-sm text-gray-700">{title}</h3>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

const Fact = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-400 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[11px] text-gray-400 leading-tight">{label}</p>
      <p className="text-sm text-gray-800 font-medium truncate">{value}</p>
    </div>
  </div>
);

interface PrivateTicketDetailModalProps {
  orderId: number | string | null;
  open: boolean;
  onClose: () => void;
}

export const PrivateTicketDetailModal = ({
  orderId,
  open,
  onClose,
}: PrivateTicketDetailModalProps) => {
  const t = useTranslations("profile.myTrips");
  const tDetail = useTranslations("profile.myTrips.privateDetail");
  const date = useFormatDate();
  const { data: order, isLoading, isError } = useGetPrivateOrder(orderId ?? "");

  const statusKey = order ? orderStatusKey(order.status) : null;
  const payStatus = order?.transaction?.status ?? "";
  const payKey = orderStatusKey(payStatus);
  const vehicle = order?.trip?.vehicle;

  // The gateway link on an unpaid order is its payment page, not a receipt, so
  // it only earns the "invoice" label once the money has landed.
  const isPaid =
    orderPaymentState(payStatus || order?.status || "") === "paid";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      centered
      destroyOnClose
      title={tDetail("pageTitle")}
      classNames={{ body: "!bg-[#F9FAFB] !p-4 sm:!p-5 max-h-[70vh] overflow-y-auto" }}>
      {isLoading ? (
        <TicketDetailSkeleton />
      ) : isError || !order ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <FaCar className="text-3xl text-red-300" />
          </div>
          <p className="text-gray-500 text-sm">{tDetail("errorMessage")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* ── Overview ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FaCar size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base leading-tight">
                    {order.trip?.company?.name ?? "—"}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    #{order.id}
                    {order.rounded ? ` · ${tDetail("roundTrip")}` : ` · ${tDetail("oneWay")}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <TicketStatusBadge
                  label={statusKey ? t(`status.${statusKey}`) : order.status}
                  color={orderStatusColor(order.status)}
                />
                {order.transaction && (
                  <TicketStatusBadge
                    label={payKey ? t(`status.${payKey}`) : payStatus}
                    color={orderStatusColor(payStatus)}
                  />
                )}
              </div>
            </div>
            <div className="px-5 pb-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={12} className="text-gray-400" />
                {tDetail("bookedOn", { date: date.long(order.created_at) })}
              </span>
              {order.trip?.company?.refundability && (
                <span>{tDetail("refundable")}</span>
              )}
            </div>
          </div>

          {/* ── Route ── */}
          <Section title={tDetail("route")}>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin size={13} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400">{tDetail("departure")}</p>
                  <p className="font-semibold text-sm text-gray-800">
                    {order.trip?.from_location?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {date.long(order.departure_date)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FiMapPin size={13} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-400">{tDetail("arrival")}</p>
                  <p className="font-semibold text-sm text-gray-800">
                    {order.trip?.to_location?.name}
                  </p>
                  {order.return_date && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {tDetail("returningOn", { date: date.long(order.return_date) })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Section>

          {/* ── Vehicle ── */}
          {vehicle && (
            <Section title={tDetail("vehicle")}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Fact
                  icon={<FaCar size={15} />}
                  label={tDetail("model")}
                  value={`${vehicle.name} ${vehicle.model} ${vehicle.year}`}
                />
                <Fact
                  icon={<FiUsers size={15} />}
                  label={tDetail("seats")}
                  value={tDetail("seatsCount", { count: vehicle.seats_number })}
                />
                <Fact
                  icon={<TbManualGearbox size={15} />}
                  label={tDetail("gearType")}
                  value={<span className="capitalize">{vehicle.gear_type}</span>}
                />
                <Fact
                  icon={<MdOutlineLuggage size={15} />}
                  label={tDetail("luggage")}
                  value={tDetail("bagsSummary", {
                    big: vehicle.big_bags_count,
                    small: vehicle.small_bags_count,
                  })}
                />
                <Fact
                  icon={<FaCar size={15} />}
                  label={tDetail("category")}
                  value={vehicle.category_name}
                />
              </div>
            </Section>
          )}

          {/* ── Price ── */}
          <Section title={tDetail("priceDetails")}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">{tDetail("total")}</span>
              <span className="font-bold text-primary tabular-nums text-base">
                {Number(order.price).toLocaleString()}{" "}
                <span className="text-sm">{order.currency}</span>
              </span>
            </div>
          </Section>

          {/* ── Payment ── */}
          {order.transaction && (
            <Section title={tDetail("payment")}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <BsCreditCard2Front size={13} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 capitalize">
                    {order.transaction.gateway}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {order.transaction.paid_at
                      ? date.dateTime(order.transaction.paid_at)
                      : date.dateTime(order.transaction.created_at)}
                  </p>
                </div>
                <TicketStatusBadge
                  label={payKey ? t(`status.${payKey}`) : payStatus}
                  color={orderStatusColor(payStatus)}
                />
                {isPaid && order.transaction.invoice_url && (
                  <a
                    href={order.transaction.invoice_url}
                    className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity font-medium shrink-0">
                    {tDetail("gatewayInvoice")}
                    <FiExternalLink size={11} />
                  </a>
                )}
              </div>
            </Section>
          )}
        </div>
      )}
    </Modal>
  );
};
