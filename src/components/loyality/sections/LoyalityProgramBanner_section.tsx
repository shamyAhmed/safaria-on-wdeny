import React from "react";
import { MdOutlineLoyalty } from "react-icons/md";

export const LoyalityProgramBanner_section = () => {
  return (
    <section className="loyality-program-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <MdOutlineLoyalty className="text-lg" /> برنامج المكافآت
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            برنامج ولاء <span className="text-[#096748]">الطائي</span>
          </h1>
          <p className="text-secondary text-xl">
            اكسب نقاط مع كل عملية شراء واستبدلها بمكافآت حصرية ومميزات لا تُنسى
          </p>
        </div>
      </div>
    </section>
  );
};
