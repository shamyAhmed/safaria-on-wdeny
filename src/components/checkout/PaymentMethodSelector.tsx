"use client";

import { useEffect } from "react";
import { Skeleton } from "antd";
import { BsCreditCard2Front } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useGetWallet } from "@/hooks/auth/useGetWallet";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";
import type { PaymentMethod } from "@/app/[locale]/_hooks/usePayOrder";

/**
 * Reads the wallet balance and says whether it covers `total`.
 *
 * Kept separate from the selector so a checkout page can also gate its submit
 * handler on the same answer instead of trusting the radio state alone.
 */
export const useWalletAffordability = (total: number) => {
  const { wallet, isLoading } = useGetWallet();
  const balance = Number.parseFloat(wallet?.[0]?.balance ?? "0") || 0;

  return {
    balance,
    isLoading,
    canPayWithWallet: total > 0 && balance >= total,
  };
};

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  /** Amount the wallet has to cover for its option to unlock. */
  total: number;
  className?: string;
};

export const PaymentMethodSelector = ({
  value,
  onChange,
  total,
  className = "",
}: PaymentMethodSelectorProps) => {
  const t = useTranslations("checkoutPayment");
  const currency = useSelector(
    (state: RootState) => state.currency.selected?.code ?? "",
  );
  const { balance, isLoading, canPayWithWallet } = useWalletAffordability(total);

  // The total moves while the user picks seats or dates, so a wallet that
  // stops covering it has to hand the selection back to the card.
  useEffect(() => {
    if (value === "wallet" && !isLoading && !canPayWithWallet) onChange("card");
  }, [value, isLoading, canPayWithWallet, onChange]);

  const options: {
    key: PaymentMethod;
    icon: React.ReactNode;
    label: string;
    hint: string;
    disabled: boolean;
  }[] = [
    {
      key: "card",
      icon: <BsCreditCard2Front size={20} />,
      label: t("card.label"),
      hint: t("card.hint"),
      disabled: false,
    },
    {
      key: "wallet",
      icon: <IoWalletOutline size={20} />,
      label: t("wallet.label"),
      hint: canPayWithWallet ? t("wallet.hint") : t("wallet.insufficient"),
      disabled: !canPayWithWallet,
    },
  ];

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3 ${className}`}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-base font-bold text-gray-900">{t("title")}</p>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-gray-400">{t("balanceLabel")}</span>
          {isLoading ? (
            <Skeleton.Input active size="small" className="!w-20 !h-4 !min-w-0" />
          ) : (
            <span className="font-bold text-gray-800">
              {balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              <CurrencyLabel currency={currency} />
            </span>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value === option.key;
          return (
            <button
              key={option.key}
              type="button"
              disabled={option.disabled}
              aria-pressed={isSelected}
              onClick={() => onChange(option.key)}
              className={`flex items-start gap-3 rounded-xl border p-3 text-start transition-colors ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
              <span
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                }`}>
                {option.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-gray-900">
                  {option.label}
                </span>
                <span className="block text-xs text-gray-400 mt-0.5">
                  {option.hint}
                </span>
              </span>
              {isSelected && (
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                  <FaCheck size={10} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
