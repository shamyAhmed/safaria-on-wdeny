"use client";
import { Row, Col, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function AboutSection() {
  const t = useTranslations("homePage.about");
  const getLink = useLocalizedLink();

  const slides = [
    {
      id: 1,
      src: "/images/login.webp",
      alt: t("slides.1.alt"),
    },
    {
      id: 2,
      src: "/images/contact-us.webp",
      alt: t("slides.2.alt"),
    },
    {
      id: 3,
      src: "/images/home-hero.webp",
      alt: t("slides.3.alt"),
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-[#FBFBFD]">
      <div className="container">
        <div className="flex gap-4 md:gap-2 flex-col md:flex-row justify-between">
          {/* ── Text Column ── */}
          <div className="md:max-w-[430px] py-[35px] flex justify-center items-center">
            <div className="gap-5 h-full flex flex-col flex-1">
              <h2 className="text-[40px] leading-[52px] font-black text-primary">
                {t("title")}
              </h2>

              <p className="text-gray-500 text-base leading-8">
                {t("description1")}
              </p>

              <p className="text-gray-500 text-base leading-8">
                {t("description2")}
              </p>

              <Button
                type="primary"
                size="large"
                href={getLink("/contact-us")}
                className="min-w-40 mt-auto">
                {t("contactButton")}
              </Button>
            </div>
          </div>

          {/* ── Swiper Column ── */}
          <div className="w-full relative px-4 md:w-[min(60%,708px)] flex justify-center items-center shrink-0">
            <div className="relative rounded-2xl overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                navigation={{
                  prevEl: ".swiper-next",
                  nextEl: ".swiper-prev",
                }}
                dir="ltr"
                loop
                className="rounded-2xl gap-2"
                breakpoints={{
                  0: {
                    slidesPerView: 1.5
                  },
                  768: {
                    slidesPerView: 1.5,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    //   slidesOffsetBefore: 15,
                    //   slidesOffsetAfter: 15,
                  },
                }}>
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      className="overflow-hidden aspect-square shrink-0 max-h-[462px] object-cover rounded-2xl"
                      height={462}
                      width={462}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
              <button className="swiper-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px] rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg transition-colors">
                <RightOutlined />
              </button>
              <button className="swiper-next absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px] rounded-full bg-primary text-white flex items-center justify-center shadow-lg  transition-colors">
                <LeftOutlined />
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}
