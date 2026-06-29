"use client";
import { Form, Select } from "antd";
import { BsAirplaneFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { DEBOUNCE_INTERVAL } from "../../../../config";
import useGetAirports from "@/app/[locale]/_hooks/useGetAirports";
import { Airport } from "@/app/[locale]/_types/Airport";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { setOrigin, setDestination } from "@/store/slices/flight/flightSlice";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  index: number;
  type: "origin" | "destination";
  iconRotation?: string;
  form?: any;
  onAirportSelect?: (airport: Airport | undefined) => void;
  readonly?: boolean;
};

export const AirportSelectInput = ({
  name,
  label,
  placeholder,
  index,
  type,
  iconRotation = "rotate(45deg)",
  form,
  onAirportSelect,
  readonly = false,
}: Props) => {
  const [search, setSearch] = useState("");
  const [typingLocale, setTypingLocale] = useState<string | undefined>();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dispatch = useDispatch<AppDispatch>();

  const selected = useSelector((state: RootState) =>
    type === "origin"
      ? state.flight.origins[index] ?? null
      : state.flight.destinations[index] ?? null,
  );

  const { isLoading, data } = useGetAirports(search, typingLocale);

  function handleSearch(e: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const detected = /[؀-ۿ]/.test(e) ? "ar" : "en";
    debounceRef.current = setTimeout(() => {
      setTypingLocale(detected);
      setSearch(e);
    }, DEBOUNCE_INTERVAL);
  }

  const handleSelect = (val: string) => {
    const airport = data?.find((a) => a.iata_code === val);
    if (!airport) return;
    if (type === "origin") dispatch(setOrigin({ index, airport }));
    else dispatch(setDestination({ index, airport }));
    setSearch("");
    onAirportSelect?.(airport);
  };

  const handleClear = () => {
    if (type === "origin") dispatch(setOrigin({ index, airport: null }));
    else dispatch(setDestination({ index, airport: null }));
    form?.setFieldValue(name, undefined);
    onAirportSelect?.(undefined);
  };

  return (
    <div className="inputS1">
      <Form.Item label={label} name={name}>
        {selected ? (
          <div className="relative">
            <p className="text-base font-semibold text-black">
              {selected.iata_code}
            </p>
            <p className="text-sm text-gray-600 text-ellipsis overflow-hidden w-full whitespace-nowrap">
              {[selected.country, selected.city, selected.name].join(" - ")}
            </p>
            {!readonly && (
              <IoMdClose
                size={16}
                onClick={handleClear}
                className="p-[2px] cursor-pointer bg-gray-500 rounded-full text-white absolute top-0 end-0 opacity-60 hover:opacity-100 transition-all duration-75"
              />
            )}
          </div>
        ) : (
          <Select
            placeholder={placeholder}
            prefix={
              <BsAirplaneFill
                className="text-lg text-[#819DAF]"
                style={{ transform: iconRotation }}
              />
            }
            showSearch={!readonly}
            open={readonly ? false : undefined}
            onSearch={readonly ? undefined : handleSearch}
            filterOption={false}
            onSelect={handleSelect}
            options={data || []}
            loading={isLoading}
            defaultActiveFirstOption={false}
            notFoundContent={
              !search ? false : isLoading ? (
                <div className="h-[100px] flex justify-center items-center">
                  <AiOutlineLoading3Quarters size={20} className="animate-spin text-primary" />
                </div>
              ) : undefined
            }
            dropdownStyle={{ width: "auto", minWidth: "300px", padding: "0px" }}
            fieldNames={{ value: "iata_code" }}
            optionRender={(option, {index}) => (
              <div
                className="flex gap-2 py-2"
                autoFocus={index === 0}
                title={[
                  option.data.name,
                  option.data.iata_code,
                  option.data.city,
                  option.data.country,
                ].join("|")}>
                <BsAirplaneFill className="text-lg shrink-0 text-[#819DAF]" />
                <div className="flex-1 text-gray-700 w-[140px] whitespace-nowrap text-ellipsis overflow-hidden shrink-0">
                  <p className="text-sm">
                    <span className="me-1">{option.data.country}</span>,
                    <span className="ms-1">{option.data.city}</span>
                  </p>
                  <p className="text-xs mt-1 text-gray-400 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    {option.data.name}
                  </p>
                </div>
                <div className="h-[28px] w-[55px] p-[10px] flex justify-center items-center text-white rounded text-xs bg-primary shrink-0 min-w-auto">
                  {option.data.iata_code}
                </div>
              </div>
            )}
          />
        )}
      </Form.Item>
    </div>
  );
};
