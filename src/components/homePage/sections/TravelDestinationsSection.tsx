"use client";

import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { HomeSection } from "../HomeSection";
import { MediaCardsBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { isScrollTarget, scrollToTop } from "@/utils/cmsLink";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { CmsImage } from "@/components/common/CmsImage";
import "swiper/css";

export const TravelDestinationsSection = ({ data }: { data: MediaCardsBlockData }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const t = useTranslations("homePage.travelDestinations");
  const getLink = useLocalizedLink();

  const destinations = (data.items ?? []).map((item, index) => ({
    id: index,
    title: pickText(item.title, locale),
    image: item.image,
    hasImage: Boolean(item.image?.trim()),
    ctaLabel: pickText(item.cta_label, locale) || t("bookNow"),
    ctaUrl: item.cta_url ?? "",
  }));

  if (destinations.length === 0) return null;

  const buttonClass =
    "inline-flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-white text-sm font-bold hover:bg-[#005A9C] transition-colors";

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
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
                <CmsImage
                  src={destination.image}
                  alt={destination.title}
                  fill
                  className="object-cover"
                  placeholderIconClassName="text-4xl"
                  showPlaceholderLabel={false}
                />
                {/* The scrim earns the white caption its contrast; without a
                    photo behind it the caption has to darken instead. */}
                {destination.hasImage && <div className="absolute inset-0 bg-black/20" />}
                <div className="absolute inset-x-3 bottom-4 p-4 text-center">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      destination.hasImage ? "text-white" : "text-gray-700"
                    }`}>
                    {destination.title}
                  </h3>
                  {isScrollTarget(destination.ctaUrl) ? (
                    <button type="button" className={buttonClass} onClick={scrollToTop}>
                      {destination.ctaLabel}
                    </button>
                  ) : (
                    <a href={getLink(destination.ctaUrl)} className={buttonClass}>
                      {destination.ctaLabel}
                    </a>
                  )}
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
