import { FaCar } from "react-icons/fa6";

export const PrivateTripsEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
      <FaCar className="text-4xl text-gray-300" />
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-2">
      لا توجد رحلات خاصة
    </h3>
    <p className="text-sm text-gray-400 max-w-xs">
      لم تقم بحجز أي رحلة خاصة حتى الآن. ابدأ باستكشاف الرحلات المتاحة واحجز رحلتك.
    </p>
  </div>
);
