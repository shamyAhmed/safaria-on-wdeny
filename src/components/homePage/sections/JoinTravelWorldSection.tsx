"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

const topGallery: GalleryItem[] = [
  { id: 1, src: "/images/about/about-banner.png", alt: "Top gallery image 1" },
  { id: 2, src: "/images/home-banner.png", alt: "Top gallery image 2" },
  {
    id: 3,
    src: "/images/what-we-offer/banner.png",
    alt: "Top gallery image 3",
  },
  {
    id: 4,
    src: "/images/why-the-studio-image.png",
    alt: "Top gallery image 4",
  },
  {
    id: 5,
    src: "/images/about/about-restless.png",
    alt: "Top gallery image 5",
  },
  {
    id: 6,
    src: "/images/what-we-offer/banner.png",
    alt: "Top gallery image 6",
  },
  {
    id: 7,
    src: "/images/home-banner.png",
    alt: "Top gallery image 7",
  },
  {
    id: 8,
    src: "/images/about/about-banner.png",
    alt: "Top gallery image 8",
  },
];

const bottomGallery: GalleryItem[] = [
  { id: 1, src: "/images/home-banner.png", alt: "Bottom gallery image 1" },
  {
    id: 2,
    src: "/images/what-we-offer/banner.png",
    alt: "Bottom gallery image 2",
  },
  {
    id: 3,
    src: "/images/why-the-studio-image.png",
    alt: "Bottom gallery image 3",
  },
  {
    id: 4,
    src: "/images/about/about-restless.png",
    alt: "Bottom gallery image 4",
  },
  {
    id: 5,
    src: "/images/about/about-banner.png",
    alt: "Bottom gallery image 5",
  },
  {
    id: 6,
    src: "/images/why-the-studio-image.png",
    alt: "Bottom gallery image 6",
  },
  {
    id: 7,
    src: "/images/what-we-offer/banner.png",
    alt: "Bottom gallery image 7",
  },
  {
    id: 8,
    src: "/images/home-banner.png",
    alt: "Bottom gallery image 8",
  },
];

function ImageStrip({
  items,
  dir,
  sidePaddingClass = "",
}: {
  items: GalleryItem[];
  dir?: "ltr" | "rtl";
  sidePaddingClass?: string;
}) {
  return (
    <div dir={dir} className="overflow-hidden">
      <div className={`flex min-w-max items-center gap-3 md:gap-4 ${sidePaddingClass}`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="relative h-[132px] w-[180px] md:h-[184px] md:w-[252px] rounded-[14px] overflow-hidden border-[6px] border-[#66A9D4]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const JoinTravelWorldSection = () => {
  const locale = useLocale();
  const t = useTranslations("homePage.joinTravelWorld");
  const topStripDir: "ltr" | "rtl" = locale === "ar" ? "ltr" : "rtl";

  return (
    <section className="bg-[#0074C3] py-12 md:py-16">
      <ImageStrip
        items={topGallery}
        dir={topStripDir}
        sidePaddingClass="md:ps-[100px]"
      />

      <div className="container">
        <div className="mx-auto max-w-4xl py-10 md:py-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-white">
            {t("title")}
          </h2>
          <p className="text-lg leading-relaxed mb-2 text-white/95">
            {t("description1")}
          </p>
          <p className="text-lg leading-relaxed mb-8 text-white/95">
            {t("description2")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            <Link
              href="/auth/register-company"
              className="rounded-xl bg-transparent px-5 py-3 text-white font-semibold hover:bg-white/10 transition-colors">
              {t("button1")}
            </Link>
            <Link
              href="/auth/register-company"
              className="rounded-xl bg-white px-5 py-3 text-[#0074C3] font-semibold hover:bg-[#F4F4F4] hover:text-[#0074C3] transition-colors">
              {t("button2")}
            </Link>
          </div>
        </div>
      </div>

      <ImageStrip
        items={bottomGallery}
        sidePaddingClass="md:ps-[100px]"
      />
    </section>
  );
};
