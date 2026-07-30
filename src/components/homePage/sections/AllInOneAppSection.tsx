"use client";
import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { HomeSection } from "../HomeSection";

export const AllInOneAppSection = () => {
  const t = useTranslations("homePage.allInOneApp");

  return (
    <HomeSection
      title={t("title")}
      description={t("description")}
      className="features-section">
      <div className="container">
        <div className="all-features py-20 px-8">
          <Image
            src="/images/home-features.webp"
            alt={t("imageAlt")}
            fill
            loading="lazy"
            className="object-cover -z-10"
          />
          <div className="relative z-1">
            <Row
              align="middle"
              justify="center"
              gutter={[0, 20]}
              className="mb-24">
              <Col
                xs={24}
                md={12}>
                <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                  <h3 className="font-bold text-2xl mb-4 text-white">
                    {t("features.instantBooking.title")}
                  </h3>
                  <p className="w-[90%]">
                    {t("features.instantBooking.description")}
                  </p>
                </div>
              </Col>
              <Col
                xs={24}
                md={12}>
                <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                  <h3 className="font-bold text-2xl mb-4 text-white">
                    {t("features.securePayment.title")}
                  </h3>
                  <p className="w-[90%]">
                    {t("features.securePayment.description")}
                  </p>
                </div>
              </Col>
            </Row>
            <Row
              align="middle"
              justify="center"
              gutter={[0, 20]}
              className="mb-24">
              <Col
                xs={24}
                md={12}>
                <div className="max-w-[346px] bg-white/15 text-white p-4 rounded-xl text-center">
                  <h3 className="font-bold text-2xl mb-4 text-white">
                    {t("features.comparePrices.title")}
                  </h3>
                  <p className="w-[90%]">
                    {t("features.comparePrices.description")}
                  </p>
                </div>
              </Col>
              <Col
                xs={24}
                md={12}>
                <div className="max-w-[346px] bg-white/15 text-white p-4 ms-auto rounded-xl text-center">
                  <h3 className="font-bold text-2xl mb-4 text-white">
                    {t("features.liveUpdates.title")}
                  </h3>
                  <p className="w-[90%]">
                    {t("features.liveUpdates.description")}
                  </p>
                </div>
              </Col>
            </Row>
            <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
              <h3 className="font-bold text-2xl mb-4 text-white">
                {t("features.tripTracking.title")}
              </h3>
              <p className="w-[90%]">{t("features.tripTracking.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeSection>
  );
};
