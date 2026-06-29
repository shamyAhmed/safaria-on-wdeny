# Bus API Reference (Wdeny)

All endpoints are relative to the Wdeny base URL (`src/lib/axios.js`).  
Auth is handled by the existing Wdeny axios interceptor — no separate token needed (unlike Safaria).

---

## GET /buses/locations
Returns a flat list of **cities** (not sub-city stops). Used to seed the home form search.  
Supports optional `?term=` query param for search/filter.

**Response**
```json
{
  "status": 200,
  "data": [
    { "id": 1, "name": "القاهره", "name_ar": "القاهره", "name_en": "Cairo" },
    { "id": 2, "name": "الاسكندريه", "name_ar": "الاسكندريه", "name_en": "Alexandria" }
  ]
}
```

---

## GET /buses/stations
Returns the same city-level shape as `/buses/locations`.  
Also supports `?term=`. Decide which one to use and use it consistently.

---

## GET /buses/carriers
Returns a list of bus carriers. Carrier pictures (`avatar`, `bus_image`, `pin`) are also embedded per-trip in `company_data`, so this endpoint is primarily useful for building a pre-flight filter list.

---

## GET /buses/trips
Search for trips between two cities.

**Query params**
| param | type | example |
|---|---|---|
| `city_from` | integer (city id) | `1` |
| `city_to` | integer (city id) | `2` |
| `date` | string `YYYY-MM-DD` | `2026-07-01` |
| `page` | integer | `1` |
| `currency` | string (currency code) | `SAR` |

**Response — single trip object shape**
```json
{
  "id": 290545,
  "gateway_id": "Tazcara",
  "company": "النورس للنقل البري",
  "company_data": {
    "name": "النورس للنقل البري",
    "avatar": "https://.../companies/40.png",
    "bus_image": "https://.../buses/default.jpeg",
    "pin": "https://.../pins/nowras.png"
  },
  "category": "VIP",
  "date": "2025-02-10",
  "time": "07:00 am",
  "date_time": "2025-02-10 07:00",
  "bus": {
    "id": 290545,
    "code": "النورس للنقل البري-290545",
    "category": "VIP",
    "salon": "vip",
    "type": "bus"
  },
  "cities_from": [
    { "id": 1, "name": "القاهره", "latitude": "", "longitude": "", "price": 0 }
  ],
  "cities_to": [
    { "id": 2, "name": "الاسكندريه", "latitude": "", "longitude": "", "price": 0 }
  ],
  "stations_from": [
    {
      "id": 985052,
      "city_id": 1,
      "city_name": "القاهره",
      "arrival_at": "2025-02-10 07:00:00",
      "name": "القللي",
      "latitude": "30.060136",
      "longitude": "31.243630",
      "price": 0,
      "original_price": 0,
      "final_price": 0,
      "categories": []
    }
  ],
  "stations_to": [
    {
      "id": 985053,
      "city_id": 2,
      "city_name": "الاسكندريه",
      "arrival_at": "2025-02-10 10:00:00",
      "name": "محرم بك",
      "latitude": "",
      "longitude": "",
      "price": 148.5,
      "original_price": 150,
      "final_price": 148.5
    }
  ],
  "pricing": [],
  "price_start_with": 148.5,
  "prices_start_with": {
    "original_price": 150,
    "final_price": 148.5,
    "offer": "1%"
  },
  "available_seats": 0
}
```

> **Note:** `company_data.avatar` is the carrier logo. No separate carriers endpoint call is needed to show carrier pictures on cards.

---

## GET /buses/trips/:id
Returns the **same shape as the search response** (an array with one trip object).  
Use `data[0]` on the booking page to get the trip detail.

---

## GET /buses/trips/:id/seats

**Query params**
| param | type | note |
|---|---|---|
| `from_city_id` | integer | city id from `cities_from[n].id` |
| `to_city_id` | integer | city id from `cities_to[n].id` |
| `from_location_id` | string | station id from `stations_from[n].id` |
| `to_location_id` | string | station id from `stations_to[n].id` |
| `date` | string `YYYY-MM-DD` | trip date |

**Response**
```json
{
  "status": 200,
  "data": {
    "salon": {
      "id": 289921,
      "name": "Express",
      "rows": 13,
      "columns": 5,
      "direction": "ltr"
    },
    "seats_map": [
      { "seat_no": null, "class": "driver" },
      { "seat_no": null, "class": "space" },
      { "seat_no": null, "class": "door" },
      { "seat_no": "4", "class": "available" },
      { "seat_no": "3", "class": "booked" }
    ]
  }
}
```

---

## POST /buses/trips/:id/create-ticket

**Request body**
```json
{
  "from_city_id": 1,
  "to_city_id": 2,
  "from_location_id": "985052",
  "to_location_id": "985053",
  "date": "2026-04-06",
  "seats": [
    { "seat_type_id": "15", "seat_id": "15" }
  ]
}
```

> `from_location_id` and `to_location_id` are the `station.id` values from `stations_from`/`stations_to` in the trip response, cast to string.

**Response**
```json
{
  "status": 200,
  "data": {
    "id": 1,
    "gateway_order_id": 186263,
    "gateway_id": "WEBUS",
    "total": "295.00",
    "payment_data": {
      "status": "pending"
    },
    "station_from": {
      "id": 1,
      "name": "Lebanon Square _ Mohandessin",
      "latitude": "31.194320354715924",
      "longitude": "30.060248340581786",
      "price": null
    },
    "station_to": {
      "id": 5,
      "name": "Dahab Station",
      "latitude": "34.51482913932954",
      "longitude": "28.49466500751688",
      "price": null
    },
    "date": "2023-02-15T01:00:00.000000Z"
  }
}
```

> **Important:** The response does NOT include a payment URL. `payment_data` only contains `{ status: "pending" }`. Payment redirect logic needs to be investigated — it may require a separate pay endpoint or the URL is derived differently than in the private cycle.

---

## What does NOT exist in the new API

- **No round-trip / return-ticket endpoint.** The Safaria `busCreateRoundTicket`, `busReturnTicket`, and `busPayReturnOrder` routes have no equivalent. `useCreateReturnTicket.tsx` must be handled — either removed or kept as a stub pending a future endpoint.
- **No separate pay-order endpoint** visible in the collection for bus.
