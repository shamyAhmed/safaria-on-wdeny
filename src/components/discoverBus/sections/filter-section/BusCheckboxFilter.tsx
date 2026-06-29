import { useState } from "react";
import { Checkbox, Input } from "antd";
import { CiSearch } from "react-icons/ci";

const INITIAL_VISIBLE = 5;

type BusCheckboxFilterProps = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export const BusCheckboxFilter = ({ options, selected, onChange }: BusCheckboxFilterProps) => {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase()),
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  const toggle = (option: string) => {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option],
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="inputS1">
        <Input
          placeholder="بحث"
          prefix={<CiSearch size={20} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {visible.map((option) => (
        <div key={option} className="flex items-center justify-between">
          <Checkbox
            checked={selected.includes(option)}
            onChange={() => toggle(option)}>
            {option}
          </Checkbox>
        </div>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-primary text-sm font-medium text-start hover:opacity-75 transition-opacity">
          {showAll ? "أقل" : "المزيد"}
        </button>
      )}
    </div>
  );
};
