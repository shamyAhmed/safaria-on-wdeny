"use client";
import React, { useRef } from "react";
import { useLocale } from "next-intl";
import { HomeSection } from "../HomeSection";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { StepsBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";

export const HowToBookSection = ({ data }: { data: StepsBlockData }) => {
  const locale = useLocale();
  const swiperRef = useRef<SwiperType | null>(null);

  const steps = (data.items ?? []).map((item, index) => ({
    id: index,
    stepNumber: item.number || String(index + 1).padStart(2, "0"),
    title: pickText(item.title, locale),
    image: item.image,
  }));

  if (steps.length === 0) return null;

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="py-16 bg-gray-50">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{ 1024: { slidesPerView: 4, spaceBetween: 20 } }}
        className="home-blogs-swiper">
        {steps.map((step) => (
          <SwiperSlide key={step.id}>
            <div className="flex flex-col">
              <div className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.stepNumber}
                </div>
                <h3 className="text-lg md:text-xl line-clamp-1 font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <div className="relative w-full max-w-[200px] h-[350px] md:h-[400px] mx-auto">
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-lg">
                    <CmsImage
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                      showPlaceholderLabel={false}
                      placeholderIconClassName="text-4xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700"
          aria-label="Previous">
          <FiChevronLeft className="text-xl rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"
          aria-label="Next">
          <FiChevronRight className="text-xl rtl:rotate-180" />
        </button>
      </div>
    </HomeSection>
  );
};
