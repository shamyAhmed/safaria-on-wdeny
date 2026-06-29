// next-intl.config.ts
export default {
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "never", // ✅ No `/en`, `/ar` in URL
};
