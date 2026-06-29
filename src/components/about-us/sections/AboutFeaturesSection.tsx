import { Col, Row } from "antd";
import { useTranslations } from "next-intl";

export const AboutFeaturesSection = () => {
  const t = useTranslations("aboutUs.features");
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="text-primary font-bold text-4xl mb-2">
          {t("title")}
        </h2>
        <p className="mb-16">{t("description")}</p>
        <div className="all-features py-20 px-8">
          <Row
            align="middle"
            justify="center"
            gutter={[0, 20]}
            className="mb-24"
          >
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  {t("instantBooking.title")}
                </h3>

                <p className=" w-[90%]">
                  {t("instantBooking.description")}
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  {t("securePayment.title")}
                </h3>

                <p className=" w-[90%]">
                  {t("securePayment.description")}
                </p>
              </div>
            </Col>
          </Row>
          <Row
            align="middle"
            justify="center"
            gutter={[0, 20]}
            className="mb-24"
          >
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4  rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  {t("comparePrices.title")}
                </h3>

                <p className=" w-[90%]">
                  {t("comparePrices.description")}
                </p>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="max-w-[346px] bg-white/15 text-white p-4 ms-auto rounded-xl text-center">
                <h3 className="font-bold text-2xl mb-4 text-white">
                  {t("liveAlerts.title")}
                </h3>

                <p className=" w-[90%]">
                  {t("liveAlerts.description")}
                </p>
              </div>
            </Col>
          </Row>

          <div className="max-w-[346px] bg-white/15 text-white p-4 mx-auto rounded-xl text-center">
            <h3 className="font-bold text-2xl mb-4 text-white">
              {t("tripTracking.title")}
            </h3>

            <p className=" w-[90%]">
              {t("tripTracking.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
