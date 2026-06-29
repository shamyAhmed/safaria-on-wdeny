"use client";

import { Skeleton } from "antd";

export const BookingPageSkeleton = () => (
  <div className="container p-6 space-y-4">
    {/* Company card */}
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4">
      <Skeleton.Avatar active size={56} />
      <div className="flex-1 space-y-2">
        <Skeleton.Input active size="small" className="!w-40 !rounded" />
        <Skeleton.Input active size="small" className="!w-24 !rounded" />
      </div>
    </div>

    {/* Payment details card */}
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
      <Skeleton.Input active size="small" className="!w-32 !rounded" />
      <div className="h-px bg-gray-100" />
      <Skeleton active paragraph={{ rows: 2 }} title={false} />
    </div>

    {/* Dates card */}
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
      <Skeleton.Input active size="small" className="!w-24 !rounded" />
      <div className="h-px bg-gray-100" />
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Skeleton.Input active block className="!h-12 !rounded-xl" />
        <Skeleton.Input active block className="!h-12 !rounded-xl" />
      </div>
    </div>

    {/* Confirm card */}
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 space-y-3">
      <Skeleton.Input active size="small" className="!w-48 !rounded" />
      <Skeleton.Button active block className="!h-12 !rounded-xl" />
    </div>
  </div>
);
