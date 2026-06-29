"use client";

export const BlogCardSkeleton = () => (
  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden animate-pulse bg-gray-200">
    {/* image placeholder */}
    <div className="absolute inset-0 bg-gray-300" />

    {/* gradient overlay placeholder */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400/30 to-gray-400/60" />

    {/* content at bottom */}
    <div className="relative z-10 h-full flex flex-col justify-end px-6 py-10 gap-4">
      {/* title */}
      <div className="h-6 w-3/4 rounded-lg bg-gray-400/60" />

      {/* description lines */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-gray-400/50" />
        <div className="h-4 w-5/6 rounded bg-gray-400/50" />
      </div>

      {/* button */}
      <div className="flex justify-end">
        <div className="h-14 w-36 rounded-xl bg-gray-400/50" />
      </div>
    </div>
  </div>
);
