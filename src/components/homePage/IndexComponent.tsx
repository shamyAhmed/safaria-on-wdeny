import { Fragment } from "react";
import style from "./styles/homePage.module.scss";
import StatsSection from "./sections/StatsSection";
import AboutSection from "./sections/AboutSection";
import { WhyWodiniSection } from "./sections/WhyWodiniSection";
import { BannerSection } from "./sections/BannerSection";
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
import { getSiteBlocks } from "@/apiCalls/home/getSiteBlocks";
import { SiteBlock } from "@/app/[locale]/_types/SiteBlocks";

/**
 * Renders one CMS block. The switch is on `type` — the *behaviour* the block
 * asks for — never on `id`, so the CMS is free to add, drop or reorder slots
 * without a code change. Unknown types are skipped.
 */
const renderBlock = (block: SiteBlock) => {
  switch (block.type) {
    case "stats":
      return <StatsSection data={block.data} />;
    case "split_content":
      return <AboutSection data={block.data} />;
    case "feature_showcase":
      return <WhyWodiniSection data={block.data} />;
    case "banner":
      return <BannerSection data={block.data} />;
    case "logo_carousel":
      return <PaymentMethodsSection data={block.data} />;
    case "partners":
      return <PartnerCompaniesSection data={block.data} />;
    case "feature_grid":
      return <AllInOneAppSection data={block.data} />;
    case "media_cards":
      return <TravelDestinationsSection data={block.data} />;
    case "steps":
      return <HowToBookSection data={block.data} />;
    case "app_promo":
      return <GetAppSection data={block.data} />;
    case "posts":
      return <HomeBlogsSection data={block.data} />;
    case "logo_grid":
      return <SuccessPartnersSection data={block.data} />;
    default:
      return null;
  }
};

export const IndexComponent: React.FC = async () => {
  const t = await getTranslations("homePage");

  try {
    const blocks = await getSiteBlocks();

    return (
      <>
        {blocks.map((block) => (
          <Fragment key={`${block.id}-${block.sort}`}>{renderBlock(block)}</Fragment>
        ))}
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
