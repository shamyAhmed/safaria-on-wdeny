interface CustomSwitchProps {
  checked?: boolean; // optional
  onChange?: (checked: boolean) => void; // optional
  name: string;
}

export default function CustomSwitch({
  checked = false,
  onChange,
  name,
}: CustomSwitchProps) {
  return (
    <label className="custom-switch">
      <input
        type="checkbox"
        checked={checked}
        name={name}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="slider" />
    </label>
  );
}
