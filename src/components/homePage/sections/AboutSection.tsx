"use client";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useLocale } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { SplitContentBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText, toParagraphs } from "@/utils/localizedText";
import { CmsImage } from "@/components/common/CmsImage";

export default function AboutSection({ data }: { data: SplitContentBlockData }) {
  const locale = useLocale();
  const getLink = useLocalizedLink();

  const title = pickText(data.title, locale);
  const paragraphs = toParagraphs(pickText(data.body, locale));
  const ctaLabel = pickText(data.cta_label, locale);

  // Blank entries are kept rather than filtered: each one is a gallery slot the
  // CMS still owes an image, and the placeholder says so.
  const slides = data.media ?? [];

  return (
    <section className="py-10 md:py-20 bg-[#FBFBFD]">
      <div className="container">
        <div className="flex gap-4 md:gap-2 flex-col md:flex-row justify-between">
          {/* ── Text Column ── */}
          <div className="md:max-w-[430px] py-[35px] flex justify-center items-center">
            <div className="gap-5 h-full flex flex-col flex-1">
              <h2 className="text-[40px] leading-[52px] font-black text-primary">
                {title}
              </h2>

              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-500 text-base leading-8">
                  {paragraph}
                </p>
              ))}

              {ctaLabel && data.cta_url && (
                <Button
                  type="primary"
                  size="large"
                  href={getLink(data.cta_url)}
                  className="min-w-40 mt-auto">
                  {ctaLabel}
                </Button>
              )}
            </div>
          </div>

          {/* ── Swiper Column ── */}
          <div className="w-full relative px-4 md:w-[min(60%,708px)] flex justify-center items-center shrink-0">
            <div className="relative rounded-2xl overflow-hidden">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                navigation={{
                  prevEl: ".swiper-next",
                  nextEl: ".swiper-prev",
                }}
                dir="ltr"
                loop={slides.length > 1}
                className="rounded-2xl gap-2"
                breakpoints={{
                  0: {
                    slidesPerView: 1.5
                  },
                  768: {
                    slidesPerView: 1.5,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    //   slidesOffsetBefore: 15,
                    //   slidesOffsetAfter: 15,
                  },
                }}>
                {slides.map((src, index) => (
                  <SwiperSlide key={`${src}-${index}`}>
                    <CmsImage
                      src={src}
                      alt={`${title} ${index + 1}`}
                      className="overflow-hidden aspect-square shrink-0 max-h-[462px] object-cover rounded-2xl"
                      height={462}
                      width={462}
                      placeholderClassName="aspect-square max-h-[462px] rounded-2xl"
                      placeholderIconClassName="text-4xl"
                      showPlaceholderLabel={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
              <button className="swiper-prev absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px] rounded-full bg-white text-gray-700 flex items-center justify-center shadow-lg transition-colors">
                <RightOutlined />
              </button>
              <button className="swiper-next absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px] rounded-full bg-primary text-white flex items-center justify-center shadow-lg  transition-colors">
                <LeftOutlined />
              </button>
          </div>
        </div>
      </div>
    </section>
  );
}
