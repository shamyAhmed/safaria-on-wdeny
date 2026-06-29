import { Button } from "antd";
import { Link } from "@/i18n/navigation";
import { FaCheck } from "react-icons/fa6";

export const OrderSummary_section = () => {
  return (
    <div className="card">
      <h5 className="text-primary text-2xl font-bold mb-6">ملخص الطلب</h5>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">المجموع الفرعي</span>
        <span className="text-secondary text-lg">399 ر.س</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#64748B] text-lg">الشحن</span>
        <span className="text-secondary text-lg">مجاني</span>
      </div>
      <hr className="border-[1px] border-[#E0E0E1] my-4" />
      <div className="flex items-center justify-between mb-6">
        <span className="text-secondary text-xl font-bold">الإجمالي</span>
        <span className="text-secondary text-xl font-bold">399 ر.س</span>
      </div>
      <Button type="primary" htmlType="submit" className="w-full">
        إتمام الشراء
      </Button>
      <hr className="border-[1px] border-[#E0E0E1] my-6" />
      <ul className="flex gap-2 flex-col">
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>دفع آمن ومشفر</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>شحن سريع خلال 2-3 أيام</span>
        </li>
        <li className="flex items-center gap-2 text-secondary">
          <FaCheck />
          <span>إرجاع مجاني خلال 14 يوم</span>
        </li>
      </ul>
    </div>
  );
};
