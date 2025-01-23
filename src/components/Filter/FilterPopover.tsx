import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Filter } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import PriceRange from "./PriceRange";

const FilterPopover = () => {
  return (
    <Popover placement="bottom" size="lg">
      <PopoverTrigger>
        <Button
          size="sm"
          variant="bordered"
          startContent={<Filter size={14} />}
          className="w-full sm:w-auto"
        >
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#131313] text-white">
        <div className="p-4 space-y-6">
          <div className="text-lg font-bold">Filter Products</div>
          <div className="space-y-4">
            <CategoryFilter />
            <PriceRange />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
