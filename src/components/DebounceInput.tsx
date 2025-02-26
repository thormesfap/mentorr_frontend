import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import lupa from "../assets/lupa.svg";

interface DebounceInputProps {
  label: string;
  placeholder: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  label,
  placeholder,
  onDebouncedChange,
  debounceTime = 500,
}) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, debounceTime);

  useEffect(() => {
      onDebouncedChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="w-full relative">
      <label className="text-slate-800 font-semibold">{label}</label>
      <input
        className="border h-14 rounded-lg w-full px-4"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <img src={lupa} className="absolute top-1/3 right-4" alt="Search Icon" />
    </div>
  );
};

export default DebounceInput;
