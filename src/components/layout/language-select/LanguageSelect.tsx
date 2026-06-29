"use client";
import { Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { IoChevronDownCircleOutline, IoLanguage } from "react-icons/io5";

const { Option } = Select;

interface Props {
  className?: string;
}

const LanguageSelect: FC<Props> = ({ className="" }) => {
  const locale = useLocale();
  const pathname = usePathname(); // locale-stripped path, e.g. /discover-airplan
  const router = useRouter();     // native Next.js router — preserves query string
  const searchParams = useSearchParams();
  const t = useTranslations();

  const handleChangeLang = (newLocale: string) => {
    const qs = searchParams.toString();
    // Manually build /{newLocale}/pathname?qs so query params are never dropped
    router.replace(`/${newLocale}${pathname}${qs ? `?${qs}` : ""}`);
  };
  return (
    <div className={`selectS1 ${className}`}>
      <Select
        value={locale}
        onChange={handleChangeLang}
        prefix={
          <IoLanguage
            size={20}
            className="text-primary"
          />
        }
        suffixIcon={
          <IoChevronDownCircleOutline
            size={18}
            className="text-primary"
          />
        }>
        <Option value="en">{t("header.languages.english")}</Option>
        <Option value="ar">{t("header.languages.arabic")}</Option>
      </Select>
    </div>
  );
};

export default LanguageSelect;
