"use client";

import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { CompanyCard } from "@/components/companies/cards/CompanyCard";
import { HomeSection } from "../HomeSection";
import "swiper/css";

interface CompanyCardData {
  id: number;
  name: string;
  logo: string;
  cover: string;
}

export const PartnerCompaniesSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const t = useTranslations("homePage.partnerCompanies");

  const companies: CompanyCardData[] = [
    { id: 1, name: t("companies.1"), logo: "/photos/nowrasbus-logo.png", cover: "/photos/blue-bus.png" },
    { id: 2, name: t("companies.2"), logo: "/photos/nowrasbus-logo.png", cover: "/photos/blue-bus.png" },
    { id: 3, name: t("companies.3"), logo: "/photos/nowrasbus-logo.png", cover: "/photos/blue-bus.png" },
    { id: 4, name: t("companies.4"), logo: "/photos/nowrasbus-logo.png", cover: "/photos/blue-bus.png" },
    { id: 5, name: t("companies.5"), logo: "/photos/nowrasbus-logo.png", cover: "/photos/blue-bus.png" },
  ];

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
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
          dir={locale === "ar" ? "rtl" : "ltr"}
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
                images={[company.cover, company.cover, company.cover]}
                detailsLabel={t("details")}
                isArabic={locale === "ar"}
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
            {locale === "ar" ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#005A9C] transition-all duration-300 shadow-md"
            aria-label={t("navigation.next")}
          >
            {locale === "ar" ? <FiChevronLeft className="text-xl" /> : <FiChevronRight className="text-xl" />}
          </button>
        </div>
      </div>
    </HomeSection>
  );
};
