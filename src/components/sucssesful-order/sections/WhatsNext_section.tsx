import { Link } from "@/i18n/navigation";
import { TbPointFilled } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";

export const WhatsNext_section = () => {
  return (
    <div>
      <div className="whats-next mb-6">
        <h5 className="font-bold mb-4 text-xl">ماذا بعد؟</h5>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-2 items-center">
            <TbPointFilled className="text-[#22C55E]" />
            <span className="text-[#64748B]">
              ستتلقى رسالة تأكيد عبر البريد الإلكتروني والرسائل القصيرة
            </span>{" "}
          </li>
          <li className="flex gap-2 items-center">
            <TbPointFilled className="text-[#22C55E]" />
            <span className="text-[#64748B]">
              سيتم إعلامك فور شحن طلبك مع رابط التتبع{" "}
            </span>{" "}
          </li>
          <li className="flex gap-2 items-center">
            <TbPointFilled className="text-[#22C55E]" />
            <span className="text-[#64748B]">
              التوصيل المتوقع خلال 2-5 أيام عمل حسب المنطقة{" "}
            </span>{" "}
          </li>
        </ul>
      </div>
      <div className="flex gap-4 mb-6">
        <Link
          href="/"
          className="flex flex-1 items-center gap-4 justify-center bg-primary hover:bg-transparent border-primary border-2 hover:text-primary text-white px-12 py-2 rounded-lg text-lg font-medium transition-colors"
        >
          <FiHome />
          العودة للرئيسية{" "}
        </Link>
        <Link
          href="/"
          className="flex flex-1 items-center gap-4 justify-center bg-transparent hover:bg-transparent border-primary border-2 hover:text-primary text-primary px-12 py-2 rounded-lg text-lg font-medium transition-colors"
        >
          <BsBoxSeam />
          تتبع الطلب
        </Link>
      </div>
      <div className="">
        <h5 className="text-center text-lg mb-3">هل لديك استفسار؟</h5>
        <div className="flex items-center justify-center gap-6 text-primary">
          <div className="flex items-center gap-3">
            <FiPhone />
            <a href="" className="hover:text-primary">
              920000000
            </a>
          </div>
          <hr className="h-4 w-[1px] bg-primary" />
          <div className="flex items-center gap-3">
            <MdOutlineMailOutline />
            <a href="" className="hover:text-primary">
              info@altaeiclub.sa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
