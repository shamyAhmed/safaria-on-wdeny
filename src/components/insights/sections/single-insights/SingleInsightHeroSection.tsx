"use client";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { Col, Row } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface Props {
  insight: {
    title: {
      en: string;
      ar: string;
    };
    description: {
      en: string;
      ar: string;
    };
    cover_image_url: string;
  };
}

export const SingleInsightHeroSection = ({ insight }: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  const isEnglish = locale === "en";
  const getLink = useLocalizedLink();

  return (
    <section className="single-insight-hero-section">
      <Row gutter={[100, 16]} align="middle">
        <Col xs={24} md={12} lg={13}>
          <div className="insight-content ps-[160px] lg:ps-6">
            <Link href={getLink(`/insights`)}>
              <span className={`${!isEnglish && "rotate-180"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                >
                  <path
                    d="M15.1919 7.79817L2.75864 7.79817L7.03586 12.0754C7.11304 12.1499 7.1746 12.2391 7.21695 12.3377C7.2593 12.4363 7.28159 12.5423 7.28253 12.6496C7.28346 12.7569 7.26301 12.8633 7.22238 12.9626C7.18175 13.0619 7.12175 13.1522 7.04587 13.228C6.97 13.3039 6.87977 13.3639 6.78046 13.4045C6.68115 13.4452 6.57474 13.4656 6.46745 13.4647C6.36015 13.4638 6.25411 13.4415 6.15552 13.3991C6.05693 13.3568 5.96776 13.2952 5.89322 13.218L0.236597 7.5614C0.0851042 7.40986 0 7.20436 0 6.99008C0 6.77581 0.0851042 6.5703 0.236597 6.41876L5.89322 0.762143C6.04563 0.614944 6.24975 0.533492 6.46163 0.535334C6.67351 0.537174 6.87619 0.622162 7.02601 0.771988C7.17584 0.921814 7.26082 1.12449 7.26266 1.33637C7.26451 1.54825 7.18305 1.75237 7.03586 1.90478L2.75864 6.18199L15.1919 6.18199C15.4062 6.18199 15.6118 6.26713 15.7633 6.41868C15.9149 6.57022 16 6.77576 16 6.99008C16 7.2044 15.9149 7.40994 15.7633 7.56149C15.6118 7.71303 15.4062 7.79817 15.1919 7.79817Z"
                    fill="#013A34"
                  />
                </svg>
              </span>
              {t("homePage.back")}
            </Link>
            <h1>{isEnglish ? insight?.title?.en : insight?.title?.ar}</h1>
            <p>
              {isEnglish ? insight?.description?.en : insight?.description?.ar}
            </p>
          </div>
        </Col>
        <Col xs={24} md={12} lg={11}>
          <div className="insight-image">
            <Image
              src={insight?.cover_image_url}
              alt={isEnglish ? insight?.title?.en : insight?.title?.ar}
              fill
              objectFit="cover"
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};
