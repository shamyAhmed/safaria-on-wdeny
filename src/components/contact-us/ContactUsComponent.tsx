import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { getTranslations } from "next-intl/server";
import { ContactInfoSection } from "./ContactInfoSection";
import { ContactFormLoader } from "./ContactFormLoader";

export async function ContactUsComponent() {
  const t = await getTranslations("contactUs");

  return (
    <div>
      <PageBannerSection
        title={t("bannerTitle")}
        currentLink="/contact-us"
        currentPage={t("bannerCurrentPage")}
      />

      {/* Main Contact Section */}
      <section className="container py-[160px]">
        <ContactFormLoader />
      </section>
    </div>
  );
}
