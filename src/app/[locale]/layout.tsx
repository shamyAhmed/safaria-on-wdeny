import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";

import MainLayout from "@/components/layout/MainLayout";
import { Providers } from "@/providers/providers";
import { routing } from "@/i18n/routing";

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

  const isArabic = locale === "ar";

  const canonicalUrl = `https://safaria.travel/${locale}`;

  const description = isArabic
    ? "سفرية هي منصة متكاملة لحجز رحلات الطيران، وشركات النقل الخاصة، وحافلات النقل العام بسهولة وأمان، مع تجربة استخدام سلسة لجميع المستخدمين."
    : "Safaria is a comprehensive platform for booking flights, private transportation companies, and public buses, offering a seamless and secure travel experience.";

  return {
    title: {
      default: "Safaria",
      template: "%s | Safaria",
    },
    description,
    icons: {
      icon: "/favicon.svg",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: "https://safaria.travel/en",
        ar: "https://safaria.travel/ar",
      },
    },
    openGraph: {
      title: "Safaria",
      description,
      url: canonicalUrl,
      siteName: "Safaria",
      locale: isArabic ? "ar_SA" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SA",
      type: "website",
      images: [
        {
          url: "/images/home-hero.webp",
          width: 1200,
          height: 630,
          alt: "Safaria",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Safaria",
      description,
      images: ["/images/home-hero.webp"],
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
      </body>
    </html>
  );
}
