import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Product, useProductStore } from "../store/productStore";
import ProductCatalogue from "../components/ProductCatalogue";
import Select from "../components/Select";
import { sortingOptions } from "../constants";
import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { Filter, Search } from "lucide-react";
import SearchAutocomplete from "../components/FilterAndSorting/SearchAutocomplete";
import Sorting from "../components/FilterAndSorting/Sorting";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { getProducts, fetchProducts } = useProductStore();
  const products = getProducts()

  React.useEffect(() => {
    if (Array.isArray(products) && products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <main className="flex flex-col px-6">
      <div className="flex border-b-1 justify-between border-white mt-10 mb-5 pb-2 items-center">
        <span className="text-white text-[24px] mb-2">
          Showing {products.length.toString()} items.
        </span>
        <div className="flex justify-end gap-4 items-center">
           <SearchAutocomplete products={products} />
          <Button
            size="sm"
            variant="bordered"
            startContent={<Filter size={14} />}
          >
            Filter
          </Button>
          <Sorting/>
        </div>
      </div>
      <ProductCatalogue products={products} rows={5} filterBy="" sortBy="" />
    </main>
  );
}
