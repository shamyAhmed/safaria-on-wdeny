"use client";

export const PrivateCardSkeleton = () => (
  <div className="w-full bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm animate-pulse">
    <div className="flex flex-col lg:flex-row">

      {/* Price panel */}
      <div className="lg:w-[190px] shrink-0 flex flex-col gap-4 p-5 bg-[#fafafa] border-b lg:border-b-0 lg:border-e border-gray-100">
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-8 w-24 rounded bg-gray-200" />
        </div>
        <div className="h-11 w-full rounded-xl bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-3 w-14 rounded bg-gray-100" />
          <div className="h-3 w-14 rounded bg-gray-100" />
        </div>
        <div className="h-3 w-28 rounded bg-gray-100" />
      </div>

      {/* Middle */}
      <div className="flex-1 flex flex-col gap-5 p-5">
        <div className="flex items-center gap-3">
          <div className="w-[46px] h-[46px] rounded-full bg-gray-200 shrink-0" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-3 w-16 rounded bg-gray-100" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-28 rounded bg-gray-100" />
          ))}
        </div>
        <div className="flex items-center gap-5 pt-2 border-t border-gray-100">
          <div className="h-4 w-32 rounded bg-gray-100" />
          <div className="h-4 w-24 rounded bg-gray-100" />
        </div>
      </div>

      {/* Image */}
      <div className="lg:w-[220px] shrink-0 h-[200px] lg:h-auto bg-gray-200" />
    </div>
  </div>
);
