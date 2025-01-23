import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import React from "react";
import { Product, useProductStore } from "../../store/productStore";
import { Search } from "lucide-react";

const SearchAutocomplete: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const { query, setQuery } = useProductStore();
  return (
    <div>
      <Input
        placeholder="Search...."
        value={query}
        onValueChange={setQuery}
        variant="bordered"
        size="sm"
        className="min-w-[250px] text-white"
        startContent={<Search size={14}  />}
      />
    </div>
  );
};

export default SearchAutocomplete;
