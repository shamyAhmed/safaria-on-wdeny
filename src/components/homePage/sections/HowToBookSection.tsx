"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HomeSection } from "../HomeSection";

interface BookingStep {
  id: number;
  stepNumber: string;
  title: string;
  description?: string;
  image: string;
}

export const HowToBookSection = () => {
  const t = useTranslations("homePage.howToBook");

  const steps: BookingStep[] = [
    {
      id: 1,
      stepNumber: "01",
      title: t("steps.1.title"),
      image: "/images/step-1.png",
    },
    {
      id: 2,
      stepNumber: "02",
      title: t("steps.2.title"),
      image: "/images/step-2.png",
    },
    {
      id: 3,
      stepNumber: "03",
      title: t("steps.3.title"),
      image: "/images/step-3.png",
    },
    {
      id: 4,
      stepNumber: "04",
      title: t("steps.4.title"),
      image: "/images/step-4.png",
    },
  ];

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
      className="py-16 bg-gray-50"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col">
            <div className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                {step.stepNumber}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <div className="relative w-full max-w-[200px] h-[350px] md:h-[400px] mx-auto">
                <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HomeSection>
  );
};
