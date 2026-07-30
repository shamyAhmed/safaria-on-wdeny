// components/home/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { HeroFormsSkeleton } from "./HeroFormsSkeleton";

const HeroForms = dynamic(
  () => import("./HeroForms").then((m) => ({ default: m.HeroForms })),
  { ssr: false, loading: () => <HeroFormsSkeleton /> },
);

export function HeroSection() {
  const t = useTranslations("homePage.hero");

  return (
    <section className="hero-section relative w-full">
      <div
        className="hero-media"
        aria-hidden="true">
        <Image
          src="/images/home-hero.webp"
          alt={t("imageAlt")}
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
        />
        <div className="hero-media-shade" />
      </div>
      <div
        className="hero-gradient"
        aria-hidden="true"
      />

      <div className="container relative z-[1]">
        <span className="px-4 py-3 bg-white/20 backdrop-blur-md border font-bold border-white text-white rounded-[250px] block w-fit">
          {t("badge")}
        </span>
        <h1 className="font-bold text-5xl text-white my-2 mt-4">
          {t("title")}
        </h1>
        <p className="mb-4 md:mb-16 text-white text-lg">{t("description")}</p>

        <HeroForms />
      </div>
    </section>
  );
}
