import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BannerBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { CmsImage } from "@/components/common/CmsImage";

/** A single full-width promotional image, optionally linking somewhere. */
export const BannerSection = async ({ data }: { data: BannerBlockData }) => {
  const t = await getTranslations("homePage");
  const alt = data.alt?.trim() || t("bannerImageAlt");

  const banner = (
    <div className="flex items-center justify-center relative h-[560px] rounded-2xl overflow-hidden">
      <CmsImage
        src={data.image}
        alt={alt}
        fill
        className="object-cover"
        placeholderIconClassName="text-5xl"
      />
    </div>
  );

  return (
    <div className="container">
      {data.link?.trim() ? <Link href={data.link}>{banner}</Link> : banner}
    </div>
  );
};
