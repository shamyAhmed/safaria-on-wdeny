"use client";
import { useLocale } from "next-intl";
import { SARIcon } from "@/components/common/SARIcon";

interface CurrencyLabelProps {
  currency: string;
  className?: string;
  color?: string;
  size?: number;
}

export const CurrencyLabel = ({ currency, className = "", color = "#231f20", size = 16 }: CurrencyLabelProps) => {
  const locale = useLocale();

  if (currency === "SAR" && locale === "ar") {
    return (
      <SARIcon
        size={size}
        color={color}
        className={`inline-block align-middle ${className}`}
      />
    );
  }
  return <span className={className}>{currency}</span>;
};
