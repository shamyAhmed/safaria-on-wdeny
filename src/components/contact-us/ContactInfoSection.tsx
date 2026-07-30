"use client";

import { Row, Col, Skeleton } from "antd";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { useGetSettings } from "@/hooks/useGetSettings";

function InfoCardSkeleton() {
  return (
    <div className="bg-white/15 p-6 rounded-xl text-center flex flex-col items-center gap-3">
      <Skeleton.Avatar active size={36} shape="circle" />
      <Skeleton.Input active size="small" style={{ width: 100, borderRadius: 8 }} />
      <Skeleton.Input active size="small" style={{ width: 140, borderRadius: 8 }} />
    </div>
  );
}

export function ContactInfoSection() {
  const t = useTranslations("contactUs");
  const { settings, isLoading } = useGetSettings();

  return (
    <section className="py-20 bg-[#fbfbfd]">
      <div className="container">
        <h2 className="text-primary font-bold text-4xl mb-2">{t("infoTitle")}</h2>
        <p className="mb-16 text-gray-500">{t("infoSubtitle")}</p>
        <div
          className="py-20 px-8 rounded-[40px] overflow-hidden"
          style={{
            backgroundImage: "url('/photos/features.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Row align="middle" justify="center" gutter={[24, 24]}>
            {isLoading ? (
              <>
                <Col xs={24} md={8}><InfoCardSkeleton /></Col>
                <Col xs={24} md={8}><InfoCardSkeleton /></Col>
                <Col xs={24} md={8}><InfoCardSkeleton /></Col>
              </>
            ) : (
              <>
                <Col xs={24} md={8}>
                  <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                    <div className="flex justify-center mb-4">
                      <FaPhone className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-2xl mb-3 text-white">{t("phoneLabel")}</h3>
                    <p className="text-white/80">{settings?.mobile ?? "+20 xx xxx xxxx"}</p>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                    <div className="flex justify-center mb-4">
                      <FaEnvelope className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-2xl mb-3 text-white">{t("emailLabel")}</h3>
                    <p className="text-white/80">{settings?.email ?? "info@safaria.travel"}</p>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="bg-white/15 text-white p-6 rounded-xl text-center">
                    <div className="flex justify-center mb-4">
                      <FaLocationDot className="text-3xl" />
                    </div>
                    <h3 className="font-bold text-2xl mb-3 text-white">{t("addressLabel")}</h3>
                    <p className="text-white/80">{settings?.address ?? t("addressValue")}</p>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
    </section>
  );
}
