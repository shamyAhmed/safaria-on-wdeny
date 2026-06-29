export const AirplaneCardSkeleton = () => {
  return (
    <div className="airplane-card bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-6 animate-pulse">
      <div className="flex flex-col min-[896px]:flex-row">
        {/* Main content */}
        <div className="flex-1 px-5 py-4">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4 pt-[14px]">
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
            {/* Airline info */}
            <div className="flex items-center gap-4">
              <div className="size-[60px] rounded-sm bg-gray-200 shrink-0" />
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-28 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Flight timeline */}
            <div className="flex-1 flex items-center gap-4">
              <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
                <div className="h-5 w-14 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex-1 h-[1px] bg-gray-200 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-16 bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col items-center gap-1.5 min-w-[80px]">
                <div className="h-5 w-14 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Price panel */}
        <div className="w-full min-[896px]:w-[220px] min-h-[200px] bg-gray-200 flex flex-col items-center justify-center gap-3 p-6">
          <div className="h-5 w-24 bg-gray-300 rounded" />
          <div className="h-3 w-20 bg-gray-300 rounded" />
          <div className="h-3 w-16 bg-gray-300 rounded" />
          <div className="h-10 w-full bg-gray-300 rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
};
