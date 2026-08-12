"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "antd";

function ContactFormSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form skeleton */}
      <div className="flex-1 flex flex-col gap-6">
        <Skeleton.Input active style={{ width: 220, height: 36, borderRadius: 10 }} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton.Input active size="small" style={{ width: 80, borderRadius: 6 }} />
            <Skeleton.Input active style={{ width: "100%", height: 46, borderRadius: 12 }} />
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <Skeleton.Input active size="small" style={{ width: 80, borderRadius: 6 }} />
          <Skeleton.Input active style={{ width: "100%", height: 110, borderRadius: 16 }} />
        </div>
        <Skeleton.Button active block style={{ height: 46, borderRadius: 12 }} />
      </div>

      {/* Image skeleton — mirrors the real image panel's 450px-min, full-height box.
          `style` lands on antd's inner element, whose wrapper is a shrink-to-fit
          inline-block, so the wrapper needs sizing of its own or the skeleton
          collapses to the width of the placeholder icon. */}
      <div className="flex-1">
        <Skeleton.Image
          active
          rootClassName="!block !w-full !h-full"
          style={{ width: "100%", minHeight: 450, height: "100%", borderRadius: 30 }}
        />
      </div>
    </div>
  );
}

const ContactFormSection = dynamic(
  () => import("./ContactFormSection").then((m) => m.ContactFormSection),
  { ssr: false, loading: () => <ContactFormSkeleton /> },
);

export function ContactFormLoader() {
  return <ContactFormSection />;
}
