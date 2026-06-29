import { Col, Row } from "antd";
import { Link } from "@/i18n/navigation";
import { CiCalendar } from "react-icons/ci";
import { FaPercent, FaRegStar } from "react-icons/fa6";
import { FiGift, FiPercent, FiTruck } from "react-icons/fi";
import { GoPersonAdd } from "react-icons/go";
import { IoShirtOutline } from "react-icons/io5";
import { LuBadgeCheck } from "react-icons/lu";
import { MdOutlineShare } from "react-icons/md";
import { PiShoppingBagBold } from "react-icons/pi";

export const AvailableRewards_section = () => {
  return (
    <section className="available-rewards py-20">
      <div className="container">
        <Row gutter={[24, 24]}>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <FiPercent />
                </div>
                <span className="font-bold text-4xl">500</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">
                  قسيمة خصم 50 ريال{" "}
                </h5>

                <p className=" text-[#B0B0B3]">استخدمها في أي عملية شراء</p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> 50 ر.س</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <FiPercent />
                </div>
                <span className="font-bold text-4xl">1,000</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">
                  قسيمة خصم 100 ريال{" "}
                </h5>

                <p className=" text-[#B0B0B3]">استخدمها في أي عملية شراء</p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> 100 ر.س</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <FiPercent />
                </div>
                <span className="font-bold text-4xl">2,000</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">
                  قسيمة خصم 200 ريال{" "}
                </h5>

                <p className=" text-[#B0B0B3]">استخدمها في أي عملية شراء</p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> 200 ر.س</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <FiTruck />
                </div>
                <span className="font-bold text-4xl">300</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">شحن مجاني </h5>

                <p className=" text-[#B0B0B3]">شحن مجاني على طلبك التالي</p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> مجاني</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <IoShirtOutline />
                </div>
                <span className="font-bold text-4xl">1,500</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">
                  تيشيرت نادي الطائي{" "}
                </h5>

                <p className=" text-[#B0B0B3]">
                  تيشيرت رسمي بالمقاس الذي تختاره
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> منتج</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} lg={8}>
            <div className="available-rewards-card">
              <div className="top">
                <div className="icon">
                  <LuBadgeCheck />
                </div>
                <span className="font-bold text-4xl">800</span>
                <span>نقطة</span>
              </div>
              <div className="body">
                <h5 className="text-secondary font-bold text-xl">
                  قبعة نادي الطائي{" "}
                </h5>

                <p className=" text-[#B0B0B3]">قبعة رسمية بشعار النادي</p>
                <p className="flex items-center justify-between">
                  <span className="text-[#B0B0B3]">القيمة</span>
                  <span className="font-bold"> منتج</span>{" "}
                </p>
                <Link
                  href="/user/available-rewards/1"
                  className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-4 rounded-lg text-md font-medium transition-colors"
                >
                  استبدل الان{" "}
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
