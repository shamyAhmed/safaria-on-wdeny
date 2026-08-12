"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations, useLocale } from "next-intl";
import { HomeSection } from "../HomeSection";
import { LogoCarouselBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";

export const PaymentMethodsSection = ({ data }: { data: LogoCarouselBlockData }) => {
  const swiperRef = useRef<SwiperType>();
  const t = useTranslations("homePage.paymentMethods");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const paymentMethods = (data.items ?? []).map((item, index) => ({
    id: `${item.alt}-${index}`,
    name: item.alt,
    logo: item.image,
  }));

  if (paymentMethods.length === 0) return null;

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="py-16 bg-[#FBFBFD]"
    >
      <div className="bg-white rounded-[28px] container py-10">
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={2}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640:  { slidesPerView: 5, spaceBetween: 24 },
              768:  { slidesPerView: 7, spaceBetween: 24 },
              1024: { slidesPerView: 9, spaceBetween: 24 },
            }}
            className="payment-methods-swiper"
          >
            {paymentMethods.map((method) => (
              <SwiperSlide key={method.id}>
                <div className="bg-[#F7F7F7] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-24 md:h-28 overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <CmsImage
                      src={method.logo}
                      alt={method.name}
                      width={150}
                      height={60}
                      className="object-contain max-w-full max-h-full"
                      placeholderClassName="!bg-transparent rounded-xl"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center gap-3 mt-8 justify-center">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label={t("navigation.next")}
              className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-gray-200"
            >
              <FiChevronRight className={`text-xl ${!isRtl ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#005A9C] transition-all duration-300 shadow-md"
              aria-label={t("navigation.previous")}
            >
              <FiChevronLeft className={`text-xl ${!isRtl ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
