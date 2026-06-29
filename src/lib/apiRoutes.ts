const apiRoutes = {
  airports: "/flights/iata",
  airportsSearch: "/flights/airports/search",
  countries: "/countries",
  searchFlight: "/flights/search",
  confirmOffer: (offerId: string) => `/flights/${offerId}/confirm`,
  offerBundles: (offerId: string) => `/flights/${offerId}/bundles`,
  submitPassengers: (offerId: string) => `/flights/${offerId}/passengers`,
  holdOffer: (offerId: string) => `/flights/${offerId}/hold`,
  pendingTrip: (offerId: string) => `/flights/${offerId}`,
  settings: "/settings",
  contact: "/contact",
  notifications: "/profile/notifications",
  wallet: "/profile/wallet",
  flightOrders: "/profile/orders/flights",
  flightOrderById: (id: number | string) => `/profile/orders/flights/${id}`,
  // ── Private trips (Wdeny API) ───────────────────────────────────────────────
  privateSearch: "/private/search",
  privateTripById: (id: string | number) => `/private/trips/${id}`,
  privateCreateOrder: "/private/orders",
  // ── Bus (Wdeny API) ─────────────────────────────────────────────────────────
  busLocations: "/buses/locations",
  busTrips: "/buses/trips",
  busTripById: (id: string | number) => `/buses/trips/${id}`,
  addressBook: "/profile/address-book",
  addressBookById: (id: number | string) => `/profile/address-book/${id}`,
  busSeats: (id: string | number) => `/buses/trips/${id}/seats`,
  busCreateTicket: (id: string | number) =>
    `/buses/trips/${id}/create-ticket`,
  faqs: "/faq",
  posts: "/posts",
  postBySlug: (slug: string) => `/posts/${slug}`,
} as const;

export default apiRoutes;