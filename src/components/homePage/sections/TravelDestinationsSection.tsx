"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { HomeSection } from "../HomeSection";
import "swiper/css";

interface DestinationCard {
  id: number;
  title: string;
  image: string;
}

export const TravelDestinationsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const t = useTranslations("homePage.travelDestinations");

  const destinations: DestinationCard[] = [
    { id: 1, title: t("cards.1.title"), image: "/images/about/about-banner.png" },
    { id: 2, title: t("cards.2.title"), image: "/images/why-the-studio-image.png" },
    { id: 3, title: t("cards.3.title"), image: "/images/home-banner.png" },
    { id: 4, title: t("cards.4.title"), image: "/images/about/about-restless.png" },
    { id: 5, title: t("cards.5.title"), image: "/images/what-we-offer/banner.png" },
  ];

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
      className="py-16 bg-[#EEF2F8]"
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        dir={locale === "ar" ? "rtl" : "ltr"}
        breakpoints={{
          640:  { slidesPerView: 3,   spaceBetween: 16 },
          992:  { slidesPerView: 4,   spaceBetween: 18 },
          1280: { slidesPerView: 5.5, spaceBetween: 20 },
        }}
        className="travel-destinations-swiper"
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id}>
            <div className="rounded-[14px] aspect-[324/424] max-h-[424px] max-w-[324px] bg-white p-2">
              <div className="relative h-full overflow-hidden rounded-[12px]">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-3 bottom-4 p-4 text-center">
                  <h3 className="text-xl font-bold mb-3 text-white">{destination.title}</h3>
                  <button
                    type="button"
                    className="h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold hover:bg-[#005A9C] transition-colors"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {t("bookNow")}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center gap-3 mt-8 justify-center">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-gray-200"
          aria-label={t("navigation.next")}
        >
          <FiChevronLeft className="text-xl rtl:rotate-180" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#005A9C] transition-all duration-300 shadow-md"
          aria-label={t("navigation.previous")}
        >
          <FiChevronRight className="text-xl rtl:rotate-180" />
        </button>
      </div>
    </HomeSection>
  );
};
