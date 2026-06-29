import { Checkbox, Input } from "antd";
import { CiSearch } from "react-icons/ci";

type BookingClassFilterProps = {
  searchPlaceholder: string;
  options: string[];
};

export const BookingClassFilter = ({
  searchPlaceholder,
  options,
}: BookingClassFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="inputS1">
        <Input
          prefix={<CiSearch size={20} />}
          placeholder={searchPlaceholder}
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