import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { FiHome, FiRefreshCw } from "react-icons/fi";
import { TbPointFilled } from "react-icons/tb";

export const metadata: Metadata = {
  title: "فشل الدفع",
};

const FailedPaymentPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[560px] flex flex-col items-center gap-8">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">فشلت عملية الدفع</h1>
          <p className="text-gray-500 text-base">
            لم نتمكن من إتمام عملية الدفع، يرجى المحاولة مرة أخرى
          </p>
        </div>

        {/* Reasons card */}
        <div className="w-full bg-white rounded-2xl shadow-sm px-6 py-5 space-y-3">
          <h2 className="font-bold text-lg text-gray-800">أسباب محتملة</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-red-400 mt-0.5 shrink-0" />
              رصيد غير كافٍ في البطاقة أو المحفظة
            </li>
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-red-400 mt-0.5 shrink-0" />
              انتهاء صلاحية بيانات الدفع أو خطأ في إدخالها
            </li>
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-red-400 mt-0.5 shrink-0" />
              انتهت مهلة الجلسة، يرجى البدء من جديد
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <Link
            href="/discover-bus"
            className="flex flex-1 items-center justify-center gap-2 bg-primary hover:opacity-90 text-white px-6 py-3 rounded-xl text-base font-semibold transition-opacity">
            <FiRefreshCw />
            حاول مجدداً
          </Link>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 hover:!text-primary px-6 py-3 rounded-xl text-base font-semibold transition-colors">
            <FiHome />
            الرئيسية
          </Link>
        </div>

      </div>
    </div>
  );
};

export default FailedPaymentPage;
