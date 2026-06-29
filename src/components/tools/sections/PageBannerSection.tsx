import { Link } from "@/i18n/navigation";
import { FaHome } from "react-icons/fa";
import { useTranslations } from "next-intl";

interface PageBannerSectionProps {
  title: string;
  currentPage: string;
  currentLink: string;
}

export const PageBannerSection = ({
  title,
  currentPage,
  currentLink,
}: PageBannerSectionProps) => {
  const t = useTranslations("common");
  return (
    <section className="page-banner px-4">
      <div className="container text-center">
        <h1 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">{title}</h1>

        <ul className="flex items-center justify-center gap-3">
          <li className="font-bold">
            <Link href="/" className="flex items-center gap-1">
              <FaHome />
              {t("home")}
            </Link>
          </li>

          <li>-</li>

          <li>
            <Link href={currentLink} className="text-white/80">
              {currentPage}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};
