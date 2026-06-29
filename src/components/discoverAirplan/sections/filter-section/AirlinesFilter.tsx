import { Checkbox, Input } from "antd";
import { CiSearch } from "react-icons/ci";

type AirlinesFilterProps = {
  searchPlaceholder: string;
  options: string[];
};

export const AirlinesFilter = ({
  searchPlaceholder,
  options,
}: AirlinesFilterProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="inputS1">
        <Input
          placeholder={searchPlaceholder}
          prefix={<CiSearch size={20} />}
        />
      </div>
      {options.map((option) => (
        <div key={option} className="flex items-center justify-between">
          <Checkbox>{option}</Checkbox>
        </div>
      ))}
    </div>
  );
};