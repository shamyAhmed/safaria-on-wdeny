import type { Metadata } from "next";

/**
 * Single source of truth for per-page SEO metadata.
 *
 * Every indexable page builds its metadata through `pageMetadata()` so that it
 * gets a self-referencing canonical, a complete hreflang cluster and a unique
 * title/description pair. Pages behind auth or inside a checkout flow use
 * `privatePageMetadata()` instead, which marks them noindex.
 */

export const SITE_URL = "https://safaria.travel";
export const SITE_NAME = "Safaria";

export type AppLocale = "ar" | "en";

export const DEFAULT_LOCALE: AppLocale = "ar";
export const LOCALES: readonly AppLocale[] = ["ar", "en"];

export const normalizeLocale = (locale: string): AppLocale =>
  LOCALES.includes(locale as AppLocale) ? (locale as AppLocale) : DEFAULT_LOCALE;

type SeoCopy = { title: string; description: string };

/**
 * Titles are written to land in the 30–60 character window Google renders
 * (the root layout appends " | Safaria" to everything except the home page),
 * and every description is unique to the page it belongs to.
 */
export const SEO_COPY = {
  home: {
    ar: {
      title: "سفرية | حجز تذاكر الطيران والاتوبيسات والرحلات الخاصة",
      description:
        "سفرية منصة متكاملة لحجز رحلات الطيران وتذاكر الاتوبيسات والرحلات الخاصة بأسعار واضحة ودفع آمن، مع تأكيد فوري للحجز وخدمة عملاء على مدار الساعة.",
    },
    en: {
      title: "Safaria | Book Flights, Buses and Private Trips",
      description:
        "Safaria is a complete travel platform for booking flights, intercity bus tickets and private trips with transparent pricing, secure payment and instant confirmation.",
    },
  },
  aboutUs: {
    ar: {
      title: "من نحن — منصة سفرية لحجز رحلات السفر",
      description:
        "تعرّف على منصة سفرية ورؤيتنا في تسهيل حجز رحلات الطيران والاتوبيسات والرحلات الخاصة، وعلى شركات النقل المعتمدة التي نعمل معها لتوفير تجربة سفر موثوقة.",
    },
    en: {
      title: "About Safaria — Our Travel Booking Platform",
      description:
        "Learn about Safaria, our mission to make booking flights, buses and private trips simple and secure, and the verified transport partners we work with.",
    },
  },
  blogs: {
    ar: {
      title: "المدونة — نصائح وأدلة السفر والرحلات",
      description:
        "مقالات ونصائح عن حجز الرحلات، أفضل أوقات السفر، وجهات مميزة داخل السعودية وخارجها، وكل ما تحتاج معرفته قبل شراء تذكرتك القادمة.",
    },
    en: {
      title: "Travel Blog — Trip Guides and Booking Tips",
      description:
        "Articles and practical advice on booking trips, the best times to travel, standout destinations and everything worth knowing before buying your next ticket.",
    },
  },
  companies: {
    ar: {
      title: "شركات النقل والسفر المعتمدة على سفرية",
      description:
        "استعرض شركات النقل والسفر المعتمدة على منصة سفرية، وتعرّف على أسطول كل شركة وخطوط رحلاتها وأسعارها قبل اختيار الرحلة المناسبة لك.",
    },
    en: {
      title: "Verified Transport and Travel Companies",
      description:
        "Browse the transport and travel companies verified on Safaria, and compare each operator's fleet, routes and fares before choosing the trip that suits you.",
    },
  },
  contactUs: {
    ar: {
      title: "تواصل معنا — خدمة عملاء سفرية",
      description:
        "راسل فريق سفرية للاستفسار عن الحجوزات، تعديل الرحلات، أو طلب الدعم. تجد هنا أرقام التواصل والبريد الإلكتروني ونموذج إرسال الرسائل.",
    },
    en: {
      title: "Contact Safaria — Support and Enquiries",
      description:
        "Reach the Safaria team about bookings, trip changes or general support. Find our phone numbers, email address and message form on this page.",
    },
  },
  discover: {
    ar: {
      title: "استكشف الرحلات المتاحة واحجز تذكرتك",
      description:
        "ابحث في رحلات الطيران والاتوبيسات والرحلات الخاصة المتاحة، وقارن الأوقات والأسعار وشركات النقل، ثم أكمل حجزك في خطوات قليلة.",
    },
    en: {
      title: "Discover Trips and Book Your Next Journey",
      description:
        "Search available flights, bus routes and private trips, compare departure times, fares and operators, then complete your booking in a few steps.",
    },
  },
  discoverAirplane: {
    ar: {
      title: "حجز تذاكر الطيران بأفضل الأسعار",
      description:
        "ابحث عن رحلات الطيران الداخلية والدولية، قارن أسعار شركات الطيران ومواعيد الإقلاع ودرجات المقاعد، واحجز تذكرتك بدفع آمن وتأكيد فوري.",
    },
    en: {
      title: "Flight Booking — Compare and Book Air Tickets",
      description:
        "Search domestic and international flights, compare airline fares, departure times and cabin classes, then book your ticket with secure payment.",
    },
  },
  discoverBus: {
    ar: {
      title: "حجز تذاكر الاتوبيسات بين المدن",
      description:
        "احجز تذاكر الاتوبيسات بين المدن واختر مقعدك على الخريطة، مع مواعيد رحلات واضحة وأسعار مناسبة من شركات النقل المعتمدة على سفرية.",
    },
    en: {
      title: "Bus Booking — Intercity Bus Tickets Online",
      description:
        "Book intercity bus tickets and pick your seat from the seat map, with clear departure times and affordable fares from verified operators on Safaria.",
    },
  },
  discoverPrivate: {
    ar: {
      title: "الرحلات الخاصة — سيارة مع سائق",
      description:
        "اطلب رحلة خاصة بسيارة وسائق لأي مسار داخل المدينة أو بين المدن، وحدد موعد الانطلاق وعدد المرافقين واحصل على سعر واضح قبل التأكيد.",
    },
    en: {
      title: "Private Trips — Book a Car with a Driver",
      description:
        "Request a private trip with a car and driver for any route within or between cities, set your departure time and passenger count, and see the price upfront.",
    },
  },
  faqs: {
    ar: {
      title: "الأسئلة الشائعة عن الحجز والدفع",
      description:
        "إجابات عن أكثر الأسئلة تكرارًا حول الحجز والدفع والإلغاء واسترداد المبالغ وتعديل الرحلات وبرنامج النقاط على منصة سفرية.",
    },
    en: {
      title: "Frequently Asked Questions About Booking",
      description:
        "Answers to the most common questions about booking, payment, cancellation, refunds, trip changes and the points programme on Safaria.",
    },
  },
  loyaltyProgram: {
    ar: {
      title: "برنامج الولاء — اجمع نقاطك واستبدلها",
      description:
        "اعرف كيف تجمع نقاط سفرية مع كل حجز، وكيف تستبدلها بخصومات ومكافآت، وما هي مستويات العضوية والمزايا الخاصة بكل مستوى.",
    },
    en: {
      title: "Loyalty Program — Earn and Redeem Points",
      description:
        "See how you earn Safaria points on every booking, how to redeem them for discounts and rewards, and what each membership tier unlocks.",
    },
  },
  privacyPolicy: {
    ar: {
      title: "سياسة الخصوصية وحماية البيانات",
      description:
        "تشرح هذه الصفحة البيانات التي تجمعها منصة سفرية، وكيفية استخدامها وحمايتها ومشاركتها مع شركات النقل، وحقوقك في الوصول إليها أو حذفها.",
    },
    en: {
      title: "Privacy Policy and Data Protection",
      description:
        "This page explains what data Safaria collects, how it is used, protected and shared with transport partners, and your rights to access or delete it.",
    },
  },
  termsAndConditions: {
    ar: {
      title: "الشروط والأحكام لاستخدام منصة سفرية",
      description:
        "الشروط والأحكام التي تنظم استخدام منصة سفرية، وتشمل قواعد الحجز والدفع والإلغاء ومسؤوليات المستخدم وشركات النقل المعتمدة.",
    },
    en: {
      title: "Terms and Conditions of Using Safaria",
      description:
        "The terms governing your use of Safaria, covering booking, payment and cancellation rules along with the responsibilities of users and transport partners.",
    },
  },
  products: {
    ar: {
      title: "المتجر — العضويات والمنتجات المتوفرة",
      description:
        "استعرض العضويات والمنتجات المتوفرة على سفرية، وقارن مزايا كل باقة وأسعارها قبل الشراء، مع دفع آمن وتوصيل الطلبات.",
    },
    en: {
      title: "Store — Memberships and Available Products",
      description:
        "Browse the memberships and products available on Safaria, compare what each package includes and its price, and check out with secure payment.",
    },
  },
} satisfies Record<string, Record<AppLocale, SeoCopy>>;

