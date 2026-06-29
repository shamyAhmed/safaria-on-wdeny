import { RiMoneyDollarCircleLine } from "react-icons/ri";

export const ConfirmationRewardBanner_section = () => {
  return (
    <section className="available-rewards-banner">
      <div className="container">
        <div className="flex items-center gap-8 justify-center flex-col text-center ">
          <div className="flex items-center justify-center gap-2 bg-[#FFF0CD] text-[#B59819] px-4 py-2 rounded-[9999px]">
            <RiMoneyDollarCircleLine className="text-lg" /> تأكيد الاستبدال
          </div>
          <h1 className="text-secondary text-6xl font-bold">تأكيد المكافأه </h1>
          <p className="text-secondary text-xl">
            راجع تفاصيل المكافأه قبل الاستبدال{" "}
          </p>
        </div>
      </div>
    </section>
  );
};
