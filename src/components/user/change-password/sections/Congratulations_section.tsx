"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Congratulations = () => {
  const t = useTranslations("auth.congratulations");

  return (
    <div className="text-center py-10">
      <Image
        src={"/images/congratulations.svg"}
        width={456}
        height={456}
        alt="congratulations"
      />
      <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>
      <p className="text-[#B0B0B3] text-xl">{t("description")}</p>
    </div>
  );
};
