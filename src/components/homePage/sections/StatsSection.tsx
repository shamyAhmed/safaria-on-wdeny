import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function StatsSection() {
  const t = await getTranslations("homePage.stats");

  const stats = [
    {
      key: "coveredCities",
      icon: "/images/icons/city.webp",
      value: t("items.coveredCities.value"),
      label: t("items.coveredCities.label"),
    },
    {
      key: "satisfactionRate",
      icon: "/images/icons/thoughts.webp",
      value: t("items.satisfactionRate.value"),
      label: t("items.satisfactionRate.label"),
    },
    {
      key: "customers",
      icon: "/images/icons/group.webp",
      value: t("items.customers.value"),
      label: t("items.customers.label"),
    },
  ];

  return (
    <div className="container pt-[87px] pb-[62px]">
      <div className="flex flex-col items-center md:items-stretch md:flex-row gap-4 md:gap-0 md:justify-around">
        {stats.map(({ key, icon, value, label }) => (
          <div key={key} className="w-full max-w-[420px] md:w-auto">
            <div className="flex md:flex-col lg:flex-row gap-6">
              <div className="relative shrink-0 h-[80px] w-[80px]">
                <div className="absolute inset-0 rounded-full bg-primary/10" />
                <div className="absolute h-[56px] w-[56px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary flex items-center justify-center">
                  <Image
                    src={icon}
                    alt={t("iconAlt", { label })}
                    width={28}
                    height={28}
                  />
                </div>
              </div>
              <div className="py-[8.5px]">
                <p className="text-3xl font-black text-gray-900">{value}</p>
                <p className="text-sm text-gray-400 mt-1">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
