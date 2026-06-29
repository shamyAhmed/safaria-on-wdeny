"use client";
import { useEffect, useRef } from "react";
import PartnerWithUsModal from "@/components/tools/modal/partner-with-us-modal/PartnerWithUsModal";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { FaHome } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface AboutStarterSectionProps {
  // data: {
  //   about_hero_title_en: string;
  //   about_hero_title_ar: string;
  //   about_hero_description_en: string;
  //   about_hero_description_ar: string;
  // };
}

export const AboutStarterSection = ({}: AboutStarterSectionProps) => {
  return (
    <section className="page-banner">
      <div className="container">
        <h1 className="text-white text-4xl font-bold mb-6">تعرف على وديني</h1>
        <ul className="flex items-center justify-center gap-2">
          <li className="font-bold">
            <Link href={"/"}>
              <FaHome />
              الرئيسية
            </Link>
          </li>
          <li>-</li>
          <li className="">
            <Link href={"/about-us"} className="text-white/80">
              {" "}
              عن المنصة
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
