"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/grid";

const partners = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: `/images/partners/partner-${(index % 10) + 1}.png`,
}));

export const SuccessPartnersSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const t = useTranslations("homePage.successPartners");

  return (
    <section className="bg-[#F4F4F6] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-8 lg:mb-12">
          <h2 className="mb-2 text-3xl font-extrabold text-primary md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-sm text-black/80 md:text-base">
            {t("description")}
          </p>
        </div>

        <Swiper
          modules={[Grid, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={false}
          dir={locale === "ar" ? "rtl" : "ltr"}
          slidesPerView={1}
          grid={{ rows: 1, fill: "row" }}
          spaceBetween={16}
          breakpoints={{
            580: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 4,
                grid: {
                    rows: 2,
                    fill: "row"
                }
            },
            1024: {
              slidesPerView: 5,
              grid: {
                rows: 2,
                fill: "row",
              },
              spaceBetween: 4,
            },
          }}
          className="success-partners-swiper"
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <div className="mx-auto flex h-[130px] w-full max-w-[170px] items-center justify-center bg-white p-5 md:h-[140px] md:max-w-[190px] lg:h-[160px] lg:max-w-none lg:border lg:border-[#F2F2F2]">
                <Image
                  src={partner.image}
                  alt={`partner-${partner.id}`}
                  width={180}
                  height={90}
                  className="h-auto max-h-[72px] w-auto max-w-[140px] object-contain md:max-h-[80px] md:max-w-[150px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Previous"
          >
            <FiChevronLeft className="text-lg rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-[#005A9C]"
            aria-label="Next"
          >
            <FiChevronRight className="text-lg rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
