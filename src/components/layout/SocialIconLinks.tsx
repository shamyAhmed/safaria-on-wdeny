"use client";

import { FaInstagram, FaXTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { useGetSettings } from "@/hooks/useGetSettings";
import { SocialLinks } from "@/app/[locale]/_types/Api";

const iconMap: Record<keyof SocialLinks, React.ReactNode> = {
  twitter:   <FaXTwitter />,
  facebook:  <FiFacebook />,
  instagram: <FaInstagram />,
  linkedIn:  <FaLinkedin />,
  whatsapp:  <FaWhatsapp />,
};

const ORDER: (keyof SocialLinks)[] = [
  "twitter",
  "facebook",
  "instagram",
  "linkedIn",
  "whatsapp",
];

const labelMap: Record<keyof SocialLinks, string> = {
  twitter: "Twitter",
  facebook: "Facebook",
  instagram: "Instagram",
  linkedIn: "LinkedIn",
  whatsapp: "WhatsApp",
};

// `web.whatsapp.com` only works in a desktop browser tab and can't deep-link into
// the WhatsApp app on mobile — always send users through a `wa.me` link instead.
const toWhatsAppDeepLink = (url: string): string => {
  if (!url.includes("web.whatsapp.com")) return url;
  try {
    const { searchParams } = new URL(url);
    const phone = searchParams.get("phone")?.replace(/\D/g, "");
    const text = searchParams.get("text");
    if (!phone) return url;
    return `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  } catch {
    return url;
  }
};

const resolveHref = (key: keyof SocialLinks, url: string): string =>
  key === "whatsapp" ? toWhatsAppDeepLink(url) : url;

// ── TopBar variant ────────────────────────────────────────────────────────────
// Renders a row of circular icon buttons (white/20 bg on the primary top-bar).
export function TopBarSocialLinks() {
  const { settings, isLoading } = useGetSettings();

  return (
    <div className="flex items-center gap-3">
      {isLoading
        ? ORDER.map((_, i) => (
            <div key={i} className="w-11 h-11 rounded-full bg-white/30 animate-pulse" />
          ))
        : ORDER.filter((key) => !!settings?.socialLinks?.[key]).map((key) => (
            <a
              key={key}
              href={resolveHref(key, settings!.socialLinks[key])}
              aria-label={labelMap[key]}
              className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {iconMap[key]}
            </a>
          ))}
    </div>
  );
}

// ── Footer variant ────────────────────────────────────────────────────────────
// Renders <li> elements to slot directly into the footer's <ul className="social">.
export function FooterSocialLinks() {
  const { settings, isLoading } = useGetSettings();

  return (
    <>
      {isLoading
        ? ORDER.map((_, i) => (
            <li key={i}>
              <div className="w-11 h-11 rounded-full bg-white/30 animate-pulse" />
            </li>
          ))
        : ORDER.filter((key) => !!settings?.socialLinks?.[key]).map((key) => (
            <li key={key}>
              <a
                href={resolveHref(key, settings!.socialLinks[key])}
                aria-label={labelMap[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center"
              >
                {iconMap[key]}
              </a>
            </li>
          ))}
    </>
  );
}
