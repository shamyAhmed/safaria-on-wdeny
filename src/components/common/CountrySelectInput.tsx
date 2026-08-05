"use client";
import { Form, Select } from "antd";
import { useTranslations } from "next-intl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useGetCountries from "@/app/[locale]/_hooks/useGetCountries";
import { Country } from "@/app/[locale]/_types/Country";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  onSelect?: (country: Country | undefined) => void;
  disabled?: boolean;
  rules?: any[];
};

export const CountrySelectInput = ({
  name,
  label,
  placeholder,
  onSelect,
  disabled = false,
  rules,
}: Props) => {
  const t = useTranslations("common");
  const { data, isLoading } = useGetCountries();

  const handleSelect = (val: string) => {
    const country = data?.find((c) => c.iso2 === val);
    onSelect?.(country);
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}>
      <Select
        placeholder={placeholder ?? t("selectCountry")}
        showSearch
        allowClear
        //@ts-expect-error this is an error
        autoComplete="off"
        filterOption={(input, option) =>
          (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
        }
        onSelect={handleSelect}
        disabled={disabled}
        loading={isLoading}
        notFoundContent={
          isLoading ? (
            <div className="h-[80px] flex justify-center items-center">
              <AiOutlineLoading3Quarters
                size={20}
                className="animate-spin text-primary"
              />
            </div>
          ) : undefined
        }
        options={
          data?.map((c) => ({
            value: c.iso2,
            label: c.name,
          })) ?? []
        }
        optionRender={(option) => (
          <div className="flex items-center justify-between gap-2 py-2.5 min-h-11">
            <span className="text-sm text-gray-700">{option.data.label}</span>
            <span className="text-xs text-white bg-primary px-2 py-0.5 rounded shrink-0">
              {option.data.value}
            </span>
          </div>
        )}
        dropdownStyle={{ minWidth: "260px" }}
        className="min-h-11"
      />
    </Form.Item>
  );
};
