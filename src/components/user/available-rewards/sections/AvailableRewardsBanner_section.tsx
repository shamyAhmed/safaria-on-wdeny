import { BsDatabase } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const AvailableRewardsBanner_section = () => {
  return (
    <section className="available-rewards-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <RiMoneyDollarCircleLine className="text-lg" /> استبدل نقاطك
          </div>
          <h1 className="text-secondary text-6xl font-bold">
            المكافئات المتاحة{" "}
          </h1>
          <p className="text-secondary text-xl">
            استبدل المكافأة التي تناسبك واستبدلها بنقاطك{" "}
          </p>
          <div className="bg-primary text-[#F1F1F1] flex flex-col gap-2 px-10 py-4 rounded-xl">
            <span>رصيدك من النقاط</span>
            <span className="font-bold text-5xl">2,950</span>
          </div>
        </div>
      </div>
    </section>
  );
};
