import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

import MainLayout from "@/components/layout/MainLayout";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { Providers } from "@/providers/providers";
import { routing } from "@/i18n/routing";
import { SEO_COPY, SITE_NAME, SITE_URL, normalizeLocale } from "@/lib/seo";

import "@/styles/globals.scss";
import "@/styles/sections.scss";
import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "swiper/css/navigation";

import { Tajawal } from "next/font/google";
import LocalFont from "next/font/local";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
  variable: "--font-tajawal",
});

const Norsal = LocalFont({
  src: "../../../public/fonts/norsal.woff2"
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isArabic = normalizeLocale(locale) === "ar";

  // Fallback only. Every indexable page sets its own title, description,
  // canonical and hreflang cluster through `pageMetadata()` in src/lib/seo.ts,
  // so nothing inherits this description and ends up duplicated.
  const description = isArabic
    ? SEO_COPY.home.ar.description
    : SEO_COPY.home.en.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SEO_COPY.home[isArabic ? "ar" : "en"].title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    icons: {
      icon: "/favicon.svg",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Safaria",
    url: "https://safaria.travel",
    logo: "https://safaria.travel/images/logo.png",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Safaria",
    url: "https://safaria.travel",
  };

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${Norsal.className} ${tajawal.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
