"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import dayjs from "dayjs";
import { useLocale, useTranslations } from "next-intl";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import useFormatDate from "@/hooks/useFormatDate";

export const FeaturedArticlesSection = ({ articles }) => {
  const locale = useLocale();
  const isEnglish = locale === "en";
  const t = useTranslations("featuredArticlesSection");
  const date = useFormatDate();
  const getLink = useLocalizedLink();

  return (
    <section className="featured-articles-section">
      <div className="content container">
        <h2>{t("title")}</h2>
        <p>{t("description")}</p>
      </div>

      {/* Article content is fully rendered for SEO */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          // pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1.25,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            },
            768: {
              slidesPerView: 2,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            },
            1024: {
              slidesPerView: 2.5,
              slidesOffsetBefore: 160,
              slidesOffsetAfter: 160,
            },
          }}
        >
          {articles?.map((article, idx) => (
            <SwiperSlide key={idx}>
              <Link href={getLink(`/insights/${article.id}`)}>
                <div className="article-card">
                  <div className="article-image">
                    <Image
                      src={article?.cover_image_url}
                      alt={isEnglish ? article?.title?.en : article?.title?.ar}
                      fill
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div className="article-content">
                    <h3>
                      {isEnglish ? article?.title?.en : article?.title?.ar}
                    </h3>
                    <div className="flex items-center gap-6">
                      <span>{article?.author}</span>
                      <span>
                        {date.numeric(article?.published_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-navigation">
          <button className="swiper-button-prev">
            <GoChevronLeft />
          </button>
          <button className="swiper-button-next">
            <GoChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
