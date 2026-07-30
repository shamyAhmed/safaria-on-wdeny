import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { DEFAULT_LOCALE, SITE_URL } from "@/lib/seo";

const baseUrl = SITE_URL;

// Static, template-level public routes. Dynamic per-item pages (blog posts,
// products, companies) are intentionally excluded — listing those requires
// fetching live data from the API at build time.
const staticPaths = [
  "",
  "/about-us",
  "/blogs",
  "/companies",
  "/contact-us",
  "/discover",
  "/discover-airplan",
  "/discover-bus",
  "/discover-private",
  "/faqs",
  "/loyality-program",
  "/privacy-policy",
  "/products",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      // Mirrors the on-page hreflang cluster so the sitemap and the HTML agree.
      alternates: {
        languages: {
          ar: `${baseUrl}/ar${path}`,
          en: `${baseUrl}/en${path}`,
          "x-default": `${baseUrl}/${DEFAULT_LOCALE}${path}`,
        },
      },
    }))
  );
}
