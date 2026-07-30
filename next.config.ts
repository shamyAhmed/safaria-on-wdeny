import path from "path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  // Next streams metadata into <body> for any user agent it doesn't recognise as
  // an HTML-limited bot, and React only hoists it into <head> once JS runs. SEO
  // crawlers parse the raw HTML, so they saw title/description/canonical/hreflang
  // "outside head". Matching every UA makes metadata blocking, i.e. always in <head>.
  htmlLimitedBots: /.*/,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "amzn-s3-ecommerce-app.s3.eu-north-1.amazonaws.com",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // allow all paths under this domain
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portal.safaria.travel",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.safaria.travel",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portal.wdenytravel.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api-uat.wdenytravel.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pics.avs.io",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
