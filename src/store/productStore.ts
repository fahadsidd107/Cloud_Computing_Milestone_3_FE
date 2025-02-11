import { create } from "zustand";
import { backendUrl } from "../constants";

// Define the Product type
export interface Product {
  productId: string;
  name: string;
  stockCount: number;
  price: number;
  productAdded: string;
  category: string;
  description: string;
}

export type SortingOptions = "Price Ascending" | "Price Descending" | "New";

interface FilterOptions {
  category: string[];
  priceRange: number[];
}
interface ProductStore {
  products: Product[]; // List of products
  isFetching: boolean;
  filters: FilterOptions;
  sorting: SortingOptions;
  query: string;
  fetchProducts: () => Promise<void>; // Fetch all products
  addProduct: (product: Product) => void; // Add a new product
  updateProduct: (updatedProduct: Product) => void; // Update an existing product
  deleteProduct: (id: string) => void; // Delete a product by ID
  getProducts: () => Product[]; // Delete a product by ID
  setQuery: (query: string) => void; // Delete a product by ID
  setSorting: (sorting: SortingOptions) => void;
  setFilters: (filters: FilterOptions) => void;
  getCategories: () => string[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isFetching: false,
  filters: {
    category: [],
    priceRange: [],
  },
  sorting: "New",
  query: "",

  fetchProducts: async () => {
    try {
      set({ isFetching: true });
      const url = backendUrl + "/products";
      const response = await fetch(url);
      const data = await response.json();

      set({ products: data, isFetching: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  // Add a new product
  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product],
    }));
  },

  // Update an existing product
  updateProduct: (updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.productId === updatedProduct.productId
          ? updatedProduct
          : product
      ),
    }));
  },

  // Delete a product by ID
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.productId !== id),
    }));
  },

  getProducts: () => {
    const state = get();
    let products = [...state.products];
    if (state.query) {
      const query = state.query.toLowerCase();

      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );

      products = [...filteredProducts];
    }

    if (state.sorting === "Price Ascending") {
      products.sort((a, b) => a.price - b.price);
    } else if (state.sorting === "Price Descending") {
      products.sort((a, b) => b.price - a.price);
    } else if (state.sorting === "New") {
      products.sort(
        (a, b) =>
          new Date(b.productAdded).getTime() -
          new Date(a.productAdded).getTime()
      );
    }

    if (state.filters.category.length > 0) {
      products = products.filter((product) =>
        state.filters.category.includes(product.category)
      );
    }

    if (state.filters.priceRange.length > 0) {
      products = products.filter(
        (product) =>
          product.price >= state.filters.priceRange[0] &&
          product.price <= state.filters.priceRange[1]
      );
    }

    return products;
  },

  setQuery: (query) => {
    set({
      query,
    });
  },

  setSorting: (sorting) => {
    set({
      sorting,
    });
  },

  setFilters: (filters) => {
    set({
      filters,
    });
  },
  getCategories: () => {
    const state = get();
    return [...new Set(state.products.map((product) => product.category))];
  },
}));
