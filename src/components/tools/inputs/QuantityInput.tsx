// components/tools/inputs/QuantityInput.tsx
import { Button } from "antd";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantityInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleDecrease}
        disabled={value <= min}
        className="w-10 h-10 flex items-center justify-center"
      >
        <AiOutlineMinus />
      </Button>
      <span className="px-4 text-lg font-medium">{value}</span>
      <Button
        onClick={handleIncrease}
        disabled={value >= max}
        className="w-10 h-10 flex items-center justify-center"
      >
        <AiOutlinePlus />
      </Button>
    </div>
  );
}
