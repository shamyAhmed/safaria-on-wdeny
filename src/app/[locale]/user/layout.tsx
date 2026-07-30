import type { Metadata } from "next";

// Everything under /user is account-only. A layout-level noindex covers the
// screens that don't export metadata of their own (profile, my-trips, wallet,
// notifications, saved-addresses, flight-tickets, delete-account, logout).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
