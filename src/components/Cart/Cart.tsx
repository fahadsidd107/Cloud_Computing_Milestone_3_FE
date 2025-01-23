import React, { useEffect, useRef } from "react";
import { useCartStore } from "../../store/cartStore";
import CartCard from "./CartCard";
import { Euro, Trees } from "lucide-react";
import autoAnimate from "@formkit/auto-animate";

const Cart = () => {
  const parent = useRef(null);
  const { cart, totalPrice } = useCartStore();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  if (cart.length <= 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 pb-4">
        <div className="flex items-center">
          <Trees size={48} color="#FFF"/>
          <p className="ps-2 font-bold text-inherit text-[24px] text-white">LowTech</p>
        </div>
        <p className="ps-2 text-small text-inherit text-[24px] text-white">
          No items in cart yet.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between gap-4" ref={parent}>
      {cart.map((cartItem) => (
        <CartCard cartItem={cartItem} />
      ))}
    </div>
  );
};

export default Cart;
