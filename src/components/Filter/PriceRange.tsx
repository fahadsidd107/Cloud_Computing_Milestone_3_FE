import React, { useMemo } from "react";
import { Slider } from "@heroui/react";
import { useProductStore } from "../../store/productStore";

const PriceRange = () => {
  const { setFilters, filters, products } = useProductStore();
  const { minPrice, maxPrice } = useMemo(() => {
    return {
      minPrice:
        products.reduce(
          (min, product) => Math.min(min, product.price),
          products[0].price
        ) - 1,
      maxPrice:
        products.reduce((max, product) => Math.max(max, product.price), 0) + 1,
    };
  }, [products]);
  return (
    <div>
      <p>Price Range:</p>
      <Slider
        className="max-w-md"
        defaultValue={[minPrice, maxPrice]}
        label="Price"
        maxValue={maxPrice}
        minValue={minPrice}
        step={1}
        size="sm"
        color="secondary"
        showTooltip
        renderLabel={() => <></>}
        formatOptions={{ style: "currency", currency: "EUR" }}
        onChange={(value) => {
          setFilters({ ...filters, priceRange: value as number[] });
        }}
      />
    </div>
  );
};

export default PriceRange;
