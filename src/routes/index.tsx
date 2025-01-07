import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useProductStore } from "../store/productStore";
import ProductCatalogue from "../components/ProductCatalogue";
import Select from "../components/Select";
import { sortingOptions } from "../constants";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { products, fetchProducts } = useProductStore();
  React.useEffect(() => {
    if (Array.isArray(products) && products.length === 0) {
      fetchProducts();
    }
  }, []);
  return (
    <main className="flex flex-col px-6">
      <div className="flex border-b-1 justify-between border-white mt-10 mb-5 items-center">
        <span className="text-white text-[24px] mb-2">
          Showing {products.length.toString()} items.
        </span>
        <Select
          options={sortingOptions}
          value="New"
          placeholder="sortBy"
          onSelect={() => {}}
        />
      </div>
      <ProductCatalogue products={products} rows={5} filterBy="" sortBy="" />
    </main>
  );
}
