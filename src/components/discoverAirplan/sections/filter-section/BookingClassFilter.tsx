import { Checkbox, Input } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import type { CabinClass } from "@/app/[locale]/_types/SearchFlight";

export type BookingClassOption = { value: CabinClass; label: string };

type BookingClassFilterProps = {
  searchPlaceholder: string;
  options: BookingClassOption[];
  /** `null` means "whatever class the search was made with". */
  selected: CabinClass | null;
  onChange: (value: CabinClass | null) => void;
};

/**
 * The search endpoint takes a single `cabinClass`, so the boxes behave as a
 * one-of choice: ticking one replaces the current class, unticking it falls
 * back to the class the search was started with.
 */
export const BookingClassFilter = ({
  searchPlaceholder,
  options,
  selected,
  onChange,
}: BookingClassFilterProps) => {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const visibleOptions = query
    ? options.filter((option) => option.label.toLowerCase().includes(query))
    : options;

  return (
    <div className="flex flex-col gap-3">
      <div className="inputS1">
        <Input
          prefix={<CiSearch size={20} />}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
      </div>
      {visibleOptions.map((option) => (
        <Checkbox
          key={option.value}
          checked={selected === option.value}
          onChange={(e) => onChange(e.target.checked ? option.value : null)}>
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};
