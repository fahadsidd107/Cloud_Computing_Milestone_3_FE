import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Cart from "../components/Cart/Cart";
import { Euro } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import CheckoutForm from "../components/Checkout/CheckoutForm";

export const Route = createFileRoute("/checkout")({
  component: CheckoutComponent,
});

function CheckoutComponent() {
  const totalPrice = useCartStore(state=> state.totalPrice)
  return (
    <main className="flex px-6 gap-4">
      <div className="w-[60%]">
        <CheckoutForm />
      </div>
      <div className="flex flex-col w-[40%] h-full bg-[#131313] p-4 rounded-xl">
        <p className="text-white border-b border-b-[#FFFFFF40] pb-2 mb-4">
          Your order
        </p>
        <Cart />
        <div className="flex justify-end mt-2">
          <p className="flex items-center text-xl font-semibold text-white">
            Total: &nbsp; <Euro size={14} /> {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}
