// Only allow same-site relative paths through `redirect=` query params before
// navigating — blocks `//evil.com`, `https://evil.com`, `javascript:`, etc.
// (open-redirect risk usable in phishing: report #40).
export const getSafeRedirect = (redirect: string | null, fallback = "/"): string => {
  if (!redirect) return fallback;
  if (!redirect.startsWith("/")) return fallback;
  if (redirect.startsWith("//")) return fallback;
  if (redirect.includes(":")) return fallback;
  return redirect;
};
