import { Input } from "antd";
import style from "./styles/search.module.scss";
import { IoSearch } from "react-icons/io5";

type SearchS1Type = {
  placeholder: string;
  value?: string | number | readonly string[];
  handleChange: (e: string) => void;
};

export const SearchS1 = ({
  placeholder,
  value = "",
  handleChange,
}: SearchS1Type) => {
  return (
    <div className={style.searchS1}>
      <Input
        placeholder={placeholder}
        allowClear
        prefix={<IoSearch className="text-xl text-[#999]" />}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
