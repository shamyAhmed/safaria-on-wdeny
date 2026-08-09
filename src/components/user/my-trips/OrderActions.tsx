"use client";

import { Button, Popconfirm } from "antd";
import { FiPrinter, FiXCircle } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useCancelOrder from "@/app/[locale]/_hooks/useCancelOrder";
import type { OrderCycle } from "@/lib/apiRoutes";

/** What the card is allowed to offer, derived from the payment status. */
export type OrderPaymentState = "pending" | "paid" | "closed";

/**
 * The API's status strings differ per cycle but all carry the same three
 * outcomes; `closed` covers cancelled, expired and failed orders, which get no
 * actions at all.
 */
export const orderPaymentState = (
  code: string | null | undefined,
): OrderPaymentState => {
  const s = (code ?? "").toLowerCase();
  if (s.includes("cancel") || s.includes("expire") || s.includes("fail"))
    return "closed";
  if (s.includes("paid") || s.includes("complete") || s.includes("confirm"))
    return "paid";
  if (s.includes("pending") || s.includes("hold") || s.includes("book"))
    return "pending";
  return "closed";
};

dayjs.extend(customParseFormat);

/** Buses stamp departures as "2026-08-20 12:01 AM", which ISO parsing rejects. */
const BUS_STAMP = "YYYY-MM-DD hh:mm A";

/**
 * True once the outbound leg is under way — cancelling past that point is off
 * the table. An unparseable or missing stamp reads as "not yet", leaving the
 * final say to the API rather than hiding the button on a formatting quirk.
 */
export const journeyHasBegun = (departure: string | null | undefined) => {
  if (!departure) return false;
  const parsed = dayjs(departure).isValid()
    ? dayjs(departure)
    : dayjs(departure, BUS_STAMP);
  return parsed.isValid() ? parsed.isBefore(dayjs()) : false;
};

type OrderActionsProps = {
  cycle: OrderCycle;
  orderId: number | string;
  paymentState: OrderPaymentState;
  /** Gateway page for an unpaid order. */
  payUrl?: string | null;
  /** Printable invoice for a paid one. */
  invoiceUrl?: string | null;
  /** Departure stamp of the first leg. */
  departureAt?: string | null;
  /** The API's own verdict where it sends one (`can_be_cancel`). */
  canCancel?: boolean;
};

/**
 * At most two buttons, chosen by payment status:
 *   pending → pay + cancel
 *   paid    → print invoice, plus cancel while the journey has not begun
 *   closed  → none
 */
export const OrderActions = ({
  cycle,
  orderId,
  paymentState,
  payUrl,
  invoiceUrl,
  departureAt,
  canCancel = true,
}: OrderActionsProps) => {
  const t = useTranslations("profile.myTrips.card.actions");
  const tCancel = useTranslations("profile.myTrips.card.cancel");
  const { mutate: cancelOrder, isPending: cancelling } = useCancelOrder(cycle);

  if (paymentState === "closed") return null;

  const showCancel =
    canCancel &&
    (paymentState === "pending" || !journeyHasBegun(departureAt));

  const cancelButton = showCancel ? (
    <Popconfirm
      title={tCancel("confirmTitle")}
      description={tCancel("confirmDescription")}
      okText={tCancel("confirmOk")}
      cancelText={tCancel("confirmCancel")}
      okButtonProps={{ danger: true, loading: cancelling }}
      onConfirm={() => cancelOrder(orderId)}>
      <Button
        size="small"
        danger
        loading={cancelling}
        icon={<FiXCircle size={13} />}
        className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold">
        {t("cancel")}
      </Button>
    </Popconfirm>
  ) : null;

  const primaryButton =
    paymentState === "pending" ? (
      payUrl ? (
        <a href={payUrl}>
          <Button
            size="small"
            type="primary"
            icon={<BsCreditCard2Front size={13} />}
            className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold">
            {t("pay")}
          </Button>
        </a>
      ) : null
    ) : invoiceUrl ? (
      <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
        <Button
          size="small"
          icon={<FiPrinter size={13} />}
          className="!rounded-lg !h-8 !px-4 !text-xs !font-semibold">
          {t("printInvoice")}
        </Button>
      </a>
    ) : null;

  if (!primaryButton && !cancelButton) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {primaryButton}
      {cancelButton}
    </div>
  );
};
