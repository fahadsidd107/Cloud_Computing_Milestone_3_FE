import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Cart from "../components/Cart/Cart";
import { Euro } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import { Accordion, AccordionItem } from "@heroui/react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutComponent,
});

function CheckoutComponent() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  return (
    <main className="flex flex-col px-6 gap-4">
      <h1 className="text-[28px] text-white border-b border-b-white/40 pb-2 mb-2">
        Checkout
      </h1>
      <div className="flex flex-col md:flex-row px-6 gap-4">
        {/* Mobile View */}
        <div className="md:hidden w-full">
          <Accordion>
            <AccordionItem
              key="cart"
              aria-label="Your Order"
              title="Your Order"
            >
              <Cart />
              <div className="flex justify-end mt-2">
                <p className="flex items-center text-xl font-semibold text-white">
                  Total: &nbsp; <Euro size={14} /> {totalPrice.toFixed(2)}
                </p>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full md:w-[60%]">
          <CheckoutForm />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex md:flex-col w-full md:w-[40%] h-full bg-[#131313] p-4 rounded-xl">
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
      </div>
    </main>
  );
}
