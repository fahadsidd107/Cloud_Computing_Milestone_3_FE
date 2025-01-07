import { create } from "zustand";

// Define the Product type
export interface Product {
  productId: string;
  productName: string;
  stockCount: number;
  price: number;
  productAdded: string;
}

interface ProductStore {
  products: Product[]; // List of products
  isFetching: boolean;
  fetchProducts: () => Promise<void>; // Fetch all products
  addProduct: (product: Product) => void; // Add a new product
  updateProduct: (updatedProduct: Product) => void; // Update an existing product
  deleteProduct: (id: string) => void; // Delete a product by ID
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isFetching: false,
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
}));
