import PartnerWithUsModal from "@/components/tools/modal/partner-with-us-modal/PartnerWithUsModal";
import { PartnerWithUsSection } from "@/components/tools/sections/PartnerWithUsSection";
import { useLocale } from "next-intl";
import React from "react";

interface BecomePartnerSectionProps {
  data: {
    home_partner_title_desc_en: string;
    home_partner_title_desc_ar: string;
    home_partner_description_desc_en: string;
    home_partner_description_desc_ar: string;
  };
}

export const BecomePartnerSection = ({ data }: BecomePartnerSectionProps) => {
  const locale = useLocale();
  const isEnglish = locale === "en";

  return (
    <PartnerWithUsSection
      title={
        isEnglish
          ? data?.home_partner_title_desc_en
          : data?.home_partner_title_desc_ar || ""
      }
      desc={
        isEnglish
          ? data?.home_partner_description_desc_en
          : data?.home_partner_description_desc_ar || ""
      }
    >
      <div className="mt-[56px]">
        <PartnerWithUsModal />
      </div>
    </PartnerWithUsSection>
  );
};
