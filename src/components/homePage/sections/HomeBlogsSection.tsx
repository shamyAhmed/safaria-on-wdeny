"use client";

import { useRef } from "react";
import { Button } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiNewspaper } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { BlogCard } from "@/components/blogs/cards/BlogCard";
import { BlogCardSkeleton } from "@/components/blogs/cards/BlogCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { HomeSection } from "../HomeSection";
import "swiper/css";
import { Link } from "@/i18n/navigation";
import useGetBlogs from "@/app/[locale]/_hooks/useGetBlogs";

export const HomeBlogsSection = () => {
  const t = useTranslations("homePage.blogsShowcase");
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: allBlogs = [], isLoading } = useGetBlogs();
  const blogs = allBlogs.slice(0, 3);

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
      className="py-16 bg-primary"
      descriptionClassName="max-w-3xl"
      light>
      <div className="container">
        {isLoading ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={false}
            breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 20 } }}
            className="home-blogs-swiper">
            {Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={i}>
                <BlogCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
              <HiNewspaper className="text-4xl text-white/50" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t("empty.title")}</h3>
            <p className="text-sm text-white/60 max-w-xs">{t("empty.description")}</p>
          </div>
        ) : (
          <>
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              loop={true}
              breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 20 } }}
              className="home-blogs-swiper">
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <BlogCard
                    slug={blog.slug}
                    tag={blog.category?.name}
                    title={blog.title}
                    description={blog.description?.slice(0, 100)}
                    buttonText={t("cardButton")}
                    backgroundImage={blog.image.url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700"
                aria-label="Previous">
                <FiChevronLeft className="text-xl rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white"
                aria-label="Next">
                <FiChevronRight className="text-xl rtl:rotate-180" />
              </button>
            </div>
          </>
        )}

        <div className="flex items-center justify-center mt-10">
          <Link href="blogs">
            <Button
              type="primary"
              className="!bg-white !border-white !text-primary !font-bold !h-12 !px-10 !rounded-xl">
              {t("more")}
            </Button>
          </Link>
        </div>
      </div>
    </HomeSection>
  );
};