export type SeoPageKey = keyof typeof SEO_COPY;

const localeUrl = (locale: AppLocale, path: string) =>
  `${SITE_URL}/${locale}${path}`;

/**
 * Self-referencing canonical plus the full ar/en/x-default hreflang cluster for
 * a locale-agnostic path such as "" (home), "/companies" or "/blogs/my-post".
 */
export const buildAlternates = (
  locale: string,
  path: string
): Metadata["alternates"] => ({
  canonical: localeUrl(normalizeLocale(locale), path),
  languages: {
    ar: localeUrl("ar", path),
    en: localeUrl("en", path),
    "x-default": localeUrl(DEFAULT_LOCALE, path),
  },
});

type PageMetadataOptions = {
  locale: string;
  /** Path without the locale segment: "" for home, "/companies" otherwise. */
  path: string;
  /** Key into SEO_COPY. Omit when passing an explicit title/description. */
  page?: SeoPageKey;
  /** Overrides SEO_COPY — used by pages whose title comes from the API. */
  title?: string;
  description?: string;
  /** Skip the "%s | Safaria" title template (the home page already says it). */
  absoluteTitle?: boolean;
  images?: string[];
};

export function pageMetadata({
  locale,
  path,
  page,
  title,
  description,
  absoluteTitle = false,
  images = ["/images/home-hero.webp"],
}: PageMetadataOptions): Metadata {
  const resolvedLocale = normalizeLocale(locale);
  const copy = page ? SEO_COPY[page][resolvedLocale] : undefined;

  const resolvedTitle = title ?? copy?.title ?? SITE_NAME;
  const resolvedDescription = description ?? copy?.description;
  const url = localeUrl(resolvedLocale, path);

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: buildAlternates(resolvedLocale, path),
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: SITE_NAME,
      locale: resolvedLocale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: resolvedLocale === "ar" ? "en_US" : "ar_SA",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images,
    },
  };
}

/**
 * API-supplied copy (blog bodies, CMS pages) arrives as HTML. Strip the markup
 * and trim to the length Google actually renders before using it as a description.
 */
export function toMetaDescription(
  html: string | null | undefined,
  maxLength = 158
): string | undefined {
  if (!html) return undefined;

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) return undefined;
  if (text.length <= maxLength) return text;

  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 60 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/**
 * Auth, account and checkout screens: keep them out of the index entirely
 * rather than giving them canonicals and descriptions they don't need.
 */
export function privatePageMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}
