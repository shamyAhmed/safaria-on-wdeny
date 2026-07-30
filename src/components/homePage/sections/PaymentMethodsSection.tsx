"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations, useLocale } from "next-intl";
import { HomeSection } from "../HomeSection";

interface PaymentMethod {
  id: number;
  name: string;
  logo: string;
}

export const PaymentMethodsSection = () => {
  const swiperRef = useRef<SwiperType>();
  const t = useTranslations("homePage.paymentMethods");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const paymentMethods: PaymentMethod[] = [
    { id: 1,  name: t("methods.tabbyTamara"), logo: "/images/payments/payment-2.webp" },
    { id: 2,  name: t("methods.visa"),         logo: "/images/payments/payment-3.png" },
    { id: 3,  name: t("methods.applePay"),     logo: "/images/payments/payment-4.webp" },
    { id: 4,  name: t("methods.mada"),         logo: "/images/payments/payment-5.webp" },
    { id: 5,  name: t("methods.stcPay"),       logo: "/images/payments/payment-6.webp" },
    { id: 6,  name: t("methods.moyasar"),      logo: "/images/payments/payment-2.webp" },
    { id: 7,  name: "Mastercard",              logo: "/images/payments/payment-3.png" },
    { id: 8,  name: "Google Pay",              logo: "/images/payments/payment-4.webp" },
    { id: 9,  name: "PayPal",                  logo: "/images/payments/payment-5.webp" },
    { id: 10, name: "Tabby",                   logo: "/images/payments/payment-6.webp" },
    { id: 11, name: "Tamara",                  logo: "/images/payments/payment-2.webp" },
    { id: 12, name: "Urpay",                   logo: "/images/payments/payment-3.png" },
    { id: 13, name: "Benefit Pay",             logo: "/images/payments/payment-4.webp" },
    { id: 14, name: "Bank Transfer",           logo: "/images/payments/payment-5.webp" },
  ];

  return (
    <HomeSection
      title={t("title")}
      description={`${t("descriptionLine1")} ${t("descriptionLine2")}`}
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
                <div className="bg-[#F7F7F7] rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-24 md:h-28">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={150}
                      height={60}
                      className="object-contain max-w-full max-h-full"
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
