import { Button } from "antd";
import { Link } from "@/i18n/navigation";
import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiPercent } from "react-icons/fi";
import { GoSquareFill } from "react-icons/go";
import { LuInfo } from "react-icons/lu";

export const RewardDetails_section = () => {
  return (
    <section className="reward-details">
      <div className="container">
        <div className="reward-card">
          <div className="top">
            <div className="icon">
              <FiPercent />
            </div>
            <div>
              <h2 className="text-white font-bold text-3xl mb-2">
                قسيمة خصم 100 ريال
              </h2>
              <p className="text-white/90 text-lg">استخدمها في أي عملية شراء</p>
            </div>
            <div className="amount">
              <span className="text-white/90 text-sm"> قيمة المكافأة</span>
              <span className="text-2xl font-bold">100 ر.س</span>
            </div>
          </div>
          <div className="body">
            <ul className="current-point flex flex-col gap-4">
              <li>
                <span className="text-[#B0B0B3] text-md">رصيدك الحالي</span>
                <span className="text-[#111113] font-bold text-xl">
                  2,450 نقطة
                </span>
              </li>
              <li>
                <span className="text-[#B0B0B3] text-md">النقاط المطلوبة</span>
                <span className="text-[#3A5762] font-bold text-xl">
                  -1,000 نقطة
                </span>
              </li>
              <li>
                <span className="text-[#111113] font-bold">
                  الرصيد بعد الاستبدال
                </span>
                <span className="text-[#58BC52] font-bold text-3xl sm:text-xl">
                  1,450 نقطة
                </span>
              </li>
            </ul>
            <div className="information">
              <LuInfo className="text-2xl mt-1" />
              <div>
                <h5 className="font-bold text-lg text-[#111113] mb-3">
                  معلومات مهمة:
                </h5>
                <ul className="flex flex-col gap-2">
                  <li>
                    <GoSquareFill />
                    عملية الاستبدال نهائية ولا يمكن التراجع عنها
                  </li>
                  <li>
                    <GoSquareFill />
                    القسيمة صالحة لمدة 6 أشهر من تاريخ الاستبدال
                  </li>
                  <li>
                    <GoSquareFill />
                    يمكن استخدامها في أي عملية شراء
                  </li>
                </ul>{" "}
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="primary" className="flex flex-1 !px-12  primary">
                <FaRegCircleCheck />
                تأكيد الاستبدال{" "}
              </Button>
              <Link
                href="/user/available-rewards"
                className="flex flex-1 items-center justify-center text-[#B0B0B3] border border-[#B0B0B3] hover:text-[#B0B0B3] px-12 py-2 rounded-md text-md font-medium"
              >
                إلغاء{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
