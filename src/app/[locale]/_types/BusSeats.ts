export type SeatClass = "driver" | "space" | "door" | "booked" | "available" | "wc";

export type BusSeat = {
    id: string | null;
    seat_no: string | null;
    class: SeatClass;
    category: string | null;
    level: number | null;
};

export type BusSalon = {
    id: number;
    name: string;
    rows: number;
    columns: number;
    direction: "ltr" | "rtl";
    levels: number;
};

export type BusSeatsPayload = {
    salon: BusSalon;
    seats_map: BusSeat[];
};
