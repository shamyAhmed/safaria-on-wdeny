"use client";
import { Button, Col, Row } from "antd";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HowWorksShapeImage from "../../../../public/images/how-works/how-works-shape.svg";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

gsap.registerPlugin(ScrollTrigger);

interface HowWorksSectionProps {
  data: {
    how_it_works_ideation_desc_en: string;
    how_it_works_ideation_desc_ar: string;
    how_it_works_co_creation_desc_en: string;
    how_it_works_co_creation_desc_ar: string;
    how_it_works_funding_desc_en: string;
    how_it_works_funding_desc_ar: string;
    how_it_works_scaling_desc_en: string;
    how_it_works_scaling_desc_ar: string;
    how_it_works_exits_desc_en: string;
    how_it_works_exits_desc_ar: string;
    how_it_works_description_desc_en: string;
    how_it_works_description_desc_ar: string;
  };
}

export const HowWorksSection = ({ data }: HowWorksSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isEnglish = locale === "en";
  const t = useTranslations();
  const getLink = useLocalizedLink();

  const list = [
    {
      desc: isEnglish
        ? data?.how_it_works_ideation_desc_en
        : data?.how_it_works_ideation_desc_ar,
      icon: "/images/how-works/one.svg",
    },
    {
      desc: isEnglish
        ? data?.how_it_works_co_creation_desc_en
        : data?.how_it_works_co_creation_desc_ar,
      icon: "/images/how-works/two.svg",
    },

    {
      desc: isEnglish
        ? data?.how_it_works_funding_desc_en
        : data?.how_it_works_funding_desc_ar,
      icon: "/images/how-works/three.svg",
    },
    {
      desc: isEnglish
        ? data?.how_it_works_scaling_desc_en
        : data?.how_it_works_scaling_desc_ar,
      icon: "/images/how-works/four.svg",
    },
    {
      desc: isEnglish
        ? data?.how_it_works_exits_desc_en
        : data?.how_it_works_exits_desc_ar,
      icon: "/images/how-works/five.svg",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading more smoothly
      gsap.from(".how-works-heading", {
        opacity: 0,
        y: 80,
        duration: 2, // slower
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate list items with slower staggered animation
      gsap.from(".how-works-item", {
        opacity: 0,
        y: 60,
        duration: 1.5, // slower
        stagger: 0.3, // slightly more time between items
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Animate shape with smoother appearance
      gsap.from(".how-works-shape", {
        opacity: 0,
        scale: 0.95,
        duration: 2, // slower
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="how-works-section relative overflow-hidden"
    >
      <div className="content">
        <div className="container">
          <div className="heading how-works-heading">
            <h3> {t("homePage.howWeWork")}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: isEnglish
                  ? data?.how_it_works_description_desc_en
                  : data?.how_it_works_description_desc_ar || "",
              }}
            />
            <Link href={getLink("/what-we-offer")}>
              <Button type="text" className="learn-more">
                {t("homePage.learnMore")}
              </Button>
            </Link>
          </div>
          <ul>
            {list.map((item, index) => (
              <li className="how-works-item" key={index}>
                <div className="list-content">
                  <div>
                    {/* <h4>{item.title}</h4> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.desc,
                      }}
                    />
                  </div>
                  <Image src={item.icon} width={88} height={88} alt={"icon"} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={HowWorksShapeImage}
          width={850}
          height={850}
          alt="Next-Gen"
          className="how-works-shape absolute bottom-0 right-0"
        />
      </div>
      <div className="paint md:hidden" />
    </section>
  );
};
