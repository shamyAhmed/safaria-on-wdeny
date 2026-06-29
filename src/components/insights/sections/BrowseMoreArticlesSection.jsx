"use client";

import { Col, Row } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Pagination } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

gsap.registerPlugin(ScrollTrigger);

const ArrowIcon = ({ isEnglish }) => (
  <span className={`${!isEnglish && "rotate-180"}`}>
    {/* SVG omitted for brevity */}
  </span>
);

export const BrowseMoreArticlesSection = ({ articles, total, currentPage }) => {
  const locale = useLocale();
  const t = useTranslations("");
  const isEnglish = locale === "en";
  const router = useRouter();
  const searchParams = useSearchParams();
  const articlesRef = useRef();
  const pathname = usePathname();
  const getLink = useLocalizedLink();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".article-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: articlesRef.current,
          start: "top 80%",
        },
      });
    }, articlesRef);

    return () => ctx.revert();
  }, []);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="browse-more-articles-section" id="latest-article">
      <div className="container">
        <div className="content">
          <h3>{t("browseMoreArticlesSection.heading")}</h3>
          <p>{t("browseMoreArticlesSection.description")}</p>
        </div>

        <div className="articals" ref={articlesRef}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <div className="article-card main-card">
                <h4>
                  {isEnglish ? articles[0]?.title?.en : articles[0]?.title?.ar}
                </h4>
                <p>
                  {isEnglish
                    ? articles[0]?.description?.en
                    : articles[0]?.description?.ar}
                </p>

                <Link
                  href={getLink(`/insights/${articles[0]?.id}`)}
                  className="read-more"
                >
                  {t("homePage.learnMore")}
                </Link>
                {articles[0]?.cover_image_url && (
                  <div className="relative h-[288px] w-full overflow-hidden">
                    <Image
                      src={articles[0]?.cover_image_url}
                      fill
                      objectFit="cover"
                      alt={articles[0]?.title?.en}
                    />
                  </div>
                )}
              </div>
            </Col>

            <Col xs={24} md={12}>
              <Row gutter={[32, 32]}>
                {articles?.slice(1, 3)?.map((article) => (
                  <Col xs={24} sm={24} key={article.id}>
                    <div className="article-card">
                      <h4>
                        {isEnglish ? article?.title?.en : article?.title?.ar}
                      </h4>
                      <p>
                        {isEnglish
                          ? article?.description?.en
                          : article?.description?.ar}
                      </p>

                      <Link
                        href={getLink(`/insights/${article?.id}`)}
                        className="read-more"
                      >
                        {t("homePage.learnMore")}{" "}
                        <ArrowIcon isEnglish={isEnglish} />
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            {articles?.slice(3)?.map((article) => (
              <Col xs={24} md={12} key={article.id}>
                <div className="article-card">
                  <h4>{isEnglish ? article?.title?.en : article?.title?.ar}</h4>
                  <p>
                    {isEnglish
                      ? article?.description?.en
                      : article?.description?.ar}
                  </p>
                  <Link
                    href={getLink(`/insights/${article?.id}`)}
                    className="read-more"
                  >
                    {t("homePage.learnMore")}{" "}
                    <ArrowIcon isEnglish={isEnglish} />
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {total > 15 && (
          <div className="pagination-wrapper">
            <Pagination
              current={currentPage}
              total={total}
              pageSize={15}
              showSizeChanger={false}
              onChange={(page) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", page.toString());
                router.push(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });

                // Smooth scroll back
                articlesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
