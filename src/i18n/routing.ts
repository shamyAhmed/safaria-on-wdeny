import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  // localePrefix: "always",
  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: true,
  localePrefix: "always",
  localeCookie: {
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  },
});
