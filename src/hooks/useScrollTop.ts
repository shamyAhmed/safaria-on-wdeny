"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export function useScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}
