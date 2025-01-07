import {
  Select as NextSelect,
  Selection,
  SelectItem,
  SharedSelection,
} from "@nextui-org/react";
import React, { useState } from "react";

interface Props {
  options: string[];
  onSelect: (keys: SharedSelection) => void;
  value: string;
  placeholder: string;
}

const Select: React.FC<Props> = ({ options, onSelect, value, placeholder }) => {
  const [selected, setSelected] = useState<Selection>(new Set([value]));
  return (
    <NextSelect
      variant="bordered"
      className="max-w-[150px]"
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
