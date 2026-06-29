const Pulse = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-white/20 rounded-xl ${className ?? ""}`} />
);

export default function BlogsLoading() {
  return (
    <div>
      {/* ── Banner ───────────────────────────────────────────────────── */}
      <section className="py-12 bg-gray-100">
        <div className="container">
          <div className="bg-gray-200 animate-pulse rounded-[40px] px-8 py-24 flex flex-col items-center gap-5">
            <div className="animate-pulse bg-gray-300 h-10 w-48 rounded-2xl" />
            <div className="flex items-center gap-3">
              <div className="animate-pulse bg-gray-300 h-4 w-16 rounded-full" />
              <div className="animate-pulse bg-gray-300 h-4 w-4 rounded-full" />
              <div className="animate-pulse bg-gray-300 h-4 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog cards grid ──────────────────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative h-[500px] rounded-3xl overflow-hidden border border-white/20 bg-white/10 animate-pulse"
              >
                {/* simulated gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-800/20 to-primary/40" />

                {/* content pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-10 flex flex-col gap-3">
                  <Pulse className="h-7 w-3/4" />
                  <Pulse className="h-4 w-full" />
                  <Pulse className="h-4 w-[85%]" />
                  <div className="flex justify-end mt-2">
                    <Pulse className="h-14 w-36 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
