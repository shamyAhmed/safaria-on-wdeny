// Skeleton that mirrors the visual shape of HeroForms:
//   • 3 pill tab buttons  (on the dark hero background)
//   • White card with labelled input fields, a passenger/class row, a trip-type
//     radio row, and a primary-coloured search button
//
// cardS1 has padding: 32px 24px and inputS1 inputs are 50 px tall / 16 px radius.

export function HeroFormsSkeleton() {
  return (
    <>
      {/* ── Tab button skeletons ─────────────────────────── */}
      <div className="flex justify-between md:justify-normal items-center gap-1 sm:gap-3 mb-9">
        {[120, 128, 116].map((w, i) => (
          <div
            key={i}
            style={{ width: w }}
            className="h-10 md:h-[58px] rounded-[200px] bg-white/20 animate-pulse"
          />
        ))}
      </div>

      {/* ── Card skeleton ────────────────────────────────── */}
      <div className="cardS1 bg-white !rounded-[30px]">

        {/* Row 1 — four main input fields (From / To / Depart / Return) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* label */}
              <div
                className="h-[14px] rounded-full bg-gray-100 animate-pulse"
                style={{ width: `${52 + i * 8}px`, animationDelay: `${i * 60}ms` }}
              />
              {/* input box */}
              <div
                className="h-[50px] rounded-[16px] bg-gray-100 animate-pulse"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 — passengers + class (left) · search button (right) */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
          <div className="flex flex-wrap gap-4">
            {/* Passengers */}
            <div className="flex flex-col gap-2">
              <div className="h-[14px] w-[72px] rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: "80ms" }} />
              <div className="h-[50px] w-[140px] rounded-[16px] bg-gray-100 animate-pulse" style={{ animationDelay: "80ms" }} />
            </div>
            {/* Class */}
            <div className="flex flex-col gap-2">
              <div className="h-[14px] w-[52px] rounded-full bg-gray-100 animate-pulse" style={{ animationDelay: "140ms" }} />
              <div className="h-[50px] w-[140px] rounded-[16px] bg-gray-100 animate-pulse" style={{ animationDelay: "140ms" }} />
            </div>
          </div>

          {/* Search button */}
          <div
            className="h-[49px] w-full sm:w-[160px] rounded-[16px] animate-pulse"
            style={{ background: "rgba(0, 116, 195,0.15)", animationDelay: "200ms" }}
          />
        </div>

        {/* Row 3 — trip-type radio options */}
        <div className="flex items-center gap-5">
          {[88, 100, 96].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* radio circle */}
              <div
                className="size-4 rounded-full bg-gray-100 animate-pulse flex-shrink-0"
                style={{ animationDelay: `${i * 60}ms` }}
              />
              {/* option label */}
              <div
                className="h-[13px] rounded-full bg-gray-100 animate-pulse"
                style={{ width: w, animationDelay: `${i * 60}ms` }}
              />
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
