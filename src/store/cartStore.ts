import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "./productStore";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  totalPrice: number;
  totalItemCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0,
      totalItemCount: 0,

      // Add to cart (increments quantity if item already in cart)
      addToCart: (product) => {
        const { cart } = get();
        const existingItemIndex = cart.findIndex(
          (item) => item.id === product.id
        );

        let updatedCart;
        if (existingItemIndex >= 0) {
          updatedCart = cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        set({
          cart: updatedCart,
          totalPrice: updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          totalItemCount: updatedCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        });
      },

      // Remove item by id
      removeFromCart: (id) => {
        const { cart } = get();
        const updatedCart = cart.filter((item) => item.id !== id);

        set({
          cart: updatedCart,
          totalPrice: updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          totalItemCount: updatedCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        });
      },

      // Update the quantity for a specific product
      updateQuantity: (id, quantity) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        set({
          cart: updatedCart,
          totalPrice: updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          totalItemCount: updatedCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          ),
        });
      },

      // Clear the entire cart
      clearCart: () => {
        set({
          cart: [],
          totalPrice: 0,
          totalItemCount: 0,
        });
      },
    }),
    {
      name: "cart-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // optional, since localStorage is default
    }
  )
);
