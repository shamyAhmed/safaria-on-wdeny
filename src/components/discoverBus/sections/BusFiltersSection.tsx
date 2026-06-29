"use client";

import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { BusCheckboxFilter } from "./filter-section/BusCheckboxFilter";
import { PriceRangeFilter } from "@/components/discoverAirplan/sections/filter-section/PriceRangeFilter";
import { useBusFiltersContext } from "../context/BusFiltersContext";

const PanelHeader = ({ title }: { title: string }) => (
  <span className="font-medium text-base text-primary">{title}</span>
);

interface BusFiltersSectionProps {
  companyOptions: string[];
  fromStationOptions: string[];
  toStationOptions: string[];
  minPrice?: number;
  maxPrice?: number;
}

export const BusFiltersSection = ({
  companyOptions,
  fromStationOptions,
  toStationOptions,
  minPrice,
  maxPrice,
}: BusFiltersSectionProps) => {
  const { filters, onChange } = useBusFiltersContext();

  const items: CollapseProps["items"] = [
    {
      key: "companies",
      label: <PanelHeader title="الشركات" />,
      children: (
        <BusCheckboxFilter
          options={companyOptions}
          selected={filters.companies}
          onChange={(v) => onChange("companies", v)}
        />
      ),
    },
    {
      key: "toStations",
      label: <PanelHeader title="محطات الوصول" />,
      children: (
        <BusCheckboxFilter
          options={toStationOptions}
          selected={filters.toStations}
          onChange={(v) => onChange("toStations", v)}
        />
      ),
    },
    {
      key: "fromStations",
      label: <PanelHeader title="محطات المغادرة" />,
      children: (
        <BusCheckboxFilter
          options={fromStationOptions}
          selected={filters.fromStations}
          onChange={(v) => onChange("fromStations", v)}
        />
      ),
    },
    {
      key: "price",
      label: <PanelHeader title="نطاق الأسعار" />,
      children: (
        <PriceRangeFilter
          fromLabel="من"
          toLabel="إلى"
          min={minPrice}
          max={maxPrice || 1000}
          onChange={(from, to) => onChange("priceRange", { from, to })}
        />
      ),
    },
  ];

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["companies", "toStations", "fromStations", "price"]}
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
