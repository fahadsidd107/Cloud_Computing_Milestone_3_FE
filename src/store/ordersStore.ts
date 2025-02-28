import { create } from "zustand";
import { backendUrl } from "../constants";

// Define the Product type
export interface Product {
  id: string;
  name: string;
  stock_count: number;
  price: number;
  productAdded: string;
  category: string;
  description: string;
  image_url: string;
}

interface OrderStore {
  orders: Product[]; // List of orders
  isFetching: boolean;
  fetchOrders: () => Promise<void>; // Fetch all products
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  isFetching: false,
  fetchOrders: async () => {
    try {
      set({ isFetching: true });
      const url = backendUrl + "/order";
      const response = await fetch(url);
      const data = await response.json();

      set({ orders: data, isFetching: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
}));
