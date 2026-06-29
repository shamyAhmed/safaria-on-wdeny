"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import { RiDoubleQuotesR } from "react-icons/ri";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    name: "Robert Fox",
    role: "Customer",
    avatar: "/images/domy-artical.png",
    rating: 5,
  },
  {
    id: 2,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    name: "Dianne Russell",
    role: "Customer",
    avatar: "/images/domy-artical.png",
    rating: 5,
  },
  {
    id: 3,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    name: "Eleanor Pena",
    role: "Customer",
    avatar: "/images/domy-artical.png",
    rating: 5,
  },
  {
    id: 4,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    name: "Wade Warren",
    role: "Customer",
    avatar: "/images/domy-artical.png",
    rating: 5,
  },
  {
    id: 5,
    text: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    name: "Jenny Wilson",
    role: "Customer",
    avatar: "/images/domy-artical.png",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? "fill-[#F5B72E] text-[#F5B72E]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <RiDoubleQuotesR className="text-[rgba(58,87,98,0.6)] text-5xl flex ms-auto" />
      <p className="mt-4 text-gray-600 text-sm leading-relaxed flex-grow">
        {testimonial.text}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="text-right">
            <p className="font-medium text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="bg-[#F5F5F5] py-16 ">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#3D4A3F]"
            dir="rtl"
          >
            اراء العملاء
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-[#3D4A3F] flex items-center justify-center hover:bg-[#2D3A2F] transition-colors"
              aria-label="Next slide"
            >
              <FaArrowRight className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous slide"
            >
              <FaArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          loop={true}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
