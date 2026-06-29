import style from "./styles/aboutUs.module.scss";
import { AboutStarterSection } from "./sections/AboutStarterSection";
import { OurVisionSection } from "./sections/OurMissionSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { AboutFeaturesSection } from "./sections/AboutFeaturesSection";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import { getTranslations } from "next-intl/server";

export const AboutUsComponent: React.FC = async () => {
  const t = await getTranslations("aboutUs");
  return (
    <div className={style.aboutUs}>
      <PageBannerSection
        title={t("bannerTitle")}
        currentLink="/about-us"
        currentPage={t("bannerCurrentPage")}
      />
      <AboutUsSection />
      <OurVisionSection />
      <AboutFeaturesSection />
    </div>
  );
};
