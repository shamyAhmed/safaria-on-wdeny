/**
 * The home page *is* "/", so a CMS call-to-action pointing there means "go back
 * to the search form" — scroll instead of triggering a pointless navigation.
 * The same holds for empty and hash-only targets.
 */
export const isScrollTarget = (url: string | null | undefined): boolean =>
  !url?.trim() || url === "/" || url.startsWith("#");

export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });
