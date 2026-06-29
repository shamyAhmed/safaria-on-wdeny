"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./CompanyCard.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface CompanyCardProps {
  companyId: number;
  companyName: string;
  companyLogo: string;
  images: string[];
  detailsLabel: string;
  isArabic?: boolean;
  imageHeightClass?: string;
}

export const CompanyCard = ({
  companyId,
  companyName,
  companyLogo,
  images,
  detailsLabel,
  isArabic = true,
  imageHeightClass = "h-[290px]",
}: CompanyCardProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(images.length <= 1);

  const syncNavState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={`bg-[#F7F7F7] p-4 rounded-[20px] ${styles.cardRoot}`}>
      <div className={`relative ${imageHeightClass} rounded-xl overflow-hidden`}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: `.swiper-button-next-${companyId}`,
            prevEl: `.swiper-button-prev-${companyId}`,
          }}
          pagination={{
            el: `.company-card-pagination-${companyId}`,
            clickable: false,
            bulletClass: "swiper-pagination-bullet !w-2 !h-2 !bg-white",
            bulletActiveClass:
              "swiper-pagination-bullet-active !w-6 !rounded-md",
          }}
          loop={false}
          onSwiper={syncNavState}
          onSlideChange={syncNavState}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${companyId}-${index}`}>
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${companyName} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`company-card-pagination-${companyId} absolute !left-1/2 !bottom-2 -translate-x-1/2 z-10 flex items-center justify-center gap-1.5`}
        />

        <button
          className={`swiper-button-next-${companyId} absolute end-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${
            isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Next company image"
        >
          <FaArrowLeft className="text-blueText text-sm ltr:rotate-180" />
        </button>
        <button
          className={`swiper-button-prev-${companyId} absolute start-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${
            isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Previous company image"
        >
          <FaArrowRight size={12} className="text-blueText text-sm ltr:rotate-180" />
        </button>
      </div>

      <div className={`flex items-center justify-between mt-5 ${styles.metaRow}`}>
        <div className="flex gap-4">
          <div
            className={`relative w-[50px] h-[50px] flex-shrink-0 ${styles.logoWrap}`}
          >
            <Image
              src={companyLogo}
              alt={companyName}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-bold text-[#4C4C4C] ${styles.title}`}>
              {companyName}
            </h3>
          </div>
        </div>

        <Link
          href={`/companies/${companyId}`}
          className={`text-primary font-medium flex items-center gap-2 ${styles.details}`}
        >
          {detailsLabel}
          {isArabic ? (
            <FiChevronLeft className={`text-sm ${styles.detailsIcon}`} />
          ) : (
            <FiChevronRight className={`text-sm ${styles.detailsIcon}`} />
          )}
        </Link>
      </div>
    </div>
  );
};
