import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { FiHome } from "react-icons/fi";
import { BsTicketPerforated } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";

export const metadata: Metadata = {
  title: "تم الدفع بنجاح",
};

const SuccessPaymentPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[560px] flex flex-col items-center gap-8">

        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">تم الدفع بنجاح! 🎉</h1>
          <p className="text-gray-500 text-base">
            تم تأكيد حجزك وإتمام عملية الدفع بنجاح
          </p>
        </div>

        {/* What's next card */}
        <div className="w-full bg-white rounded-2xl shadow-sm px-6 py-5 space-y-3">
          <h2 className="font-bold text-lg text-gray-800">ماذا بعد؟</h2>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-green-500 mt-0.5 shrink-0" />
              ستتلقى رسالة تأكيد على بريدك الإلكتروني ورقم هاتفك
            </li>
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-green-500 mt-0.5 shrink-0" />
              يمكنك متابعة تفاصيل حجزك من صفحة الحجوزات في حسابك
            </li>
            <li className="flex items-start gap-2 text-gray-500 text-sm">
              <TbPointFilled className="text-green-500 mt-0.5 shrink-0" />
              تأكد من الحضور قبل موعد الرحلة بوقت كافٍ
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full hover:!text-primary">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 bg-primary hover:opacity-90 text-white px-6 py-3 rounded-xl text-base font-semibold transition-opacity">
            <FiHome />
            الرئيسية
          </Link>
          <Link
            href="/user/my-trips"
            className="flex flex-1 items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 hover:!text-primary px-6 py-3 rounded-xl text-base font-semibold transition-colors">
            <BsTicketPerforated />
            حجوزاتي
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SuccessPaymentPage;
