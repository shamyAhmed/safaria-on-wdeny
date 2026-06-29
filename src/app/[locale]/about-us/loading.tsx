const Pulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ""}`} />
);

export default function AboutUsLoading() {
  return (
    <div className="overflow-hidden">
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-100">
        <div className="container">
          <div className="bg-gray-200 animate-pulse rounded-[40px] px-8 py-24 flex flex-col items-center gap-5">
            <Pulse className="h-10 w-56 rounded-2xl" />
            <div className="flex items-center gap-3">
              <Pulse className="h-4 w-16 rounded-full" />
              <Pulse className="h-4 w-4 rounded-full" />
              <Pulse className="h-4 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── About Us grid ────────────────────────────────────────────── */}
      <section className="bg-[#FBFBFD] py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Logo card */}
            <div className="lg:w-[29%]">
              <Pulse className="h-32 w-full rounded-3xl" />
            </div>
            {/* Text block */}
            <div className="lg:w-[71%] flex flex-col gap-4">
              <Pulse className="h-5 w-28 rounded-full" />
              <Pulse className="h-8 w-3/4 rounded-xl" />
              <div className="flex flex-col gap-2 mt-2">
                <Pulse className="h-5 w-full rounded-full" />
                <Pulse className="h-5 w-[92%] rounded-full" />
                <Pulse className="h-5 w-4/5 rounded-full" />
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <Pulse className="h-5 w-full rounded-full" />
                <Pulse className="h-5 w-[88%] rounded-full" />
                <Pulse className="h-5 w-3/4 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
