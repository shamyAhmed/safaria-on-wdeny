import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { clearLocations } from "@/store/slices/private/privateTripSlice";
import { usePathname } from "@/i18n/navigation";

const DISCOVER_PRIVATE_PREFIX = "discover-private/";
const stripLocale = (pathname: string) => pathname.replace(/^\/[a-z]{2}\//, "").replace(/^\//, "");
const isAuthPath  = (path: string) => path.startsWith("auth/");

export const usePrivateCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevRef  = useRef<string>("");

  useEffect(() => {
    const prev    = stripLocale(prevRef.current);
    const current = stripLocale(pathname);

    // Never wipe journey state when auth pages are involved on either end
    if (isAuthPath(prev) || isAuthPath(current)) {
      prevRef.current = pathname;
      return;
    }

    const prevIsPrivatePage    = prev.startsWith(DISCOVER_PRIVATE_PREFIX);
    const currentIsPrivatePage = current.startsWith(DISCOVER_PRIVATE_PREFIX);

    if (prevIsPrivatePage && !currentIsPrivatePage) {
      dispatch(clearLocations());
    }

    prevRef.current = pathname;
  }, [pathname, dispatch]);
};
