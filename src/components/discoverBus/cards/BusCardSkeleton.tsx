"use client";

export const BusCardSkeleton = () => (
  <div className="w-full bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm px-[18px] py-[28px] space-y-4 animate-pulse">

    {/* ── Top Row ── */}
    <div className="flex flex-col md:flex-row gap-5">

      {/* Image placeholder */}
      <div className="shrink-0 w-full md:w-[180px] h-[140px] rounded-lg bg-gray-200" />

      {/* Info + Timeline */}
      <div className="flex-1 flex flex-col justify-between min-w-0 gap-5">

        {/* Company row */}
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full bg-gray-200 shrink-0" />
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-3 w-12 rounded bg-gray-100" />
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-4 w-14 rounded bg-gray-200" />
            <div className="h-2 w-10 rounded bg-gray-100" />
          </div>
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <div className="h-6 w-6 rounded-full bg-gray-200" />
            <div className="w-full h-px bg-gray-200" />
            <div className="h-4 w-16 rounded-full bg-gray-100" />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-4 w-14 rounded bg-gray-200" />
            <div className="h-2 w-10 rounded bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Price boxes */}
      <div className="flex sm:flex-col gap-3 shrink-0 sm:justify-center">
        <div className="border border-gray-100 rounded-xl px-4 py-3 min-w-[130px] space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-6 w-16 rounded bg-gray-200" />
        </div>
        <div className="border border-gray-100 rounded-xl px-4 py-3 min-w-[130px] space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="h-6 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>

    {/* ── Stop Pickers ── */}
    <div className="py-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1 rounded-2xl bg-gray-100 h-[72px]" />
      <div className="flex-1 rounded-2xl bg-gray-100 h-[72px]" />
    </div>

    {/* ── Bottom Bar ── */}
    <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-3 w-24 rounded bg-gray-200" />
        <div className="h-9 w-28 rounded-xl bg-gray-200" />
      </div>
    </div>
  </div>
);
