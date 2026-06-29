"use client";
import { Divider } from "antd";
import { FaSuitcase } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/store/appStore";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";
import { useTranslations } from "next-intl";

export const PriceSummary = () => {
    const t = useTranslations("priceSummaryCard");
    const flight = useSelector((state: RootState) => state.flight.flight);
    const chosenBundle = useSelector((state: RootState) => state.flight.chosenBundle);
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
    const searchParams = useSearchParams();

    if (!flight) return null;

    const { baseAmount, taxesAmount, discountAmount, serviceChargeAmount, price } = flight;

    const adults   = Math.max(1, parseInt(searchParams.get("adt") || "1", 10));
    const children = Math.max(0, parseInt(searchParams.get("chd") || "0", 10));
    const nonInfantPassengers = adults + children;

    const bundlePricePerPassenger = chosenBundle?.bundle_prices.total_amount ?? 0;
    const bundleTotal = bundlePricePerPassenger * nonInfantPassengers;
    const grandTotal = price + (chosenBundle ? bundleTotal : 0);

    const fmt = (val: number) => <>{val.toLocaleString("en-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <CurrencyLabel currency={currency} /></>;

    return (
        <div className="bg-white rounded-[20px] px-6 py-6 border border-gray-100 shadow-sm sticky top-[170px] lg:top-[200px]">
            <h4 className="font-bold text-[#333] text-lg mb-5 flex items-center gap-2 justify-end">
                {t("title")} <FaSuitcase className="text-primary" />
            </h4>
            <div className="flex items-center justify-between py-2">
                <span className="text-[#333] font-medium">{t("baseFare")}</span>
                <span className="text-[#555]">{fmt(baseAmount)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
                <span className="text-[#333] font-medium">{t("taxesAndFees")}</span>
                <span className="text-[#555]">{fmt(taxesAmount)}</span>
            </div>
            {serviceChargeAmount > 0 && (
                <div className="flex items-center justify-between py-2">
                    <span className="text-[#333] font-medium">{t("serviceCharge")}</span>
                    <span className="text-[#555]">{fmt(serviceChargeAmount)}</span>
                </div>
            )}
            {chosenBundle && (
                <>
                    <Divider className="!my-3" />
                    <div className="flex items-center justify-between py-2">
                        <span className="text-[#333] font-medium">{t("bundlePrice", { name: chosenBundle.bundle_name })}</span>
                        <span className="text-[#555]">{fmt(bundlePricePerPassenger)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-[#333] font-medium">{t("passengerCountNoInfants")}</span>
                        <span className="text-[#555]">{nonInfantPassengers}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-[#333] font-medium">{t("bundleTotal")}</span>
                        <span className="text-[#555]">{fmt(bundleTotal)}</span>
                    </div>
                </>
            )}
            <Divider className="!my-3" />
            <div className="flex items-center justify-between py-2">
                <span className="font-bold text-[#333] text-lg">{t("grandTotal")}</span>
                <span className="text-primary font-bold text-lg">{fmt(grandTotal)}</span>
            </div>
        </div>
    );
};
