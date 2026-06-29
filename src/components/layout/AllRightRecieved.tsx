"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export const AllRightRecieved = () => {
  const t = useTranslations("allRights");

  return (
    <div className="bg-[#000D1B] text-white py-6 text-xs sm:text-sm md:text-base">
      <div className="container flex items-center justify-between flex-col md:flex-row gap-4 md:gap-2">
        <p>
          {t("prefix")} <span className="text-primary">{t("brand")}</span>{" "}
          @ {new Date().getFullYear()}
        </p>
        <div className="flex gap-2">
          <Image
            src="/images/logo-white.png"
            alt={t("logoAlt")}
            width={140}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};
