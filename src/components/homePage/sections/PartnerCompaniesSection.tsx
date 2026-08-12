"use client";

import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { CompanyCard } from "@/components/companies/cards/CompanyCard";
import { HomeSection } from "../HomeSection";
import { PartnersBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import "swiper/css";

export const PartnerCompaniesSection = ({ data }: { data: PartnersBlockData }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("homePage.partnerCompanies");

  const companies = (data.partners ?? []).map((partner) => ({
    id: partner.id,
    name: (isArabic ? partner.title_ar : partner.title_en) || partner.title,
    logo: partner.logo,
    images: partner.images ?? [],
  }));

  if (companies.length === 0) return null;

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="py-16 bg-[#FBFBFD]"
      headerClassName="text-center md:text-start"
    >
      <div className="bg-white rounded-[28px]">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.1}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          loop={true}
          dir={isArabic ? "rtl" : "ltr"}
          breakpoints={{
            640:  { slidesPerView: 2.5, spaceBetween: 16 },
            768:  { slidesPerView: 2.5, spaceBetween: 14 },
            1024: { slidesPerView: 4.2, spaceBetween: 20 },
          }}
          className="partner-companies-swiper"
        >
          {companies.map((company) => (
            <SwiperSlide key={company.id}>
              <CompanyCard
                companyId={company.id}
                companyName={company.name}
                companyLogo={company.logo}
                images={company.images}
                showDetailsLink={false}
                isArabic={isArabic}
                imageHeightClass="h-[190px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center gap-3 mt-8 justify-center">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-gray-200"
            aria-label={t("navigation.previous")}
          >
            {isArabic ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#005A9C] transition-all duration-300 shadow-md"
            aria-label={t("navigation.next")}
          >
            {isArabic ? <FiChevronLeft className="text-xl" /> : <FiChevronRight className="text-xl" />}
          </button>
        </div>
      </div>
    </HomeSection>
  );
};
