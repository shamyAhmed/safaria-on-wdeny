import { Input, Slider } from "antd";
import { useState } from "react";

type PriceRangeFilterProps = {
  fromLabel: string;
  toLabel: string;
  min?: number;
  max?: number;
  onChange: (from: number | null, to: number | null) => void;
};

export const PriceRangeFilter = ({
  fromLabel,
  toLabel,
  min = 0,
  max = 100000,
  onChange,
}: PriceRangeFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);

  const handleChange = (value: [number, number]) => {
    setPriceRange(value);
    onChange(
      value[0] === min ? null : value[0],
      value[1] === max ? null : value[1],
    );
  };

  return (
    <div className="px-2">
      <Slider
        range
        min={min}
        max={max}
        value={priceRange}
        onChange={(value) => handleChange(value as [number, number])}
        styles={{
          track: {
            backgroundColor: "#0074C3",
            height: 5.5,
          },
          handle: {
            height: 18,
            width: 18,
            transform: "translateY(-50%)",
            top: "50%",
          },
          rail: {
            height: 5.5,
          },
          tracks: {
            background: "yellow",
          },
        }}
      />
      <div className="flex gap-2 mt-5 text-base">
        <div className="flex-1">
          <p className="text-base text-gray-400 mb-1">{fromLabel}</p>
          <div className="inputS1 with-border">
            <Input
              value={priceRange[0]}
              size="middle"
            />
          </div>
        </div>
        <div className="flex justify-center items-center pt-6 font-bold">-</div>
        <div className="flex-1">
          <p className="text-gray-400 mb-1">{toLabel}</p>
          <div className="inputS1 with-border">
            <Input
              value={priceRange[1]}
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
};