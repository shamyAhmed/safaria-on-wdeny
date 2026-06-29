"use client";

import { Button } from "antd";
import { FaShare } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { MdDirectionsCar } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import type { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export const PrivateCard = ({ trip }: { trip: PrivateTrip }) => {
  const t = useTranslations("discoverPrivate.card");
  const currency = useSelector((state: RootState) => state.currency.selected);
  const router = useRouter();
  const searchParams = useSearchParams();

  const v = trip.vehicle;
  const vehicleImage = v.featured_url;
  const vehicleLabel = v.category_name || v.name;

  // Build feature pills from real vehicle specs.
  const features: string[] = [];
  if (v.category_name) features.push(v.category_name);
  if (v.seats_number) features.push(t("features.seats", { count: v.seats_number }));
  if (v.model || v.year) features.push([v.model, v.year].filter(Boolean).join(" "));
  if (v.gear_type) features.push(v.gear_type);
  if (v.big_bags_count) features.push(t("features.bigBags", { count: v.big_bags_count }));
  if (v.small_bags_count) features.push(t("features.smallBag", { count: v.small_bags_count }));

  const handleBook = () => {
    const query = new URLSearchParams();
    const forward = ["from_lat", "from_lng", "to_lat", "to_lng", "rounded"];
    forward.forEach((key) => {
      const val = searchParams.get(key);
      if (val) query.set(key, val);
    });
    router.push(`/discover-private/${trip.id}?${query.toString()}`);
  };

  return (
    <div className="w-full bg-red-50 rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-[18px] py-[24px]">
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        {/* 1 ── Vehicle image ─────────────────────────────────────────────── */}
        <div className="relative shrink-0 w-full lg:w-[20%] lg:min-w-[185px] h-[250px] sm:h-[400px] md:h-[300px] lg:h-[350px] xl:h-auto self-stretch rounded-[12px] overflow-hidden bg-[#F7F7F7]">
          {vehicleImage ? (
            <Image
              src={vehicleImage}
              alt={v.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <MdDirectionsCar size={56} />
            </div>
          )}
        </div>

        {/* 2+3 ── Info + Price (always horizontal) ───────────────────────── */}
        <div className="flex-1 flex flex-col sm:flex-row gap-5 min-w-0 w-full">
          {/* 2 ── Journey information */}
          <div className="flex-1 flex flex-col justify-between gap-5 min-w-0">
            {/* Company info */}
            <div className="flex items-center gap-3">
              <div className="relative w-[50px] h-[50px] shrink-0 rounded-full overflow-hidden border border-gray-100 bg-[#F7F7F7]">
                {trip.company.logo_url ? (
                  <Image
                    src={trip.company.logo_url}
                    alt={trip.company.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MdDirectionsCar size={22} className="text-gray-300" />
                  </div>
                )}
              </div>
              <p className="font-bold text-base text-gray-900">
                {trip.company.name}
              </p>
              <span className="ms-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg shrink-0">
                {vehicleLabel}
              </span>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">
                  <BsCheckCircleFill size={14} className="text-gray-400 shrink-0" />
                  {f}
                </span>
              ))}
            </div>

            {/* Route */}
            <div className="flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
                {trip.from_location.name}
              </span>
              <FaChevronLeft size={12} className="text-gray-300 rtl:rotate-180" />
              <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
                {trip.to_location.name}
              </span>
            </div>
          </div>

          {/* 3 ── Price panel ────────────────────────────────────────────────── */}
          <div className="shrink-0 flex flex-col justify-between items-center gap-4 border border-gray-200 bg-white rounded-xl px-[12px] py-[16px] text-center space-y-4 min-w-[20%]">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">
                {t("tripPrice")}
              </p>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                <span className="text-xl font-semibold text-primary leading-none">
                  {trip.go_price}
                </span>
                <span className="text-xs text-gray-400 leading-tight whitespace-nowrap">
                  {currency?.name ?? currency?.code ?? ""}
                </span>
              </div>
              {trip.rounded && Number(trip.round_price) > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  {t("roundTripPrice", {
                    price: trip.round_price,
                    currency: currency?.code ?? "",
                  })}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="primary"
                className="!w-full !h-[44px] !rounded-xl !font-bold !text-sm flex items-center justify-center gap-2"
                onClick={handleBook}>
                <FaChevronLeft size={12} className="rtl:rotate-180" />
                {t("bookNow")}
              </Button>

              <div className="flex items-center gap-[8px] mt-1">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-full p-[10px]">
                  <IoInformationCircleOutline size={16} />
                  {t("details")}
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-full p-[10px]">
                  <FaShare size={13} />
                  {t("share")}
                </button>
              </div>
            </div>

            {trip.status && (
              <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                {t("available")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
