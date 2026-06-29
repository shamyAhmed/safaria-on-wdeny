"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";
import { useTranslations } from "next-intl";

export const PriceSummaryTab = ({ flight }: { flight: any }) => {
    const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
    const t = useTranslations("flightModal.priceSummary");
    const baseAmount: number = flight?.baseAmount ?? 0;
    const taxesAmount: number = flight?.taxesAmount ?? 0;
    const discountAmount: number = flight?.discountAmount ?? 0;
    const totalAmount: number = flight?.price ?? 0;

    const fmt = (val: number) =>
        <><CurrencyLabel currency={currency} /> {val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>;

    return (
        <div className="price-summary p-6 border rounded-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-gray-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border">{t("baseFare")}</th>
                            <th className="py-3 px-4 border">{t("taxesAndFees")}</th>
                            <th className="py-3 px-4 border">{t("discount")}</th>
                            <th className="py-3 px-4 border">{t("refundPrice")}</th>
                            <th className="py-3 px-4 border">{t("total")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-4 px-4 border">{fmt(baseAmount)}</td>
                            <td className="py-4 px-4 border">{fmt(taxesAmount)}</td>
                            <td className="py-4 px-4 border">{fmt(discountAmount)}</td>
                            <td className="py-4 px-4 border text-gray-400 italic">{t("unspecifiedYet")}</td>
                            <td className="py-4 px-4 border font-bold">{fmt(totalAmount)}</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="py-4 text-right pr-6">
                                <span className="text-xl font-bold text-primary">{fmt(totalAmount)}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="mt-8 text-sm text-[#444] text-center">
                {t("disclaimer")}
            </p>
        </div>
    );
};
