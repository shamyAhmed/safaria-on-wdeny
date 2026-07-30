"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
export const SingleCompanyComponent = () => {
  const images = [
    "/photos/blue-bus.png",
    "/images/contact-us.webp",
    "/photos/blue-bus.png",
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="bg-[#F7F7F7] py-8">
      <div className="container ">
        {/* Breadcrumb */}
        <div className="bg-white rounded-[40px] p-4 mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link
            href="/"
            className="underline font-bold text-[#333] hover:text-[#333] flex items-center gap-2"
          >
            <FaHome className="text-lg" />
            الرئيسية
          </Link>
          <span>-</span>

          <Link
            href="/companies"
            className="underline font-bold text-[#333] hover:text-[#333]"
          >
            الشركات
          </Link>
          <span>-</span>

          <span className="text-[#89878F] font-medium">تفاصيل الشركة </span>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <div className="flex gap-4">
            <div className="relative w-[50px] h-[50px] flex-shrink-0">
              <Image
                src="/photos/nowrasbus-logo.png"
                alt="نورس باص"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#4C4C4C]">نورس باص</h1>
            </div>
          </div>
          <p className="my-6 text-[#666]">
            هذا النص ليس له علاقة بالموضوع هذا النص ليس له علاقة بالموضوع هذا
            النص ليس له علاقة بالموضوع هذا النص ليس له علاقة بالموضوع هذا النص
            ليس له علاقة بالموضوع هذا النص ليس له علاقة بالموضوع هذا النص ليس له
            علاقة بالموضوع هذا النص ليس له علاقة بالموضوع هذا النص ليس له علاقة
            بالموضوع هذا النص ليس له علاقة بالموضوع هذا النص ليس له علاقة
            بالموضوع هذا النص ليس له علاقة بالموضوع
          </p>
          {/* Main Image */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-4">
            <Image
              src={activeImage}
              alt="حافلات ومرافق شركة نورس باص"
              fill
              className="object-cover"
              priority
            />

            {/* Show all images button */}
            <button className="absolute top-4 right-4 bg-black/50 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <FiImage />
              عرض {images.length} صورة
            </button>
          </div>

          {/* Thumbnails */}
          <Swiper
            modules={[FreeMode]}
            spaceBetween={12}
            slidesPerView="auto"
            freeMode
            className="w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="!w-[120px]">
                <div
                  onClick={() => setActiveImage(img)}
                  className={`relative h-[80px] rounded-xl overflow-hidden cursor-pointer border-2 transition ${
                    activeImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`صورة ${index + 1} من صور شركة نورس باص`}
                    fill
                    className="object-cover"
                  />

                  {/* +12 overlay (optional) */}
                  {index === 0 && images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                      +{images.length - 1}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
