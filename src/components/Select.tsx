import {
  Select as NextSelect,
  Selection,
  SelectItem,
  SharedSelection,
} from "@heroui/react";
import React, { useEffect, useState } from "react";

interface Props {
  options: string[];
  onSelect: (keys: SharedSelection) => void;
  value: string;
  placeholder: string;
}

const Select: React.FC<Props> = ({ options, onSelect, value, placeholder }) => {
  const [selected, setSelected] = useState<Selection>(new Set([value]));

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <NextSelect
      variant="bordered"
      className="max-w-[150px]"
      classNames={{
        listbox: "bg-[#131313] text-white",
        popoverContent: "bg-[#131313] text-white",
      }}
      size={"sm"}
      aria-label={placeholder}
      selectedKeys={selected}
      onSelectionChange={setSelected}
    >
      {options.map((option) => (
        <SelectItem key={option}>{option}</SelectItem>
      ))}
    </NextSelect>
  );
};

export default Select;
