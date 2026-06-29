import { Col, Row } from "antd";
import { FaArrowTrendDown, FaArrowTrendUp, FaChartBar } from "react-icons/fa6";

export const PointsHistoryBanner_section = () => {
  return (
    <section className="points-history-banner">
      <div className="container">
        <div className="mb-10 flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <FaChartBar className="text-lg" /> سجل النقاط
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            سجل معاملات النقاط{" "}
          </h1>
          <p className="text-secondary text-xl">
            راجع تفاصيل المكافأه قبل الاستبدال{" "}
          </p>
        </div>
        <Row gutter={[24, 24]}>
          <Col span={24} lg={8}>
            <div className="card">
              <div className="icon primary">
                <FaArrowTrendUp />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#B0B0B3]">الرصيد الحالي</span>
                <span className="font-bold text-[#111113] text-2xl">1,450</span>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="card">
              <div className="icon secondary">
                <FaArrowTrendUp />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#B0B0B3]">الرصيد الحالي</span>
                <span className="font-bold text-[#58BC52] text-2xl">1,450</span>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="card">
              <div className="icon primary">
                <FaArrowTrendDown />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#B0B0B3]">
                  إجمالي المستبدل
                </span>
                <span className="font-bold text-[#111113] text-2xl">1,800</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
