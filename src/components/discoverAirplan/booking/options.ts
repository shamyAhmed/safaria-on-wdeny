export const LOCATION_OPTIONS = [
    { value: "EG", label: "مصر" },
    { value: "SA", label: "المملكة العربية السعودية" },
    { value: "AE", label: "الإمارات العربية المتحدة" },
    { value: "KW", label: "الكويت" },
    { value: "QA", label: "قطر" },
    { value: "JO", label: "الأردن" },
    { value: "LB", label: "لبنان" },
    { value: "SY", label: "سوريا" },
    { value: "IQ", label: "العراق" },
    { value: "MA", label: "المغرب" },
    { value: "US", label: "الولايات المتحدة الأمريكية" },
    { value: "GB", label: "المملكة المتحدة" },
    { value: "FR", label: "فرنسا" },
    { value: "DE", label: "ألمانيا" },
    { value: "TR", label: "تركيا" },
];

export const TITLE_OPTIONS = [
    { value: "MR",  gender: "M" },
    { value: "MRS", gender: "F" },
    { value: "MS",  gender: "F" },
];

export const TITLE_TO_GENDER: Record<string, string> = {
    MR:  "M",
    MRS: "F",
    MS:  "F",
};

export const GENDER_OPTIONS = [
    { value: "M" },
    { value: "F" },
];
