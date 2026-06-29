# Bus API Refactor Plan

## Goal

Use the new Wdeny API in the bus cycle and completely remove the Safaria API axios instance from the application. The bus cycle should rely solely on the Wdeny API.

> See `bus-api-reference.md` for full endpoint shapes, request bodies, and response examples.

### Step 1 — City Search (Home Page Form)
- `src/components/homePage/forms/BussForm.tsx` — replace the current city dropdown with a debounced search input that calls `GET /buses/locations?term=...` (or `/buses/stations?term=...` — pick one and use it consistently). Both endpoints return **city-level objects** (`{ id, name_ar, name_en }`), not sub-city stops. Match the debounced search pattern used in the flight form.
- `src/app/[locale]/_hooks/useGetBusLocations.tsx` — replace the Safaria call with the Wdeny `/buses/locations` endpoint; accept a `term` param for debounced search.
- `src/app/[locale]/_types/BusLocation.ts` — update to `{ id: number, name: string, name_ar: string, name_en: string }`.
- `src/components/homePage/sections/HeroForms.tsx` — un-comment the bus tab once the form is wired up.

### Step 2 — Save Selected Cities in Redux
- `src/store/slices/bus/busSlice.ts` — update `setBusCities` to store the full city objects (`{ id, name_ar, name_en }`) so the city `id` is available for the trips search query.
- `src/app/[locale]/_types/BusLocation.ts` — the same type is used here.

### Step 3 — Bootstrap Carriers on Discover Page Mount
- `src/store/slices/bus/` — add a new `busCarriersSlice.ts` to hold the carriers list.
- `src/store/appStore.ts` — register the new carriers reducer.
- Create a thunk (e.g. `fetchBusCarriers`) that calls `GET /buses/carriers` on mount of the discover page and stores the result in Redux.
- `src/components/discoverBus/DiscoverBusComponent.tsx` — dispatch the thunk on mount via `useEffect`.
- Note: carrier pictures (`avatar`, `bus_image`) are also embedded per-trip in `company_data` in the trips response, so the carriers store is mainly useful for building a filter list; it is not required to display logos on cards.

### Step 4 — Search Trips
- `src/app/[locale]/_hooks/useGetBusTrips.tsx` — replace the Safaria call with `GET /buses/trips?city_from={id}&city_to={id}&date=...&page=...&currency={code}`. The `city_from` and `city_to` are the integer city IDs from the Redux bus slice. Currency is passed as a query param (`currency=SAR`), not in the payload.
- `src/app/[locale]/_types/BusTrip.ts` — update to the new shape. Key fields: `id`, `company_data`, `category`, `date`, `time`, `bus`, `cities_from`, `cities_to`, `stations_from`, `stations_to`, `prices_start_with`, `available_seats`. See `bus-api-reference.md` for the full shape.

### Step 5 — Show Trip Stations on Card and Pass to Booking Page
- `src/components/discoverBus/cards/BusCard.tsx` — display `stations_from` and `stations_to` from the trip so the user can see available pickup/drop-off points. On card click, navigate to `/discover-bus/[id]` and pass the following as URL search params so the booking page can pre-select them and feed the seats/create-ticket calls:
  - `from_city_id` (from `cities_from[n].id`)
  - `to_city_id` (from `cities_to[n].id`)
  - `from_location_id` (from `stations_from[n].id`, cast to string)
  - `to_location_id` (from `stations_to[n].id`, cast to string)
  - `date`
- Use `company_data.avatar` directly from the trip object for the carrier logo — no Redux carriers lookup needed for this.
- `src/components/discoverBus/sections/BusFiltersSection.tsx` and related filter components — update filter field keys to match the new response shape.
- `src/store/slices/bus/busJourneySlice.ts` — slim down or remove: trip details and station selection are no longer stored in Redux; they flow via URL params and a fresh API call.

### Step 6 — Load Trip Details and Default Station Selection on Booking Page
- `src/app/[locale]/discover-bus/[id]/page.tsx` — on mount, fetch trip details via `GET /buses/trips/{id}` (returns same shape as search; use `data[0]`). Do **not** read trip data from Redux. Read `from_city_id`, `to_city_id`, `from_location_id`, `to_location_id`, and `date` from URL params and set them as the default selected stations. Allow the user to change their station choice from the trip's `stations_from` / `stations_to` arrays.

