import dayjs from "dayjs";

export type PassengerType = "adult" | "child" | "infant";

export interface PassengerState {
    id: number;
    type: PassengerType;
    displayNum: number;
    isExpanded: boolean;
    savedName: string | null;
}

/** Build the ordered passenger list from URL param counts (adults → children → infants). */
export function buildPassengerList(adults: number, children: number, infants: number): PassengerState[] {
    const list: PassengerState[] = [];
    let num = 1;
    for (let i = 0; i < adults; i++)
        list.push({ id: num, type: "adult", displayNum: num++, isExpanded: i === 0, savedName: null });
    for (let i = 0; i < children; i++)
        list.push({ id: num, type: "child", displayNum: num++, isExpanded: false, savedName: null });
    for (let i = 0; i < infants; i++)
        list.push({ id: num, type: "infant", displayNum: num++, isExpanded: false, savedName: null });
    return list;
}

// ─── API payload types ────────────────────────────────────────────────────────

export type PassengerTitle = "MR" | "MRS" | "MS" | "DR";
export type PassengerGender = "M" | "F";
export type PassengerTypeCode = "ADT" | "CHD" | "INF";

export type PassengerAddress = {
    countryCode: string;
    cityCode: string;
    line1: string;
    line2: string;
};

export type PassengerPayload = {
    title: PassengerTitle;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string; // YYYY-MM-DD
    documentNumber: string;
    nationalityCountryCode: string;
    residenceCountryCode: string;
    gender: PassengerGender;
    email: string;
    phone: string;
    passengerTypeCode: PassengerTypeCode;
    address: PassengerAddress;
};

export type SubmitPassengersPayload = {
    passengers: PassengerPayload[];
};

const typeToCode: Record<PassengerType, PassengerTypeCode> = {
    adult: "ADT",
    child: "CHD",
    infant: "INF",
};

/** Map a single passenger's flat form values to the API payload shape. */
export function buildPassengerPayload(
    id: number,
    type: PassengerType,
    formValues: Record<string, any>,
    email: string,
    phone: string,
): PassengerPayload {
    const p = (key: string) => formValues[`p_${id}_${key}`];
    const dob = p("dob");

    return {
        title: p("title") as PassengerTitle,
        firstName: p("firstName"),
        middleName: p("middleName") ?? "",
        lastName: p("lastName"),
        birthDate: dob ? dayjs(dob).format("YYYY-MM-DD") : "",
        documentNumber: p("passportNumber"),
        nationalityCountryCode: p("nationality"),
        residenceCountryCode: p("residenceCountry"),
        gender: p("gender") as PassengerGender,
        email,
        phone,
        passengerTypeCode: typeToCode[type],
        address: {
            countryCode: p("addressCountry") ?? "",
            cityCode: p("addressCity") ?? "",
            line1: p("addressLine1") ?? "",
            line2: p("addressLine2") ?? "",
        },
    };
}
