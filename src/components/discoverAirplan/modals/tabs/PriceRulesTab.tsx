"use client";
import { Divider } from "antd";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { CurrencyLabel } from "@/components/discoverAirplan/CurrencyLabel";

export const PriceRulesTab = ({ flight }: { flight: any }) => {
  const t = useTranslations("flightModal.priceRules");
  const currency = useSelector((state: RootState) => state.currency.selected?.code ?? "");
  const baseAmount: number = flight?.baseAmount ?? 0;
  const taxesAmount: number = flight?.taxesAmount ?? 0;
  const totalAmount: number = flight?.price ?? 0;
  const refundability: string = flight?.refundability ?? "NotRefundable";

  const fmt = (val: number) =>
    <>{val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <CurrencyLabel currency={currency} /></>;

  const refundabilityLabel =
    refundability === "Refundable"
      ? t("refundable")
      : refundability === "PartiallyRefundable"
        ? t("partiallyRefundable")
        : t("nonRefundable");

  const refundabilityColor =
    refundability === "Refundable"
      ? "text-green-600"
      : refundability === "PartiallyRefundable"
        ? "text-yellow-600"
        : "text-red-500";

  const routes = (flight?.legs ?? []).map(
    (leg: any) => `${leg.departureCity} - ${leg.arrivalCity}`,
  );

  return (
    <div className="price-rules">
      <div className="price-rules-grid">
        {/* Price breakdown */}
        <section className="price-rules-breakdown">
          <h4 className="price-rules-heading">{t("breakdown")}</h4>
          <div className="breakdown-title">{t("breakdown")}</div>

          <div className="breakdown-row muted">
            <span>{t("baseFare")}</span>
            <span>{fmt(baseAmount)}</span>
          </div>

          <div className="breakdown-row muted">
            <span>{t("taxesAndFees")}</span>
            <span>{fmt(taxesAmount)}</span>
          </div>

          <Divider className="breakdown-divider" />

          <div className="breakdown-row total-row">
            <span className="total-label">{t("total")}</span>
            <span className="total-value">{fmt(totalAmount)}</span>
          </div>
        </section>

        {/* Cancellation rules */}
        <section className="price-rules-cancel">
          <h4 className="price-rules-heading">{t("cancellationFees")}</h4>
          <div className="cancel-card">
            <h5 className="cancel-card-title">{t("refundabilityStatus")}</h5>

            {routes.map((route: any) => (
              <div key={route} className="cancel-row">
                <span className="cancel-route">{route}</span>
                <span className="cancel-note">{t("noInfoAvailable")}</span>
              </div>
            ))}

            <Divider className="card-divider" />

            <div className="cancel-row center-row">
              <span className="cancel-note">{t("changeDateFees")}</span>
            </div>

            <Divider className="card-divider" />

            {routes.map((route: any) => (
              <div key={`change-${route}`} className="cancel-row">
                <span className="cancel-route">{route}</span>
                <span className="cancel-note">{t("noInfoAvailable")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="price-rules-disclaimer">
        <p className="disclaimer-text">
          {t("disclaimer", { company: t("companyName") })}
        </p>
        <p className="disclaimer-note">{t("disclaimerNote")}</p>
        <Link href="/pages/lshrot-o-l-hk-m" className="details-link" target="_blank">{t("detailsLink")}</Link>
      </div>
    </div>
  );
};
