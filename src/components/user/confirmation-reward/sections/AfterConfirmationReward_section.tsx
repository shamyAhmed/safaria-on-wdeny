import React from "react";
import { FiGift } from "react-icons/fi";

export const AfterConfirmationReward_section = () => {
  return (
    <section className="after-confirmation">
      <div className="container">
        <div className="content">
          <div className="flex items-center gap-4 mb-6">
            <FiGift className="text-2xl" />
            <h4 className="font-bold text-white text-2xl">
              {" "}
              ماذا يحدث بعد التأكيد؟
            </h4>
          </div>
          <ul className="flex flex-col gap-4">
            <li>
              <span className="number">1</span>
              <div className="flex flex-col gap-1">
                <span className="font-bold">استبدال فوري</span>
                <span className="text-white/80 text-sm">
                  سيتم خصم النقاط من رصيدك فوراً
                </span>
              </div>
            </li>
            <li>
              <span className="number">2</span>
              <div className="flex flex-col gap-1">
                <span className="font-bold">رسالة تأكيد</span>
                <span className="text-white/80 text-sm">
                  ستتلقى رسالة بريد إلكتروني بتفاصيل المكافأة{" "}
                </span>
              </div>
            </li>
            <li>
              <span className="number">3</span>
              <div className="flex flex-col gap-1">
                <span className="font-bold">استخدام المكافأة</span>
                <span className="text-white/80 text-sm">
                  يمكنك استخدام مكافأتك حسب نوعها{" "}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
