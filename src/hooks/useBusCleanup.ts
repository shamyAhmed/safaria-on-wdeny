import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { clearBusSearchState } from "@/store/slices/bus/busSlice";
import { usePathname } from "@/i18n/navigation";

const DISCOVER_BUS_PATH        = "discover-bus";
const stripLocale = (pathname: string) => pathname.replace(/^\/[a-z]{2}\//, "").replace(/^\//, "");
const isAuthPath  = (path: string) => path.startsWith("auth/");

export const useBusCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevRef  = useRef<string>("");

  useEffect(() => {
    const prev    = stripLocale(prevRef.current);
    const current = stripLocale(pathname);

    // Never wipe search state when auth pages are involved on either end
    if (isAuthPath(prev) || isAuthPath(current)) {
      prevRef.current = pathname;
      return;
    }

    // Clear bus search cities when leaving the bus discovery list page.
    // Trip details and station selection are no longer kept in Redux — they
    // flow via URL params and a fresh API call — so nothing else to clear.
    if (!(prev === DISCOVER_BUS_PATH || current === DISCOVER_BUS_PATH) || current === "") {
      dispatch(clearBusSearchState());
    }

    prevRef.current = pathname;
  }, [pathname, dispatch]);
};
