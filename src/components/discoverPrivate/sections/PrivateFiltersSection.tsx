"use client";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { FaChevronDown } from "react-icons/fa6";
import { useTranslations } from "next-intl";

const FilterPanelHeader = ({ title }: { title: string }) => (
  <span className="font-medium text-base text-primary">{title}</span>
);

export const PrivateFiltersSection = () => {
  const t = useTranslations("discoverPrivate.filters");
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <FilterPanelHeader title={t("carType")} />,
      children: (
        <div className="py-2 text-sm text-gray-400">{t("comingSoon")}</div>
      ),
    },
    {
      key: "2",
      label: <FilterPanelHeader title={t("priceRange")} />,
      children: (
        <div className="py-2 text-sm text-gray-400">{t("comingSoon")}</div>
      ),
    },
    {
      key: "3",
      label: <FilterPanelHeader title={t("passengersCount")} />,
      children: (
        <div className="py-2 text-sm text-gray-400">{t("comingSoon")}</div>
      ),
    },
  ];

  return (
    <div className="airplane-filters">
      <Collapse
        defaultActiveKey={["1", "2", "3"]}
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
