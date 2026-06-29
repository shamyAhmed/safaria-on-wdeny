"use client";

import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useGetSettings } from "@/hooks/useGetSettings";

const AppHero = () => {
  const t = useTranslations("appHero");
  const { settings } = useGetSettings();

  return (
    <section className="app-hero text-center lg:text-start">
      <div className="px-4">
        <div className="container rounded-[50px]">
          <Image
            src="/images/footer-bg.png"
            alt="footer-bg"
            fill
            className="object-cover rounded-[50px]"
          />
          <div className="app-hero__card">
            {/* Phone */}
            <div className="app-hero__phone hidden lg:flex absolute left-6 bottom-0">
              <Image
                src="/images/footer-app.png" // صورة الموبايل
                alt={t("imageAlt")}
                width={440}
                height={670}
                priority
              />
            </div>

            {/* Content */}
            <div className="app-hero__content mx-auto lg:mx-0 ltr:lg:ms-auto">
              <h2 className="text-white text-2xl font-semibold md:text-4xl md:font-bold">
                <span className="text-primary"> {t("titleHighlight")} </span>
                <br className="sm:hidden" />
                {t("titleRest")}
              </h2>

              <p className="md:text-lg">{t("description")}</p>

              <div className="store-buttons flex-col sm:flex-row justify-center lg:justify-normal ltr:sm:justify-end ltr:md:justify-center ltr:lg:justify-normal">
                <a
                  href={settings?.app_link_on_google_store || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn google flex justify-center items-center gap-2 sm:inline"
                  aria-label={t("googlePlay")}>
                  <FaGooglePlay />
                  {t("googlePlay")}
                </a>

                <a
                  href={settings?.app_link_on_apple_store || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn apple flex justify-center items-center gap-2 sm:inline"
                  aria-label={t("appleStore")}>
                  <FaApple />
                  {t("appleStore")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppHero;
