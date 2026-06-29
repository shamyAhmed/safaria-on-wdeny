import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";

const baseUrl = "https://safaria.travel";

// Account/auth/checkout/booking flows carry no SEO value and shouldn't be crawled
const privatePaths = [
  "/auth",
  "/checkout",
  "/user",
  "/failed-payment",
  "/success-payment",
  "/sucsses-order",
  "/discover-airplan/booking",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = routing.locales.flatMap((locale) =>
    privatePaths.map((path) => `/${locale}${path}`)
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
