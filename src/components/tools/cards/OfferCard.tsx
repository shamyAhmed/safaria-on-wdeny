"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { OfferCardProps } from "@/types/types";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Animated number component with flip effect
function AnimatedDigit({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index?: number;
}) {
  const prevValue = useRef(value);
  const hasChanged = prevValue.current !== value;

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div className="text-center">
      <div className="relative overflow-hidden min-w-[40px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: hasChanged ? -20 : 0, opacity: hasChanged ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="text-2xl font-bold"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className={`${index === 1 ? "text-[#1]" : "text-white/70"} text-xs mt-1`}
        animate={hasChanged ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.div>
    </div>
  );
}

// Animated separator
function AnimatedSeparator() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.4, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      className="text-xl font-bold"
    >
      :
    </motion.span>
  );
}

const bgColorClasses = {
  teal: "bg-[#4a5d6a]",
  gray: "bg-[#9ca3a8]",
  blue: "bg-[#4a7eb8]",
};

const buttonClasses = {
  "outline-white":
    "border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#4a5d6a]",
  dark: "bg-[#2d3a40] text-white border-0 hover:bg-[#1d2a30]",
  white: "bg-white text-[#4a7eb8] border-0 hover:bg-gray-100",
};

export default function OfferCard({
  id,
  title,
  subtitle,
  endDate,
  image,
  bgColor,
  buttonVariant,
  onShopNow,
  index,
}: OfferCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      className={`${bgColorClasses[bgColor]} rounded-xl overflow-hidden flex flex-col h-full min-h-[500px]`}
    >
      {/* Content Section */}
      <div className="p-6 pt-8 text-center flex-1 flex flex-col">
        {/* Subtitle */}
        <p
          className={`${index !== 1 ? "text-white/80" : "text-[#111113]"} text-sm mb-2`}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h3
          className={`${index !== 1 ? "text-white/80" : "text-[#111113]"} text-3xl font-bold mb-4`}
        >
          {title}
        </h3>

        {/* Countdown Timer */}
        <div
          className={`flex items-center justify-center gap-3 mb-6 ${index === 1 ? "text-[#111113]" : "text-white"}`}
        >
          <AnimatedDigit
            value={formatNumber(timeLeft.seconds)}
            label="ثانية"
            index={index}
          />
          <AnimatedSeparator />
          <AnimatedDigit
            value={formatNumber(timeLeft.minutes)}
            label="دقيقه"
            index={index}
          />
          <AnimatedSeparator />
          <AnimatedDigit
            value={formatNumber(timeLeft.hours)}
            label="ساعه"
            index={index}
          />
          <AnimatedSeparator />
          <AnimatedDigit
            value={formatNumber(timeLeft.days)}
            label="يوم"
            index={index}
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onShopNow?.(id)}
          className={`${buttonClasses[buttonVariant]} mx-auto px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all duration-300`}
        >
          اشتري الان
          <FiArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Image Section */}
      <div className="relative h-[350px] w-full mt-auto">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
