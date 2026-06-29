import { Checkbox, Input } from "antd";
import { CiSearch } from "react-icons/ci";

type StopAirportFilterProps = {
  searchPlaceholder: string;
  options: string[];
};

export const StopAirportFilter = ({
  searchPlaceholder,
  options,
}: StopAirportFilterProps) => {
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