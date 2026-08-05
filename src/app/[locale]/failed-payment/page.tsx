import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FiHome, FiRefreshCw } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";
import { privatePageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return privatePageMetadata("paymentFailed", locale);
}

const FailedPaymentPage = async () => {
  const t = await getTranslations("paymentResult.failed");

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[560px] flex flex-col items-center gap-8">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-gray-500 text-base">{t("description")}</p>
        </div>

        {/* Reasons card */}
        <div className="w-full bg-white rounded-2xl shadow-sm px-6 py-5 space-y-3">
          <h2 className="font-bold text-lg text-gray-800">{t("reasonsTitle")}</h2>
          <ul className="flex flex-col gap-3">
            {["insufficientFunds", "invalidCardDetails", "sessionExpired"].map((key) => (
              <li key={key} className="flex items-start gap-2 text-gray-500 text-sm">
                <TbPointFilled className="text-red-400 mt-0.5 shrink-0" />
                {t(`reasons.${key}`)}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <Link
            href="/discover-bus"
            className="flex flex-1 items-center justify-center gap-2 bg-primary hover:opacity-90 text-white px-6 py-3 rounded-xl text-base font-semibold transition-opacity">
            <FiRefreshCw />
            {t("retry")}
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 hover:!text-primary px-6 py-3 rounded-xl text-base font-semibold transition-colors">
            <FiHome />
            {t("home")}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FailedPaymentPage;
