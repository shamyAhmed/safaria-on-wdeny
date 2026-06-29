export type SocialLinks = {
  twitter: string;
  facebook: string;
  linkedIn: string;
  whatsapp: string;
  instagram: string;
};

export type Settings = {
  name: string;
  email: string;
  mobile: string;
  address: string;
  socialLinks: SocialLinks;
  apis: unknown[];
  app_version: string;
  app_link_on_google_store: string;
  app_link_on_apple_store: string;
  payment_gateway: string;
  invoice_options: unknown[];
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type WalletTransaction = {
  id: number;
  description: string;
  type: string;
  amount: string;
};

export type Wallet = {
  id: number;
  balance: string;
  transactions: WalletTransaction[];
};

export type ApiResponse<T> = {
  data: T;
  errors: Record<string, unknown>;
  message: string;
  status: number;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  pagination: {
    total: number;
    lastPage: number;
    perPage: number;
    currentPage: number;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
};
