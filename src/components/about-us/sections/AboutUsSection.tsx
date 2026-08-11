import { Col, Row } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const AboutUsSection = () => {
  const t = useTranslations("aboutUs.intro");
  return (
    <section className="bg-[#FBFBFD] py-20">
      <div className="container">
        <Row gutter={[50, 50]}>
          <Col span={24} lg={7}>
            <div dir="ltr" className="bg-white rounded-3xl min-w-fit h-full flex items-center justify-center py-6">
              <Image
                src={"/images/logo-full.svg"}
                alt={t("logoAlt")}
                width={200}
                height={45}
                className="h-auto w-[200px]"
              />
            </div>
          </Col>
          <Col span={24} lg={17}>
            <div className="">
              <h4 className="text-primary text-lg mb-2">{t("label")}</h4>
              <p className="font-bold text-2xl mb-6">{t("description1")}</p>
              <p className="text-xl mb-6">{t("description2")}</p>
              <p className="text-xl">{t("description3")}</p>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
