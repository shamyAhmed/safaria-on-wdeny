"use client";
import { Button, Col, Row } from "antd";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

gsap.registerPlugin(ScrollTrigger);

export const InsightsHeroSection = ({ lastInsight }) => {
  const t = useTranslations("insightsHero");
  const sectionRef = useRef();
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const getLink = useLocalizedLink();

  const articles = [
    {
      id: 1,
      image: "https://preliveapi.sanad.studio/domy-artical7.png",
    },
    {
      id: 2,
      image: "https://preliveapi.sanad.studio/domy-artical8.png",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".content", {
        opacity: 0,
        y: 60,
        duration: 1.8, // slowed from 1.2
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".card", {
        opacity: 0,
        y: 60,
        duration: 1.5, // slowed from 1
        stagger: 0.4, // slightly more spacing between cards
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="insights-hero-section">
      <Row
        gutter={[100, 100]}
        align="middle"
        justify="center"
        className="h-full"
      >
        <Col xs={24} md={24} lg={14}>
          <div className="content ps-[165px] lg:ps-6">
            <h1 dangerouslySetInnerHTML={{ __html: t("title") }} />
            <p>{t("description")}</p>

            <Link href={getLink(`/insights/${lastInsight?.id}`)}>
              <Button type="text" className="leatst-article-button">
                {t("button")}
              </Button>
            </Link>
          </div>
        </Col>
        {isLargeScreen && (
          <Col xs={24} md={24} lg={10}>
            <div className="images-cards flex">
              {articles.map((article, idx) => (
                <div className="card relative" key={idx}>
                  <Image
                    src={article.image}
                    alt={"Article Image"}
                    fill
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Col>
        )}
      </Row>
    </section>
  );
};
