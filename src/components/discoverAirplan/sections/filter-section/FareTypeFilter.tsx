import { Checkbox, Input } from "antd";
import { CiSearch } from "react-icons/ci";

type FareTypeFilterProps = {
  searchPlaceholder: string;
  options: string[];
};

export const FareTypeFilter = ({
  searchPlaceholder,
  options,
}: FareTypeFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="inputS1">
        <Input
          placeholder={searchPlaceholder}
          prefix={<CiSearch size={20} />}
        />
      </div>
      {options.map((option, index) => (
        <Checkbox key={option} checked={index === 0}>
          {option}
        </Checkbox>
      ))}
    </div>
  );
};