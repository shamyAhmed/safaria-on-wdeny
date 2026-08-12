"use client";

import { useRef } from "react";
import { Button } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";
import { BlogCard } from "@/components/blogs/cards/BlogCard";
import { BlogCardSkeleton } from "@/components/blogs/cards/BlogCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { HomeSection } from "../HomeSection";
import "swiper/css";
import { Link } from "@/i18n/navigation";
import useGetBlogs from "@/app/[locale]/_hooks/useGetBlogs";
import { PostsBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";

export const HomeBlogsSection = ({ data }: { data: PostsBlockData }) => {
  const t = useTranslations("homePage.blogsShowcase");
  const locale = useLocale();
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: allBlogs = [], isLoading } = useGetBlogs();

  // The block can hand-pick the posts to showcase; when it doesn't, fall back
  // to the latest from the live blog feed.
  const curated = data.posts ?? [];
  const blogs = (curated.length > 0 ? curated : allBlogs).slice(0, 3);
  const isPending = curated.length === 0 && isLoading;

  // With nothing published there is no showcase to make — drop the whole band
  // rather than leaving an empty section on the home page.
  if (!isPending && blogs.length === 0) return null;

  return (
    <HomeSection
      title={pickText(data.title, locale)}
      description={pickText(data.description, locale)}
      className="py-16 bg-primary"
      descriptionClassName="max-w-3xl"
      light>
      <div className="container">
        {isPending ? (
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
                    backgroundImage={blog.image?.url}
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