### Step 7 — Load Seats
- `src/app/[locale]/_hooks/useGetSeats.tsx` — replace the Safaria call with `GET /buses/trips/{id}/seats?from_city_id=...&to_city_id=...&from_location_id=...&to_location_id=...&date=...`. All params come from the URL or the user's station selection.
- `src/app/[locale]/discover-bus/[id]/_components/SeatMap.tsx` — update seat type references if the shape changes (response shape is similar: `salon` + `seats_map` array).
- `src/app/[locale]/_types/BusSeats.ts` — update to `{ salon: { id, name, rows, columns, direction }, seats_map: { seat_no: string|null, class: string }[] }`.

### Step 8 — Create Ticket (Reserve Seat)
- `src/app/[locale]/_hooks/useCreateTicket.tsx` — replace the Safaria call with `POST /buses/trips/{id}/create-ticket`. Payload: `{ from_city_id, to_city_id, from_location_id, to_location_id, date, seats: [{ seat_type_id, seat_id }] }`.
- **Important:** The create-ticket response returns `payment_data: { status: "pending" }` with **no payment URL**. The payment redirect logic differs from the private cycle and must be investigated before implementing. Do not assume a URL field exists in the response.
- `src/app/[locale]/_hooks/useCreateReturnTicket.tsx` — the new Wdeny API has **no round-trip endpoint**. This hook should be removed; if round-trip is a future requirement, leave a clear TODO comment.
- `src/app/[locale]/_types/BusOrder.ts` — update to match the new response: `{ id, gateway_order_id, gateway_id, total, payment_data: { status }, station_from, station_to, date }`.
- `src/app/[locale]/failed-payment/page.tsx` — verify the "try again" link still resolves correctly after routing changes.

### Currency Handling
- Pass `currency` as a query param to `GET /buses/trips` (e.g. `currency=SAR`) using the selected currency code from `state.currency.selected.code` in Redux.
- `src/components/discoverBus/cards/BusCard.tsx` — display prices using `CurrencyLabel` with the selected currency, matching the pattern in `src/components/discoverAirplan/cards/AirplaneCard.tsx` and `src/components/discoverPrivate/cards/PrivateCard.tsx`.
- `src/app/[locale]/discover-bus/[id]/page.tsx` — pass the selected currency code to the booking summary display. Note: unlike the private cycle, the create-ticket payload does not appear to include `currency_id` — verify with the actual API response before adding it.

### Auth Routes and Navigation
- Auth pages (`src/app/[locale]/auth/login/page.tsx`, `src/components/user/login/hooks/useLogin.tsx`) — verify the `?redirect=` and `?provider=` params still work after the routing changes.

### API Routes and Cleanup
- `src/lib/apiRoutes.ts` — replace all Safaria bus route strings with the following new Wdeny routes and remove Safaria entries:
  - `busLocations: "/buses/locations"`
  - `busTrips: "/buses/trips"`
  - `busTripById: (id) => /buses/trips/${id}`
  - `busSeats: (id) => /buses/trips/${id}/seats`
  - `busCreateTicket: (id) => /buses/trips/${id}/create-ticket"`
  - `busCarriers: "/buses/carriers"`
- `src/lib/safariaAxios.js` — delete once all bus hooks are migrated and no remaining imports exist.
- `src/app/[locale]/_types/Bus.ts` — review and remove if fully superseded by the updated types above.

## Verification

1. Run TypeScript compilation and confirm zero type errors.
2. Call each bus API endpoint via curl and inspect the raw response.
3. Confirm the response shape matches the defined types — if there is a mismatch, update the types and repeat from step 1.

## Rules

1. The agent will first discover the new bus API endpoints.
2. The agent will call each endpoint and inspect the actual response shape.
3. The agent will update existing types to match the returned response types.
4. The agent will define new types if and only if no existing type can be updated to cover the need.
5. The agent will update rendered UI and components only if the types they depend on have changed — if a type is unchanged, its consuming components must not be altered.
