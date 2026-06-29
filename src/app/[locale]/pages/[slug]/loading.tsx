const Loading = () => {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="page-banner px-4">
        <div className="container text-center flex flex-col items-center gap-4">
          <div className="h-10 w-64 rounded-lg bg-white/20 animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-20 rounded bg-white/20 animate-pulse" />
            <div className="h-4 w-2 rounded bg-white/20 animate-pulse" />
            <div className="h-4 w-32 rounded bg-white/20 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content skeleton */}
      <div className="container min-h-[50vh] py-12 flex flex-col gap-4">
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-4/6 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="mt-4 h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default Loading;
