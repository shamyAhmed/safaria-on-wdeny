export interface Notification {
  id: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  created_date: string;
  formatted_date: string;
  read_at: string | null;
}

export interface ProductType {
  _id: string;
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  finalPrice: number;
  currency: string;
  categoryId: string;
  color: string;
  items: Array<{
    size: string;
    stock: number;
    sku: string;
    _id: string;
  }>;
  trackStock: boolean;
  type: string;
  discountRate: number;
  averageRating: number;
  reviewCount: number;
  totalStock: number;
  availableSizes: string[];
  createdAt: string;
  updatedAt: string;
  defaultSize: string;
}

export interface CategoryType {
  _id: string;
  name: string;
}

export interface OfferCardProps {
  id: string;
  title: string;
  subtitle: string;
  endDate: Date;
  image: string;
  bgColor: "teal" | "gray" | "blue";
  buttonVariant: "outline-white" | "dark" | "white";
  onShopNow?: (id: string) => void;
  index?: number;
}

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "rating";

export interface FilterState {
  category?: string;
  priceRange?: string | null;
  rating?: number | null;
  sortBy?: SortOption;
  perPage?: number;
}

export interface MembershipPlan {
  _id: number;
  type: string;
  name: string;
  displayName: string;
  displayNameAr: string;
  price: number;
  currency: string;
  period: string;
  discountRate: number;
  pointsMultiplier: number;
  duration: string;
  metrics: {
    label: string;
    value: string | number;
    special?: boolean;
  }[];
  benefits: string[];
  additionalBenefits: {
    icon?: string | React.ReactNode;
    titleAr: string;
    titleEn: string;
    description: string;
  }[];
  pointsSystem: {
    title: string;
    description: string;
    example: string;
  };
  bgColor: "gold" | "silver" | "bronze";
  isPopular?: boolean;
  onSubscribe?: (id: string) => void;
}
