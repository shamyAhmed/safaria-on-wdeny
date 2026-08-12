import { BlogPost } from "../_hooks/useGetBlogs";

/**
 * `GET /site/blocks` returns the whole home page as an ordered list of blocks.
 * Every block carries a stable `id` (what the CMS calls the slot), a `type`
 * (what the site must *render*), a `sort` and a `type`-specific `data` payload.
 * The renderer switches on `type`, never on `id`, so the CMS can add a second
 * banner or reorder the page without a code change.
 */
export type SiteBlockType =
  | "stats"
  | "split_content"
  | "feature_showcase"
  | "banner"
  | "logo_carousel"
  | "partners"
  | "feature_grid"
  | "media_cards"
  | "steps"
  | "app_promo"
  | "posts"
  | "logo_grid";

/** Every user-facing string arrives as both translations at once. */
export interface LocalizedText {
  ar: string;
  en: string;
}

/** A logo tile, used by both `logo_carousel` and `logo_grid`. */
export interface SiteBlockLogo {
  image: string;
  alt: string;
  link: string;
}

/** Section heading shared by most block payloads. */
interface BlockHeading {
  title: LocalizedText;
  description: LocalizedText;
}

export interface StatsBlockData {
  items: {
    /** Either a Font Awesome class (`fas fa-users`) or an absolute image URL. */
    icon: string;
    label: LocalizedText;
    value: string;
  }[];
}

export interface SplitContentBlockData {
  title: LocalizedText;
  /** Paragraphs separated by blank lines. */
  body: LocalizedText;
  /** Gallery shown beside the copy; entries may be empty strings. */
  media: string[];
  cta_url: string;
  cta_label: LocalizedText;
}

export interface FeatureShowcaseBlockData extends BlockHeading {
  items: {
    image: string;
    title: LocalizedText;
    description: LocalizedText;
    cta_url: string;
    cta_label: LocalizedText;
  }[];
}

export interface BannerBlockData {
  image: string;
  alt: string;
  /** Empty when the banner is decorative rather than clickable. */
  link: string;
}

export interface LogoCarouselBlockData extends BlockHeading {
  items: SiteBlockLogo[];
}

export interface PartnersBlockData extends BlockHeading {
  partners: {
    id: number;
    title: string;
    description: string;
    title_ar: string;
    title_en: string;
    description_ar: string;
    description_en: string;
    sort: number;
    logo: string;
    images: string[];
  }[];
}

export interface FeatureGridBlockData extends BlockHeading {
  /** Full-bleed image painted behind the grid. */
  background: string;
  items: {
    icon: string;
    title: LocalizedText;
    description: LocalizedText;
  }[];
}

export interface MediaCardsBlockData extends BlockHeading {
  items: {
    image: string;
    title: LocalizedText;
    cta_url: string;
    cta_label: LocalizedText;
  }[];
}

export interface StepsBlockData extends BlockHeading {
  items: {
    image: string;
    title: LocalizedText;
    /** Pre-formatted ordinal, e.g. "01". */
    number: string;
  }[];
}

export interface AppPromoBlockData {
  title: LocalizedText;
  description: LocalizedText;
  media: string;
  apple_store_url: string;
  google_store_url: string;
}

export interface PostsBlockData extends BlockHeading {
  /** Empty when the CMS leaves the selection to the live blog feed. */
  posts: BlogPost[];
}

export interface LogoGridBlockData extends BlockHeading {
  items: SiteBlockLogo[];
}

interface SiteBlockBase<T extends SiteBlockType, D> {
  id: string;
  type: T;
  sort: number;
  data: D;
}

export type SiteBlock =
  | SiteBlockBase<"stats", StatsBlockData>
  | SiteBlockBase<"split_content", SplitContentBlockData>
  | SiteBlockBase<"feature_showcase", FeatureShowcaseBlockData>
  | SiteBlockBase<"banner", BannerBlockData>
  | SiteBlockBase<"logo_carousel", LogoCarouselBlockData>
  | SiteBlockBase<"partners", PartnersBlockData>
  | SiteBlockBase<"feature_grid", FeatureGridBlockData>
  | SiteBlockBase<"media_cards", MediaCardsBlockData>
  | SiteBlockBase<"steps", StepsBlockData>
  | SiteBlockBase<"app_promo", AppPromoBlockData>
  | SiteBlockBase<"posts", PostsBlockData>
  | SiteBlockBase<"logo_grid", LogoGridBlockData>;
