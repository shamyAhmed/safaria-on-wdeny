"use client";

import React from "react";
import Image from "next/image";
import { Country } from "@/app/[locale]/_types/Country";

// Safaria operates in Egypt only — the phone code is fixed to +20 and the
// flag/country picker is intentionally non-interactive (single option).
const EGYPT = { value: "EG", dialCode: "20", flag: "/flags/eg.svg" };

type CountryCodeSelectProps = {
  value?: string;
  onChange?: (countryValue: string, dialCode: string) => void;
  disabled?: boolean;
  countries?: Country[];
  align?: "left" | "right";
};

export function CountryCodeSelect(_props: CountryCodeSelectProps) {
  return (
    <div className="relative h-[48px]">
      <div className="flex h-full gap-2 items-center justify-between rounded-2xl border border-[#E7E7E7] bg-white px-2 text-[#4A4A4A]">
        <span className="text-xs leading-none w-[4ch]">+{EGYPT.dialCode}</span>
        <span className="flex shrink-0 h-[22px] w-[35px] items-center justify-center overflow-hidden rounded-full">
          <Image src={EGYPT.flag} alt="Egypt" width={35} height={22} />
        </span>
      </div>
    </div>
  );
}
