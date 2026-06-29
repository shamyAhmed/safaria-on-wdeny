"use client";

import { useState } from "react";
import { Select } from "antd";
import { RiMapPinTimeLine } from "react-icons/ri";

const FILTER_TABS = [
  { key: "all", label: "الكل" },
  { key: "pending", label: "قيد الانتظار" },
  { key: "booked", label: "تم الحجز" },
  { key: "expired", label: "منتهية" },
];

const SORT_OPTIONS = [
  { value: "nearest", label: "الأقرب" },
  { value: "latest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
];

export const MyTripsContent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("nearest");

  const totalResults = 0;

  return (
    <div className="formS1 !border-none">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-8 text-center lg:text-start border-b border-[#E2E2E2] pb-6">
        رحلاتي
      </h2>

      {/* Toolbar: results count + sort */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <span className="text-sm text-gray-500">
          يوجد{" "}
          <span className="font-semibold text-gray-700">{totalResults}</span> من
          النتائج
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>ترتيب حسب:</span>
          <Select
            value={sortBy}
            onChange={setSortBy}
            options={SORT_OPTIONS}
            className="sort-dropdown !min-w-[90px]"
            popupMatchSelectWidth={false}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center border-b border-[#E2E2E2] mb-8">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 text-center pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? "text-primary after:absolute after:bottom-0 after:right-0 after:left-0 after:h-[2px] after:bg-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
          <RiMapPinTimeLine className="text-4xl text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          لا توجد رحلات بعد
        </h3>
        <p className="text-sm text-gray-400 max-w-xs">
          لم تقم بحجز أي رحلة حتى الآن. ابدأ باستكشاف الوجهات المتاحة واحجز
          رحلتك الأولى.
        </p>
      </div>
    </div>
  );
};
