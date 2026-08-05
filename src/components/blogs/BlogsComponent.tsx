"use client";

import React from "react";
import { PageBannerSection } from "../tools/sections/PageBannerSection";
import style from "./styles/blogs.module.scss";
import { Button, Col, Row } from "antd";
import { BlogCard } from "./cards/BlogCard";
import { BlogCardSkeleton } from "./cards/BlogCardSkeleton";
import useGetBlogs from "@/app/[locale]/_hooks/useGetBlogs";
import { HiNewspaper } from "react-icons/hi2";
import { useTranslations } from "next-intl";

export const BlogsComponent = () => {
  const t = useTranslations("blogsPage");
  const { data: blogs = [], isLoading } = useGetBlogs();

  return (
    <div className={style.blogs}>
      <PageBannerSection
        title={t("title")}
        currentLink="/blogs"
        currentPage={t("title")}
      />
      <div className="bg-primary py-20">
        <div className="container">
          {isLoading ? (
            <Row gutter={[24, 24]}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Col key={i} xs={24} md={8}>
                  <BlogCardSkeleton />
                </Col>
              ))}
            </Row>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-5">
                <HiNewspaper className="text-4xl text-white/50" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t("empty.title")}</h3>
              <p className="text-sm text-white/60 max-w-xs">{t("empty.description")}</p>
            </div>
          ) : (
            <>
              <Row gutter={[24, 24]}>
                {blogs.map((blog) => (
                  <Col key={blog.id} xs={24} md={8}>
                    <BlogCard
                      slug={blog.slug}
                      tag={blog.category?.name}
                      title={blog.title}
                      description={blog.description?.slice(0, 100)}
                      buttonText={t("moreDetails")}
                      backgroundImage={blog.image.url}
                    />
                  </Col>
                ))}
              </Row>
              <div className="flex items-center justify-center mt-12">
                <Button
                  type="primary"
                  className="w-[180px] !bg-white !border-white !text-primary"
                >
                  {t("loadMore")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
