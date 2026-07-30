import { SingleCompanyComponent } from "@/components/companies/single-company/SingleCompanyComponent";
import { Metadata } from "next";
import { normalizeLocale, pageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; companyId: string }>;
}

// Every company page used to share the listing page's title. Until the company
// endpoint is wired up, the id keeps each title and description unique so the
// pages stop competing with each other in search results.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, companyId } = await params;
  const isArabic = normalizeLocale(locale) === "ar";

  return pageMetadata({
    locale,
    path: `/companies/${companyId}`,
    title: isArabic
      ? `تفاصيل شركة النقل رقم ${companyId} — الرحلات والأسعار`
      : `Transport Company ${companyId} — Trips, Fleet and Fares`,
    description: isArabic
      ? `تعرّف على شركة النقل رقم ${companyId} على منصة سفرية: صور الأسطول، خطوط الرحلات المتاحة، مواعيد الانطلاق والأسعار، واحجز رحلتك مباشرة.`
      : `See transport company ${companyId} on Safaria: fleet photos, available routes, departure times and fares, and book your trip directly.`,
  });
}

const SingleCompanyPage: React.FC = (): JSX.Element => {
  return <SingleCompanyComponent />;
};

export default SingleCompanyPage;
