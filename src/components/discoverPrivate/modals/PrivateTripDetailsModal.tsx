"use client";

import { Modal } from "antd";
import Image from "next/image";
import { FaCar } from "react-icons/fa6";
import { FiMapPin, FiUsers } from "react-icons/fi";
import { MdOutlineLuggage } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import type { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";
import type { RootState } from "@/store/appStore";

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

interface PrivateTripDetailsModalProps {
  trip: PrivateTrip;
  open: boolean;
  onClose: () => void;
}

/**
 * Everything the search result already carries but the card has no room for —
 * chiefly the operator's refund policy. Reads the trip it is given, so opening
 * it costs no request.
 */
export const PrivateTripDetailsModal = ({
  trip,
  open,
  onClose,
}: PrivateTripDetailsModalProps) => {
  const t = useTranslations("discoverPrivate.detailsModal");
  const currency = useSelector((state: RootState) => state.currency.selected);
  const currencyLabel = currency?.code ?? "";

  const v = trip.vehicle;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      centered
      destroyOnClose
      title={t("title")}
      classNames={{
        body: "!bg-[#F9FAFB] !p-4 sm:!p-5 max-h-[70vh] overflow-y-auto",
      }}>
      <div className="flex flex-col gap-5">
        {/* ── Operator ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0 rounded-xl overflow-hidden bg-primary/10">
            {trip.company.logo_url ? (
              <Image
                src={trip.company.logo_url}
                alt={trip.company.name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center">
                <FaCar size={18} className="text-primary" />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-base leading-tight">
              {trip.company.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {v.category_name || v.name}
            </p>
          </div>
        </div>

        {/* ── Route ── */}
        <Section title={t("route")}>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiMapPin size={13} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">{t("departure")}</p>
                <p className="font-semibold text-sm text-gray-800">
                  {trip.from_location.name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiMapPin size={13} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400">{t("arrival")}</p>
                <p className="font-semibold text-sm text-gray-800">
                  {trip.to_location.name}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Vehicle ── */}
        <Section title={t("vehicle")}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Fact
              icon={<FaCar size={15} />}
              label={t("model")}
              value={[v.name, v.model, v.year].filter(Boolean).join(" ")}
            />
            {v.seats_number > 0 && (
              <Fact
                icon={<FiUsers size={15} />}
                label={t("seats")}
                value={t("seatsCount", { count: v.seats_number })}
              />
            )}
            {v.gear_type && (
              <Fact
                icon={<TbManualGearbox size={15} />}
                label={t("gearType")}
                value={<span className="capitalize">{v.gear_type}</span>}
              />
            )}
            <Fact
              icon={<MdOutlineLuggage size={15} />}
              label={t("luggage")}
              value={t("bagsSummary", {
                big: v.big_bags_count,
                small: v.small_bags_count,
              })}
            />
            {v.category_name && (
              <Fact
                icon={<FaCar size={15} />}
                label={t("category")}
                value={v.category_name}
              />
            )}
          </div>
        </Section>

        {/* ── Price ── */}
        <Section title={t("price")}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t("oneWay")}</span>
              <span className="font-bold text-primary tabular-nums">
                {trip.go_price} <span className="text-xs">{currencyLabel}</span>
              </span>
            </div>
            {trip.rounded && Number(trip.round_price) > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t("roundTrip")}</span>
                <span className="font-bold text-primary tabular-nums">
                  {trip.round_price}{" "}
                  <span className="text-xs">{currencyLabel}</span>
                </span>
              </div>
            )}
          </div>
        </Section>

        {/* ── Refund policy ── */}
        <Section title={t("refundPolicy")}>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {trip.company.refundability
              ? trip.company.refund_policy || t("refundableNoPolicy")
              : t("nonRefundable")}
          </p>
        </Section>
      </div>
    </Modal>
  );
};
