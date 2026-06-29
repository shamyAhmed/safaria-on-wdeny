import { Col, Row } from "antd";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiGift } from "react-icons/fi";
import { FaPercent } from "react-icons/fa6";
import { RxLightningBolt } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";

export const LoyalityProgramFeatures_section = () => {
  return (
    <section className="loyality-program-features py-20">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold">
          مميزات برنامج الولاء{" "}
        </h3>
        <p className="text-center text-lg text-[#9D9DA1] mt-4 mb-10">
          استمتع بمزايا حصرية كعضو في برنامج الولاء{" "}
        </p>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <FaPercent />
              </div>
              <h5 className="text-secondary font-bold text-xl">خصومات حصرية</h5>
              <p className="text-[#B0B0B3]">
                استمتع بخصومات تصل إلى 30% على المنتجات المختارة{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <RxLightningBolt />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                أولوية في العروض
              </h5>
              <p className="text-[#B0B0B3]">
                كن أول من يعرف عن العروض الجديدة والحصرية{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="feature-card">
              <div className="icon">
                <BsBoxSeam />
              </div>
              <h5 className="text-secondary font-bold text-xl">منتجات خاصة</h5>
              <p className="text-[#B0B0B3]">
                احصل على منتجات محدودة الإصدار للأعضاء فقط{" "}
              </p>
            </div>
          </Col>{" "}
        </Row>
      </div>
    </section>
  );
};
