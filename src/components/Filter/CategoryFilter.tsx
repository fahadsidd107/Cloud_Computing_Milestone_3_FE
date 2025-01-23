import React from "react";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { useProductStore } from "../../store/productStore";

const CategoryFilter = () => {
  const { getCategories, setFilters, filters } = useProductStore();
  const categories = getCategories();
  return (
    <CheckboxGroup
      defaultValue={categories}
      onValueChange={(value) => {
        if (value.length === 0) {
          setFilters({ ...filters, category: categories });
        } else {
          setFilters({ ...filters, category: value });
        }
      }}
      label="Select Categories"
      classNames={{
        label: "text-white",
        base: "flex flex-col gap-2",
      }}
    >
      {categories.map((category) => (
        <Checkbox value={category} color="secondary">
          <span className="text-white capitalize">{category}</span>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default CategoryFilter;
