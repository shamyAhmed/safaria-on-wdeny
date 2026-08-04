"use client";

import { Skeleton } from "antd";

/** Mirrors the header / route / stats / footer bands of a real ticket card. */
export const TicketCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
    <div className="flex items-center gap-3">
      <Skeleton.Avatar
        active
        size={40}
        shape="square"
        style={{ borderRadius: 12 }}
      />
      <div className="flex-1 space-y-2">
        <Skeleton.Input active size="small" className="!w-32 !rounded" />
        <Skeleton.Input active size="small" className="!w-48 !rounded" />
      </div>
    </div>
    <Skeleton.Input active size="default" block className="!rounded-xl" />
    <div className="flex gap-6">
      <Skeleton.Input active size="small" className="!w-20 !rounded" />
      <Skeleton.Input active size="small" className="!w-24 !rounded" />
    </div>
  </div>
);

/** Section-shaped blocks for the detail modals. */
export const TicketDetailSkeleton = ({ sections = 3 }: { sections?: number }) => (
  <div className="flex flex-col gap-5">
    {Array.from({ length: sections }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
        <Skeleton.Input active size="small" className="!w-32 !rounded" />
        <Skeleton.Input active size="default" block className="!rounded-xl" />
        <Skeleton.Input active size="small" className="!w-56 !rounded" />
      </div>
    ))}
  </div>
);
