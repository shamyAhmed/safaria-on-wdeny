"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { Provider, useDispatch } from "react-redux";
import { appStore, AppDispatch } from "@/store/appStore";
import { clearFlight, clearSearchState } from "@/store/slices/flight/flightSlice";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useScrollTop } from "@/hooks/useScrollTop";
import { antdLocale } from "@/utils/antdLocale";
import { useBusCleanup } from "@/hooks/useBusCleanup";
import { usePrivateCleanup } from "@/hooks/usePrivateCleanup";

const BOOKING_PATH = "discover-airplan/booking";
const DISCOVER_AIRPLAN_PATH = "discover-airplan";

// Navigating to these paths from booking should NOT clear flight state
const pathWithoutLocale = (pathname: string) =>
  pathname.replace(/^\//, "");

const isAuthPath = (path: string) => path.startsWith("auth/");

const ScrollTop = () => {
  useScrollTop();
  return null;
};

const BusCleanup = () => {
  useBusCleanup();
  return null;
};

const PrivateCleanup = () => {
  usePrivateCleanup();
  return null;
};

// Clears flight Redux slice whenever the user navigates away from the booking page,
// unless either the origin or destination is an authentication page (login / OTP / register).
const FlightCleanup = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    const prev = pathWithoutLocale(prevPathRef.current);
    const current = pathWithoutLocale(pathname);

    // Never wipe journey state when auth pages are involved on either end
    if (isAuthPath(prev) || isAuthPath(current)) {
      prevPathRef.current = pathname;
      return;
    }

    if (prev === BOOKING_PATH && current !== BOOKING_PATH) {
      dispatch(clearFlight());
    }

    if (!(prev === DISCOVER_AIRPLAN_PATH || current === DISCOVER_AIRPLAN_PATH) || current === "") {
      dispatch(clearSearchState());
    }

    prevPathRef.current = pathname;
  }, [pathname, dispatch]);

  return null;
};

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const locale = useLocale();

  const theme = {
    token: {
      fontFamily:
        locale === "ar"
          ? "'Norsal', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          : "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  };

  return (
    <Provider store={appStore}>
      <ScrollTop />
      <FlightCleanup />
      <BusCleanup />
      <PrivateCleanup />
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            theme={theme}
            locale={antdLocale(locale)}
            direction={locale === "ar" ? "rtl" : "ltr"}
          >
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </Provider>
  );
}
