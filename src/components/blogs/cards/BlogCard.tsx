"use client";
import React from "react";
import { Button } from "antd";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "@/i18n/navigation";
import { CmsImage } from "@/components/common/CmsImage";

interface BlogCardProps {
  slug?: string;
  tag?: string;
  title: string;
  description?: string;
  buttonText: string;
  backgroundImage?: string;
}

export const BlogCard = ({
  slug,
  tag,
  title,
  description,
  buttonText,
  backgroundImage,
}: BlogCardProps) => {
  const router = useRouter();
  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden group border border-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CmsImage
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          placeholderClassName="!bg-primary-800/40"
          placeholderIconClassName="text-4xl"
          showPlaceholderLabel={false}
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-800/50 to-primary/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 py-10">
        {/* Tag / Category */}
        {tag && (
          <span className="inline-block self-start bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            {tag}
          </span>
        )}

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-white/80 text-sm md:text-base mb-6 max-w-2xl leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        {slug && (
          <div className="flex justify-end">
            <Button
              type="default"
              size="large"
              onClick={() => router.push(`/blogs/${encodeURIComponent(slug)}`)}
              className="!bg-white/10 backdrop-blur-lg !border-2 !border-white !text-white hover:!bg-white hover:!text-primary !h-14 !px-8 !rounded-xl !text-lg transition-all duration-300 flex items-center gap-2"
            >
              {buttonText}
              <FiChevronLeft className="text-xl ltr:rotate-180" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
