import Image from "next/image";
import { IconType } from "react-icons";
import { FaMapMarkerAlt, FaSmile, FaUsers, FaStar } from "react-icons/fa";
import { getLocale, getTranslations } from "next-intl/server";
import { StatsBlockData } from "@/app/[locale]/_types/SiteBlocks";
import { pickText } from "@/utils/localizedText";

/**
 * The CMS stores icons as Font Awesome classes. Font Awesome itself isn't
 * bundled, so map the classes it actually emits onto the react-icons
 * equivalents we already ship.
 */
const FA_ICONS: Record<string, IconType> = {
  "fa-map-marker-alt": FaMapMarkerAlt,
  "fa-map-marker": FaMapMarkerAlt,
  "fa-smile": FaSmile,
  "fa-users": FaUsers,
  "fa-user": FaUsers,
  "fa-star": FaStar,
};

const resolveFaIcon = (icon: string): IconType | null => {
  const match = icon.split(/\s+/).find((token) => FA_ICONS[token]);
  return match ? FA_ICONS[match] : FaStar;
};

const isImageIcon = (icon: string) => /^(https?:)?\/\/|^\//.test(icon);

export default async function StatsSection({ data }: { data: StatsBlockData }) {
  const t = await getTranslations("homePage.stats");
  const locale = await getLocale();

  const stats = (data.items ?? []).map((item, index) => ({
    key: `${item.value}-${index}`,
    icon: item.icon ?? "",
    value: item.value,
    label: pickText(item.label, locale),
  }));

  if (stats.length === 0) return null;

  return (
    <div className="container pt-[87px] pb-[62px]">
      <div className="flex flex-col items-center md:items-stretch md:flex-row gap-4 md:gap-0 md:justify-around">
        {stats.map(({ key, icon, value, label }) => {
          const FaIcon = isImageIcon(icon) ? null : resolveFaIcon(icon);

          return (
            <div key={key} className="w-full max-w-[420px] md:w-auto">
              <div className="flex md:flex-col lg:flex-row gap-6">
                <div className="relative shrink-0 h-[80px] w-[80px]">
                  <div className="absolute inset-0 rounded-full bg-primary/10" />
                  <div className="absolute h-[56px] w-[56px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary flex items-center justify-center">
                    {FaIcon ? (
                      <FaIcon className="text-white text-[26px]" aria-hidden />
                    ) : (
                      <Image
                        src={icon}
                        alt={t("iconAlt", { label })}
                        width={28}
                        height={28}
                      />
                    )}
                  </div>
                </div>
                <div className="py-[8.5px]">
                  <p className="text-3xl font-black text-gray-900">{value}</p>
                  <p className="text-sm text-gray-400 mt-1">{label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
