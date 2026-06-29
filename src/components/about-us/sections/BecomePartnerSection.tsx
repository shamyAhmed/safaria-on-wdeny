"use client";
import PartnerWithUsModal from "@/components/tools/modal/partner-with-us-modal/PartnerWithUsModal";
import { PartnerWithUsSection } from "@/components/tools/sections/PartnerWithUsSection";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { Button } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface BecomePartnerSectionProps {
  data: {
    about_partner_title_desc_en: string;
    about_partner_title_desc_ar?: string;
    about_partner_description_desc_en: string;
    about_partner_description_desc_ar?: string;
  };
}

export const BecomePartnerSection = ({ data }: BecomePartnerSectionProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isEnglish = locale === "en";
  const getLink = useLocalizedLink();

  return (
    <PartnerWithUsSection
      title={
        isEnglish
          ? data?.about_partner_title_desc_en
          : data?.about_partner_title_desc_ar || ""
      }
      desc={
        isEnglish
          ? data?.about_partner_description_desc_en
          : data?.about_partner_description_desc_ar || ""
      }
    >
      <div className="mt-[56px] flex items-center justify-center gap-4 md:flex-col">
        <Link
          href={getLink("/what-we-offer")}
          className="flex !border-secondary !text-secondary sm:w-full"
        >
          <Button
            type="default"
            className="!border-secondary !bg-transparent !text-secondary sm:w-full"
          >
            {t("aboutUs.learnMoreAboutProcess")}
          </Button>
        </Link>
        <PartnerWithUsModal />
      </div>
    </PartnerWithUsSection>
  );
};
