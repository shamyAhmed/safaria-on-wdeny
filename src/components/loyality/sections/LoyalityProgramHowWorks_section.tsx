import { Col, Row } from "antd";
import { PiShoppingBagBold } from "react-icons/pi";
import { FiGift } from "react-icons/fi";
import { MdOutlineLoyalty } from "react-icons/md";

export const LoyalityProgramHowWorks_section = () => {
  return (
    <section className="loyality-program-how-works py-20">
      <div className="container">
        <h3 className="text-center text-secondary text-2xl font-bold">
          كيف يعمل البرنامج؟
        </h3>
        <p className="text-center text-lg text-[#9D9DA1] mt-4 mb-10">
          ثلاث خطوات بسيطة للاستمتاع بالمكافآت
        </p>
        <Row gutter={[32, 32]}>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                1
              </div>
              <div className="icon">
                <PiShoppingBagBold />
              </div>
              <h5 className="text-secondary font-bold text-xl">تسوّق</h5>
              <p className="text-[#B0B0B3]">
                اشترِ منتجاتك المفضلة من متجر الطائي
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                2
              </div>
              <div className="icon">
                <MdOutlineLoyalty />{" "}
              </div>
              <h5 className="text-secondary font-bold text-xl">اجمع نقاط</h5>
              <p className="text-[#B0B0B3]">
                احصل على نقطة مقابل كل ريال تنفقه{" "}
              </p>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="how-works-card">
              <div className="flex items-center justify-center rounded-full font-bold text-lg absolute top-[-15px] right-12 w-8 h-8 bg-secondary text-white">
                3
              </div>
              <div className="icon">
                <FiGift />
              </div>
              <h5 className="text-secondary font-bold text-xl">
                استبدل المكافآت
              </h5>
              <p className="text-[#B0B0B3]">
                حوّل نقاطك إلى خصومات ومنتجات حصرية{" "}
              </p>
            </div>
          </Col>{" "}
        </Row>
      </div>
    </section>
  );
};
