"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FaHome } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { Col, Row } from "antd";
import { BlogCard } from "../cards/BlogCard";
import useGetBlogs, { BlogPostDetail } from "@/app/[locale]/_hooks/useGetBlogs";
import useFormatDate from "@/hooks/useFormatDate";

interface SingleBlogComponentProps {
  blog: BlogPostDetail;
}

export function SingleBlogComponent({ blog }: SingleBlogComponentProps) {
  const { data: relatedBlogs = [] } = useGetBlogs(blog.category?.id);
  const date = useFormatDate();
  const filtered = relatedBlogs.filter((b) => b.id !== blog.id);

  return (
    <section className="bg-[#F7F7F7] py-8">
      <div className="container">
        {/* Breadcrumb */}
        <div className="bg-white rounded-[40px] p-4 mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link
            href="/"
            className="underline font-bold text-[#333] hover:text-[#333] flex items-center gap-2"
          >
            <FaHome className="text-lg" />
            الرئيسية
          </Link>
          <span>-</span>
          <Link
            href="/blogs"
            className="underline font-bold text-[#333] hover:text-[#333]"
          >
            المدونة
          </Link>
          <span>-</span>
          <span className="text-[#89878F] font-medium">{blog.title}</span>
        </div>

        {/* Blog Card */}
        <div className="bg-white rounded-[40px] p-6 relative">
          {/* Main Image */}
          <div className="relative w-full h-[340px] rounded-2xl overflow-hidden mb-6">
            <Image
              src={blog.image.url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Tag / Category */}
          {blog.category && (
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {blog.category.name}
              </span>
              {blog.created_at && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BsCalendar2Date className="text-lg" />
                  {date.numeric(blog.created_at)}
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            {blog.title}
          </h1>

          {/* Description */}
          {blog.description && (
            <div
              className="text-gray-700 leading-8 space-y-4 text-sm md:text-base prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          )}
        </div>

        {/* Related blogs */}
        {filtered.length > 0 && (
          <div className="bg-white rounded-[40px] p-8 mt-10">
            <h4 className="text-primary font-bold text-3xl mb-8">
              مقالات ذات صلة
            </h4>
            <Row gutter={[24, 24]}>
              {filtered.map((related) => (
                <Col key={related.id} xs={24} md={8}>
                  <BlogCard
                    title={related.title}
                    buttonText="تفاصيل أكثر"
                    backgroundImage={related.image.url}
                    slug={related.slug}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </section>
  );
}
