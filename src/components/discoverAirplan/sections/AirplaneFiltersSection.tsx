"use client";
import { Checkbox, Collapse } from "antd";
import type { CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BookingClassFilter } from "./filter-section/BookingClassFilter";
import { PriceRangeFilter } from "./filter-section/PriceRangeFilter";
import type { CarrierOption } from "../DiscoverAirplanComponent";

const FilterPanelHeader = ({ title }: { title: string }) => (
  <span className="font-medium text-base text-primary">{title}</span>
);

interface AirplaneFiltersSectionProps {
  onPriceRangeChange: (from: number | null, to: number | null) => void;
  minPrice?: number;
  maxPrice?: number;
  directFlightsOnly: boolean;
  refundableOnly: boolean;
  onDirectFlightsOnlyChange: (value: boolean) => void;
  onRefundableOnlyChange: (value: boolean) => void;
  carriers: CarrierOption[];
  selectedCarriers: string[];
  onCarriersChange: (codes: string[]) => void;
}

export const AirplaneFiltersSection = ({
  onPriceRangeChange,
  minPrice,
  maxPrice,
  directFlightsOnly,
  refundableOnly,
  onDirectFlightsOnlyChange,
  onRefundableOnlyChange,
  carriers,
  selectedCarriers,
  onCarriersChange,
}: AirplaneFiltersSectionProps) => {
  const t = useTranslations("discoverAirplaneFilters");

  const toggleCarrier = (code: string, checked: boolean) => {
    if (checked) {
      onCarriersChange([...selectedCarriers, code]);
    } else {
      onCarriersChange(selectedCarriers.filter((c) => c !== code));
    }
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <FilterPanelHeader title={t("panels.bookingClass.title")} />,
      children: (
        <BookingClassFilter
          searchPlaceholder={t("common.searchPlaceholder")}
          options={[
            t("panels.bookingClass.options.economy"),
            t("panels.bookingClass.options.premiumEconomy"),
            t("panels.bookingClass.options.business"),
            t("panels.bookingClass.options.first"),
          ]}
        />
      ),
    },
    {
      key: "2",
      label: <FilterPanelHeader title={t("panels.priceRange.title")} />,
      children: (
        <PriceRangeFilter
          fromLabel={t("panels.priceRange.from")}
          toLabel={t("panels.priceRange.to")}
          min={minPrice}
          max={maxPrice}
          onChange={onPriceRangeChange}
        />
      ),
    },
    {
      key: "3",
      label: <FilterPanelHeader title={t("panels.flightOptions.title")} />,
      children: (
        <div className="flex flex-col gap-1 pb-2">
          <label className="flex items-center gap-3 py-2 px-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Checkbox
              checked={directFlightsOnly}
              onChange={(e) => onDirectFlightsOnlyChange(e.target.checked)}
            />
            <span className="text-sm text-gray-700 font-medium">
              {t("panels.flightOptions.directOnly")}
            </span>
          </label>
          <label className="flex items-center gap-3 py-2 px-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <Checkbox
              checked={refundableOnly}
              onChange={(e) => onRefundableOnlyChange(e.target.checked)}
            />
            <span className="text-sm text-gray-700 font-medium">
              {t("panels.flightOptions.refundableOnly")}
            </span>
          </label>
        </div>
      ),
    },
    ...(carriers.length > 0
      ? [
          {
            key: "4",
            label: <FilterPanelHeader title={t("panels.airlines.title")} />,
            children: (
              <div className="flex flex-col gap-1 pb-2 max-h-56 overflow-y-auto pe-1">
                {carriers.map((carrier) => (
                  <label
                    key={carrier.code}
                    className="flex items-center gap-3 py-2 px-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={selectedCarriers.includes(carrier.code)}
                      onChange={(e) => toggleCarrier(carrier.code, e.target.checked)}
                    />
                    <Image
                      src={`https://pics.avs.io/32/32/${carrier.code}.png`}
                      alt={carrier.name}
                      width={8}
                      height={8}
                      className="rounded-sm object-contain shrink-0"
                      unoptimized
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-gray-700 font-medium leading-tight truncate">
                        {carrier.name}
                      </span>
                      <span className="text-xs text-gray-400 leading-tight">
                        {carrier.code}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2", "3", "4"]}
        ghost
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <FaChevronDown
            className={`!text-primary transition-transform ${isActive ? "!rotate-180" : "!rotate-0"}`}
          />
        )}
        items={items}
      />
    </div>
  );
};
