import { MdDirectionsBus } from "react-icons/md";

export const BusTripsEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
      <MdDirectionsBus className="text-4xl text-gray-300" />
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-2">
      لا توجد رحلات باصات
    </h3>
    <p className="text-sm text-gray-400 max-w-xs">
      لم تقم بحجز أي رحلة باص حتى الآن. ابدأ باستكشاف الرحلات المتاحة واحجز تذكرتك.
    </p>
  </div>
);
