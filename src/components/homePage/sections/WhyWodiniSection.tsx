"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { HomeSection } from "../HomeSection";
import { FeatureShowcaseBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";
import { isScrollTarget, scrollToTop } from "@/utils/cmsLink";
import "swiper/css";

export const WhyWodiniSection = ({ data }: { data: FeatureShowcaseBlockData }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("homePage.whyWodini");
  const getLink = useLocalizedLink();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsLargeScreen(event.matches);
    };
    handleMediaQueryChange(mediaQuery);
    const listener = (event: MediaQueryListEvent) => handleMediaQueryChange(event);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const slides = (data.items ?? []).map((item, index) => ({
    id: index,
    title: pickText(item.title, locale),
    description: pickText(item.description, locale),
    image: item.image,
    buttonText: pickText(item.cta_label, locale),
    buttonLink: item.cta_url ?? "",
  }));

  const indicatorSlots = slides.length;
  const direction = isLargeScreen ? "vertical" : "horizontal";

  if (indicatorSlots === 0) return null;

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="py-20 bg-white"
      descriptionClassName="max-w-4xl"
    >
      <div className="relative rounded-[40px] md:rounded-[56px] bg-[#EFF6FF] p-5 md:p-8 lg:p-10">
        <div className={`relative ${isLargeScreen ? "lg:pe-16" : ""}`}>
          <div className="absolute left-0 top-1/2 z-[1] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
            <div className="flex flex-col items-center gap-2">
              {Array.from({ length: indicatorSlots }).map((_, index) => (
                <button
                  key={`why-wodini-dot-${index}`}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "h-14 w-1.5 bg-primary"
                      : "h-5 w-1 bg-white border border-[#E9D9D9]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <Swiper
            modules={[Autoplay]}
            direction={direction}
            key={direction}
            spaceBetween={18}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.realIndex % indicatorSlots);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex % indicatorSlots);
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={slides.length > 1}
            className="why-wodini-swiper h-[500px] md:h-[380px] lg:h-[420px]"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-full rounded-[28px] md:rounded-[36px] bg-transparent overflow-hidden">
                  <div className="grid h-full grid-cols-1 md:grid-cols-12 items-center gap-5 md:gap-8">
                    <div className="md:col-span-7 p-2 md:p-4 lg:ps-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl line-clamp-2 font-bold text-gray-900 mb-4 leading-tight border-b border-[#EFDCDC] pb-4">
                        {slide.title}
                      </h3>
                      <p className="text-gray-700 line-clamp-4 text-sm md:text-base lg:text-lg leading-relaxed mb-7">
                        {slide.description}
                      </p>
                      {slide.buttonText &&
                        (isScrollTarget(slide.buttonLink) ? (
                          <Button
                            type="primary"
                            size="large"
                            className="!h-12 !px-9 !rounded-xl"
                            onClick={scrollToTop}
                          >
                            {slide.buttonText}
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            size="large"
                            href={getLink(slide.buttonLink)}
                            className="!h-12 !px-9 !rounded-xl"
                          >
                            {slide.buttonText}
                          </Button>
                        ))}
                    </div>
                    <div className="md:col-span-5">
                      <div className="relative h-[220px] md:h-[300px] lg:h-[340px] w-full">
                        <CmsImage
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover rounded-[28px] md:rounded-[32px]"
                          placeholderClassName="rounded-[28px] md:rounded-[32px]"
                          placeholderIconClassName="text-4xl"
                          showPlaceholderLabel={false}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
            {Array.from({ length: indicatorSlots }).map((_, index) => (
              <button
                key={`why-wodini-mobile-dot-${index}`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "h-1.5 w-10 bg-primary"
                    : "h-1.5 w-5 border border-[#E9D9D9] bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center md:justify-end gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200"
              aria-label={t("navigation.previousSlide")}
            >
              {isArabic ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all duration-300 shadow-sm"
              aria-label={t("navigation.nextSlide")}
            >
              {isArabic ? <FiChevronLeft className="text-xl" /> : <FiChevronRight className="text-xl" />}
            </button>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
