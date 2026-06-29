import style from "./styles/homePage.module.scss";
import StatsSection from "./sections/StatsSection";
import AboutSection from "./sections/AboutSection";
import Image from "next/image";
import { WhyWodiniSection } from "./sections/WhyWodiniSection";
import { PaymentMethodsSection } from "./sections/PaymentMethodsSection";
import { PartnerCompaniesSection } from "./sections/PartnerCompaniesSection";
import { TravelDestinationsSection } from "./sections/TravelDestinationsSection";
import { AllInOneAppSection } from "./sections/AllInOneAppSection";
import { HowToBookSection } from "./sections/HowToBookSection";
import { HomeBlogsSection } from "./sections/HomeBlogsSection";
import { getTranslations } from "next-intl/server";
import GetAppSection from "./sections/GetAppSection";
import { SuccessPartnersSection } from "./sections/SuccessPartnersSection";
import { ScrollToTopButton } from "./ScrollToTopButton";
export const IndexComponent: React.FC = async () => {
  const t = await getTranslations("homePage");

  try {
    return (
      <>
        <StatsSection />
        <AboutSection />
        <WhyWodiniSection />

        <div className="container">
            <div className="flex items-center justify-center relative h-[560px] rounded-2xl overflow-hidden">
              <Image
                src="/images/home-banner.png"
                fill
                objectFit="cover"
                alt=""
              />
          </div>
        </div>

        <PaymentMethodsSection />
        <PartnerCompaniesSection />
        <AllInOneAppSection />
        <TravelDestinationsSection />
        <HowToBookSection />
        <GetAppSection />
        <HomeBlogsSection />
        <SuccessPartnersSection />
        <ScrollToTopButton />
      </>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return (
      <div className={style.homePage}>
        <div className="container py-20 text-center">
          <p className="text-red-500">{t("errorLoading")}</p>
        </div>
      </div>
    );
  }
};
