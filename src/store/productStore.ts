import { create } from "zustand";

// Define the Product type
export interface Product {
  productId: string;
  productName: string;
  stockCount: number;
  price: number;
  productAdded: string;
}

export type SortingOptions = "Price Ascending" | "Price Descending" | "New"
interface ProductStore {
  products: Product[]; // List of products
  isFetching: boolean;
  filters: string[];
  sorting: SortingOptions;
  query: string;
  fetchProducts: () => Promise<void>; // Fetch all products
  addProduct: (product: Product) => void; // Add a new product
  updateProduct: (updatedProduct: Product) => void; // Update an existing product
  deleteProduct: (id: string) => void; // Delete a product by ID
  getProducts: () => Product[]; // Delete a product by ID
  setQuery: (query: string) => void; // Delete a product by ID
  setSorting: (sorting :SortingOptions) => void
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isFetching: false,
  filters: [],
  sorting: "New",
  query: "",

  fetchProducts: async () => {
    try {
      set({ isFetching: true });
      const response = await fetch("../../data/products.json");
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
        product.productName.toLowerCase().includes(query)
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
}));
