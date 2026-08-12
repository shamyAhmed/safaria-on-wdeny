import { LocalizedText } from "@/app/[locale]/_types/SiteBlocks";

/**
 * CMS text arrives as `{ ar, en }`. Pick the active locale, falling back to the
 * other translation so a half-translated block still renders something.
 */
export const pickText = (
  value: LocalizedText | string | null | undefined,
  locale: string,
): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  const key = locale === "ar" ? "ar" : "en";
  const other = key === "ar" ? "en" : "ar";
  return value[key]?.trim() || value[other]?.trim() || "";
};

/** Split a CMS body into paragraphs on blank lines. */
export const toParagraphs = (body: string): string[] =>
  body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
