import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useProductStore } from "../store/productStore";
import ProductCatalogue from "../components/ProductCatalogue";
import { Button } from "@heroui/react";
import SearchAutocomplete from "../components/Sorting/SearchAutocomplete";
import Sorting from "../components/Sorting/Sorting";
import FilterPopover from "../components/Filter/FilterPopover";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { getProducts, fetchProducts } = useProductStore();
  const products = getProducts();

  React.useEffect(() => {
    if (Array.isArray(products) && products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <main className="flex flex-col px-6">
      <div className="flex flex-col md:flex-row border-b border-white mt-10 mb-5 pb-2 items-start md:items-center justify-between">
        <span className="text-white text-[24px] mb-4 md:mb-0">
          Showing {products.length.toString()} items.
        </span>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
          <SearchAutocomplete products={products} />
          <div className="flex gap-3">
            <FilterPopover />
            <Sorting />
          </div>
        </div>
      </div>
      <ProductCatalogue products={products} rows={5} filterBy="" sortBy="" />
    </main>
  );
}
