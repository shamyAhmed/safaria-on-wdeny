"use client";

import { Modal, Button } from "antd";
import Image from "next/image";
import { MdDirectionsBus } from "react-icons/md";
import { FiCalendar, FiExternalLink, FiMapPin } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { useTranslations } from "next-intl";
import useGetBusOrder from "@/app/[locale]/_hooks/useGetBusOrder";
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

const Money = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center justify-between text-gray-600 text-sm">
    <span>{label}</span>
    <span className="font-medium tabular-nums">{value ?? "—"}</span>
  </div>
);

/** "2026-08-20 05:45 am" → the clock half, uppercased. */
const stationTime = (arrivalAt?: string) =>
  arrivalAt?.split(" ").slice(1).join(" ").toUpperCase() ?? "";

interface BusTicketDetailModalProps {
  orderId: number | string | null;
  open: boolean;
  onClose: () => void;
}

export const BusTicketDetailModal = ({
  orderId,
  open,
  onClose,
}: BusTicketDetailModalProps) => {
  const t = useTranslations("profile.myTrips");
  const tDetail = useTranslations("profile.myTrips.busDetail");
  const tCard = useTranslations("profile.myTrips.card");
  const date = useFormatDate();
  const { data: order, isLoading, isError } = useGetBusOrder(orderId ?? "");

  const statusCode = order?.status_code ?? "";
  const statusKey = orderStatusKey(statusCode);
  const payCode = order?.payment_data?.status_code ?? "";
  const payKey = orderStatusKey(payCode);

  // An unpaid order still carries invoice links — the gateway one is really its
  // payment page — so neither is worth offering until the money has landed.
  const isPaid = orderPaymentState(payCode || statusCode) === "paid";

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
            <MdDirectionsBus className="text-3xl text-red-300" />
          </div>
          <p className="text-gray-500 text-sm">{tDetail("errorMessage")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* ── Overview ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                  {order.company_data?.avatar ? (
                    <Image
                      src={order.company_data.avatar}
                      alt={order.company_name ?? ""}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  ) : (
                    <MdDirectionsBus size={22} className="text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base leading-tight">
                    {order.company_name ?? order.gateway_id}
                  </p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    {order.number ?? order.id}
                    {order.category && ` · ${order.category}`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <TicketStatusBadge
                  label={statusKey ? t(`status.${statusKey}`) : order.status ?? ""}
                  color={orderStatusColor(statusCode)}
                />
                {order.payment_data?.status && (
                  <TicketStatusBadge
                    label={payKey ? t(`status.${payKey}`) : order.payment_data.status}
                    color={orderStatusColor(payCode)}
                  />
                )}
              </div>
            </div>
            <div className="px-5 pb-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <FiCalendar size={12} className="text-gray-400" />
                {date.long(order.date)}
              </span>
              {order.tickets?.length ? (
                <span>
                  {tDetail("seatCount", { count: order.tickets.length })}
                </span>
              ) : null}
            </div>
          </div>

          {/* ── Route ── */}
          <Section title={tDetail("route")}>
            <div className="flex flex-col gap-0">
              {[order.station_from, order.station_to].map((station, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <FiMapPin size={13} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-400">
                        {i === 0 ? tDetail("departure") : tDetail("arrival")}
                      </p>
                      <p className="font-semibold text-sm text-gray-800">
                        {station?.city_name} — {station?.name}
                      </p>
                    </div>
                    <div className="text-end shrink-0">
                      <p className="text-sm font-bold text-gray-800">
                        {stationTime(station?.arrival_at)}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {date.medium(station?.arrival_at?.split(" ")[0])}
                      </p>
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="flex items-center gap-2 py-2 ps-4">
                      <div className="h-6 w-px bg-gray-200" />
                      <MdDirectionsBus
                        size={14}
                        className="text-gray-300 rtl:-scale-x-100"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* ── Seats ── */}
          {!!order.tickets?.length && (
            <Section title={tDetail("seats")}>
              <div className="flex flex-col divide-y divide-gray-100">
                {order.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {tDetail("seatNumber", { number: ticket.seat_number })}
                    </span>
                    <span className="text-sm font-medium tabular-nums text-gray-800">
                      {ticket.price} {order.currency}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ── Price breakdown ── */}
          <Section title={tDetail("priceDetails")}>
            <div className="flex flex-col gap-2.5">
              <Money
                label={tDetail("ticketsTotal")}
                value={order.original_tickets_totals}
              />
              {order.discount && (
                <Money label={tDetail("discount")} value={order.discount} />
              )}
              {order.wallet_discount && (
                <Money
                  label={tDetail("walletDiscount")}
                  value={order.wallet_discount}
                />
              )}
              {order.payment_fees && (
                <Money label={tDetail("paymentFees")} value={order.payment_fees} />
              )}
              <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
                <span className="font-bold text-gray-900">{tDetail("total")}</span>
                <span className="font-bold text-primary tabular-nums text-base">
                  {order.total}
                </span>
              </div>
            </div>
          </Section>

          {/* ── Payment ── */}
          <Section title={tDetail("payment")}>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <BsCreditCard2Front size={13} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 capitalize">
                  {order.payment_data?.gateway || tDetail("noGateway")}
                </p>
              </div>
              {order.payment_data?.status && (
                <TicketStatusBadge
                  label={payKey ? t(`status.${payKey}`) : order.payment_data.status}
                  color={orderStatusColor(payCode)}
                />
              )}
              {isPaid && order.payment_data?.invoice_url && (
                <a
                  href={order.payment_data.invoice_url}
                  className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity font-medium shrink-0">
                  {tDetail("gatewayInvoice")}
                  <FiExternalLink size={11} />
                </a>
              )}
            </div>
          </Section>

          {isPaid && order.invoice_url && (
            <div className="flex justify-end">
              <a href={order.invoice_url} target="_blank" rel="noopener noreferrer">
                <Button className="!rounded-full !h-10 !px-6 !font-semibold">
                  {tCard("actions.invoice")}
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};
