"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiCalendar,
  FiClock,
  FiInfo,
  FiShare2,
} from "react-icons/fi";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PrivateCarCardProps {
  trip: {
    id: string;
    company: string;
    companyLogo: string;
    carModel: string;
    rating: number;
    reviewCount: number;
    pricePerDay: number;
    currency: string;
    carImages: string[];
    features: string[];
    pickupDate: string;
    pickupTime: string;
    availableNow: boolean;
  };
  onBookNow?: (carId: string) => void;
}

export const PrivateCarCard = ({ trip, onBookNow }: PrivateCarCardProps) => {
  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(trip.id);
    }
  };

  return (
    <div className="bg-[#FBFBFD] rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Right Side - Car Images */}
        <div className="lg:col-span-5 relative h-80 lg:h-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: `.swiper-button-next-${trip.id}`,
              prevEl: `.swiper-button-prev-${trip.id}`,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !w-2 !h-2 !bg-white !opacity-50",
              bulletActiveClass: "swiper-pagination-bullet-active !opacity-100",
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {trip.carImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-80 lg:h-full">
                  <Image
                    src={image}
                    alt={`${trip.carModel} ${index + 1}`}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className={`swiper-button-prev-${trip.id} absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors`}
          >
            <FiChevronLeft className="text-gray-700 text-lg" />
          </button>
          <button
            className={`swiper-button-next-${trip.id} absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors`}
          >
            <FiChevronRight className="text-gray-700 text-lg" />
          </button>
        </div>

        {/* Left Side - Car Details */}
        <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Company Logo */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={trip.companyLogo}
                  alt={trip.company}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Company & Car Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  شركة {trip.company}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <FiStar className="text-yellow-500 text-base fill-current" />
                  <span className="text-gray-700 font-medium">
                    ({trip.rating})
                  </span>
                </div>
              </div>
            </div>

            {/* Available Badge */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiCheck className="text-green-600" />
              <span>دخلنا وادينا</span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex items-center flex-wrap gap-4 mb-6">
            {trip.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700 border border-[#E7F1F8] p-2 bg-white rounded-2xl"
              >
                <FiCheck className="text-green-600 " />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Pickup Date & Time */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <FiCalendar className="text-gray-500" />
              <span className="text-sm">السبت 24 أكتوبر</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiClock className="text-gray-500" />
              <span className="text-sm">10:00 صباحا</span>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between mt-auto rounded-2xl">
            {/* Left Side - Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <FiInfo className="text-lg" />
                <span>التفاصيل</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <FiShare2 className="text-lg" />
                <span>مشاركة</span>
              </button>
              {trip.availableNow && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  <span>متوفر الآن للحجز</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Pricing Section */}
      <div className="bg-white px-6 m-4 lg:px-8 py-4 rounded-xl">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">سعر الرحلة</p>
            <p className="text-3xl font-bold text-[#0074C3]">
              {trip.pricePerDay}
              <span className="text-base font-normal text-gray-600 mr-2">
                {trip.currency}/مقعد
              </span>
            </p>
          </div>

          {/* Book Button */}
          <Button
            type="primary"
            size="large"
            onClick={handleBookNow}
            icon={<FiChevronLeft />}
          >
            احجز رحلتك الآن
          </Button>
        </div>
      </div>
    </div>
  );
};
