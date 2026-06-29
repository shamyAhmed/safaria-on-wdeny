"use client";
import React, { useRef, useState } from "react";
import { Button, Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FiStar,
  FiWifi,
  FiMonitor,
  FiMusic,
  FiCoffee,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { IoIosBus } from "react-icons/io";
import { MdLocalOffer } from "react-icons/md";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "@/i18n/navigation";
import { FaMapPin } from "react-icons/fa6";

interface BusTripCardProps {
  trip: {
    id: string;
    company: string;
    companyLogo: string;
    rating: number;
    reviewCount: number;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    date: string;
    busImages: string[];
    departureCity: string;
    arrivalCity: string;
    departureStation: string;
    arrivalStation: string;
    amenities: {
      wifi: boolean;
      tv: boolean;
      music: boolean;
      coffee: boolean;
      charging: boolean;
    };
    classOptions: {
      id: string;
      name: string;
      price: number;
      available: boolean;
    }[];
    seatsLeft: number;
  };
  onSelectSeat?: (tripId: string, classId: string) => void;
}

export const BusTripCard = ({ trip, onSelectSeat }: BusTripCardProps) => {
  const [selectedDepartureClass, setSelectedDepartureClass] = useState<string>(
    trip.classOptions.find((c) => c.available)?.id || ""
  );
  const [selectedArrivalClass, setSelectedArrivalClass] = useState<string>(
    trip.classOptions.find((c) => c.available)?.id || ""
  );

  // Departure navigation refs
  const depPrevRef = useRef<HTMLButtonElement | null>(null);
  const depNextRef = useRef<HTMLButtonElement | null>(null);

  // Arrival navigation refs
  const arrPrevRef = useRef<HTMLButtonElement | null>(null);
  const arrNextRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectSeat = () => {
    if (onSelectSeat) {
      onSelectSeat(trip.id, selectedDepartureClass);
    }
  };

  return (
    <div className="bg-[#FBFBFD] rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 mb-4">
      {/* Top Section */}
      <div className="flex items-start gap-4  mb-6">
        {/* Bus Image Swiper */}
        <div className="relative w-64 h-32 rounded-xl overflow-hidden">
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
              bulletActiveClass:
                "swiper-pagination-bullet-active !w-6 !opacity-100 !rounded-md",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full"
          >
            {trip.busImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-32">
                  <Image
                    src={image}
                    alt={`Bus ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className={`swiper-button-prev-${trip.id} absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors`}
          >
            <FiChevronLeft className="text-gray-700 text-sm" />
          </button>
          <button
            className={`swiper-button-next-${trip.id} absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors`}
          >
            <FiChevronRight className="text-gray-700 text-sm" />
          </button>
        </div>
        <div className="flex-1">
          {/* Company Info */}
          <div className="flex items-center justify-between gap-4  flex-1">
            <div className="flex gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={trip.companyLogo}
                  alt={trip.company}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#4C4C4C]">
                  {trip.company}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#89878F] font-medium">
                    ({trip.rating})
                  </span>
                  <FiStar className="text-yellow-500 text-base fill-current" />
                </div>
              </div>
            </div>

            <Link
              href={"#"}
              className="text-sm flex items-center text-[#819DAF]"
            >
              <FaMapPin />
              الذهاب للمحطة
            </Link>
          </div>

          {/* Time and Route */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-shrink-0">
              <p className="text-xl font-bold text-[#4C4C4C]">
                {trip.departureTime}
              </p>
              <p className="text-sm text-gray-600">{trip.date}</p>
            </div>

            <div className="flex-1 flex items-center justify-center px-8">
              <div className="w-full max-w-xs relative">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <div className="flex-1 h-px bg-gray-300 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-2">
                      <IoIosBus className="text-2xl text-primary" />
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-sm text-[#819DAF] bg-white px-3 py-1 rounded-full border border-[#E7F1F8]">
                    {trip.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left flex-shrink-0">
              <p className="text-xl font-bold text-[#4C4C4C]">
                {trip.arrivalTime}
              </p>
              <p className="text-sm text-[#819DAF]">{trip.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* From Section with Class Selection */}
      <Row gutter={[16, 16]}>
        {/* ================= Departure ================= */}
        <Col xs={24} md={12}>
          <div className="bg-white p-2 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">من</span>
                <span className="text-base font-medium text-[#4C4C4C]">
                  {trip.departureCity}
                </span>
              </div>

              {/* Custom navigation */}
              <div className="flex gap-2">
                <button
                  ref={depNextRef}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
                >
                  <FiChevronRight className="text-xs" />
                </button>
                <button
                  ref={depPrevRef}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
                >
                  <FiChevronLeft className="text-xs" />
                </button>
              </div>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = depPrevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = depNextRef.current;
              }}
              navigation={{
                prevEl: depPrevRef.current,
                nextEl: depNextRef.current,
              }}
            >
              {trip.classOptions.map((option) => (
                <SwiperSlide key={option.id} className="!w-auto">
                  <button
                    onClick={() => setSelectedDepartureClass(option.id)}
                    disabled={!option.available}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedDepartureClass === option.id
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : option.available
                          ? "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
                          : "bg-gray-50 text-gray-400 border-2 border-transparent cursor-not-allowed"
                    }`}
                  >
                    {option.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Col>

        {/* ================= Arrival ================= */}
        <Col xs={24} md={12}>
          <div className="bg-white p-2 rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">إلى</span>
                <span className="text-base font-medium text-[#4C4C4C]">
                  {trip.arrivalCity}
                </span>
              </div>

              {/* Custom navigation */}
              <div className="flex gap-2">
                <button
                  ref={arrNextRef}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
                >
                  <FiChevronRight className="text-xs" />
                </button>
                <button
                  ref={arrPrevRef}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition"
                >
                  <FiChevronLeft className="text-xs" />
                </button>
              </div>
            </div>

            {/* Swiper */}
            <Swiper
              modules={[Navigation]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = arrPrevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = arrNextRef.current;
              }}
              navigation={{
                prevEl: arrPrevRef.current,
                nextEl: arrNextRef.current,
              }}
            >
              {trip.classOptions.map((option) => (
                <SwiperSlide key={option.id} className="!w-auto">
                  <button
                    onClick={() => setSelectedArrivalClass(option.id)}
                    disabled={!option.available}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedArrivalClass === option.id
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : option.available
                          ? "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
                          : "bg-gray-50 text-gray-400 border-2 border-transparent cursor-not-allowed"
                    }`}
                  >
                    {option.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Col>
      </Row>

      {/* Footer */}
      <div className="flex items-center justify-between bg-white p-4 mt-4 rounded-2xl">
        {/* Amenities */}
        <div className="flex items-center justify-end gap-4">
          {trip.amenities.charging && (
            <FiZap className="text-xl text-gray-500" />
          )}
          {trip.amenities.coffee && (
            <FiCoffee className="text-xl text-gray-500" />
          )}
          {trip.amenities.music && (
            <FiMusic className="text-xl text-gray-500" />
          )}
          {trip.amenities.tv && <FiMonitor className="text-xl text-gray-500" />}
          {trip.amenities.wifi && <FiWifi className="text-xl text-gray-500" />}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MdLocalOffer className="text-blue-600 text-base" />
            <span className="text-blue-600 text-sm">
              متبقي {trip.seatsLeft} مقاعد
            </span>
          </div>

          <Button
            type="primary"
            size="large"
            onClick={handleSelectSeat}
            //   className="!bg-[#0074C3] !border-[#0074C3] hover:!bg-[#005A9C] !px-8 !h-12 flex items-center gap-2"
          >
            <FiChevronLeft />
            اختيار مقعد
          </Button>
        </div>
      </div>
    </div>
  );
};
