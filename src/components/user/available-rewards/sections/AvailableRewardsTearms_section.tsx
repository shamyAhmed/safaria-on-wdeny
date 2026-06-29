import { Col, Row } from "antd";
import React from "react";
import { FaSquare } from "react-icons/fa6";
import { GoSquareFill } from "react-icons/go";

export const AvailableRewardsTearms_section = () => {
  return (
    <section className="available-rewards-tearms mb-24">
      <div className="container">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={12}>
            <div className="how-exchange-card">
              <h5 className="font-bold text-xl mb-4">كيف تستبدل النقاط؟</h5>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <span className="text-white font-bold w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center">
                    1
                  </span>
                  <span className="text-[#B0B0B3] text-md">
                    اختر المكافأة التي تريدها
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white font-bold w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center">
                    2
                  </span>
                  <span className="text-[#B0B0B3] text-md">
                    تأكد من أن لديك نقاط كافية{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white font-bold w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[#B0B0B3] text-md">
                    اضغط على "استبدال الآن"{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-white font-bold w-[24px] h-[24px] bg-primary rounded-full flex items-center justify-center">
                    4
                  </span>
                  <span className="text-[#B0B0B3] text-md">
                    احصل على مكافأتك فوراً{" "}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={24} lg={12}>
            <div className="exchange-card">
              <h5 className="font-bold text-xl mb-4">شروط الاستبدال</h5>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3">
                  <GoSquareFill />

                  <span className="text-[#B0B0B3] text-md">
                    النقاط المستبدلة لا يمكن إعادتها{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GoSquareFill />

                  <span className="text-[#B0B0B3] text-md">
                    القسائم صالحة لمدة 6 أشهر من تاريخ الاستبدال{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GoSquareFill />

                  <span className="text-[#B0B0B3] text-md">
                    المنتجات تُشحن خلال 3-5 أيام عمل{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GoSquareFill />

                  <span className="text-[#B0B0B3] text-md">
                    التجارب الخاصة تخضع للتوفر والجدولة{" "}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <GoSquareFill />

                  <span className="text-[#B0B0B3] text-md">
                    لا يمكن استبدال المكافآت بالنقد{" "}
                  </span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
