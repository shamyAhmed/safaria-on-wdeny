import Image from "next/image";

export const LoaderS1 = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white gap-6">
      {/* Animation */}
      <div className="relative size-[280px]">
        <Image
          src="/images/loading.gif"
          alt="Loading…"
          fill
          priority
        />
      </div>

      {/* Logo + brand name */}
      <div
        dir="ltr"
        className="flex items-center gap-3">
        <Image
          src="/images/logo-icon.svg"
          alt="Safaria logo"
          width={26}
          height={36}
          priority
        />
        <span
          className="text-xl font-bold tracking-wide"
          style={{ color: "#0074C3" }}>
          Safaria
        </span>
      </div>
    </div>
  );
};
