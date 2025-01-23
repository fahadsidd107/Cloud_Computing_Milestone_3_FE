import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { CreditCard, Euro, ShoppingCart, Trash, X } from "lucide-react";
import React from "react";
import Cart from "./Cart";
import { useCartStore } from "../../store/cartStore";
import { Router, useNavigate } from "@tanstack/react-router";

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { clearCart, cart, totalPrice } = useCartStore();
  const navigate = useNavigate();
  return (
    <>
      <Button
        color="default"
        href="#"
        variant="bordered"
        startContent={<ShoppingCart size={16} />}
        size="md"
        onPress={onOpen}
      >
        <span className="hidden xs:block">Cart</span>
      </Button>
      <Drawer
        isOpen={isOpen}
        size="md"
        onClose={onClose}
        backdrop="blur"
        hideCloseButton
      >
        <DrawerContent className="bg-black text-white">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 pt-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <ShoppingCart />
                    <span>Cart</span>
                  </div>
                  <div className="flex ">
                    {cart.length > 0 && (
                      <Button
                        onPress={clearCart}
                        size="sm"
                        className="bg-[#131313] me-2 text-white hover:text-danger"
                        startContent={<Trash size={14} />}
                      >
                        Clear All
                      </Button>
                    )}
                    <Button
                      onPress={onClose}
                      size="sm"
                      className="bg-[#131313] me-2 text-white"
                      startContent={<X size={14} />}
                      isIconOnly
                    />
                  </div>
                </div>
              </DrawerHeader>
              <DrawerBody>
                <Cart />
              </DrawerBody>
              {cart.length > 0 && (
                <DrawerFooter>
                  <div className="flex flex-col w-full pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-end">
                        <p className="flex items-center text-xl font-semibold">
                          Total: &nbsp; <Euro size={14} />{" "}
                          {totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        as={Button}
                        variant="shadow"
                        color="secondary"
                        fullWidth
                        className="text-white font-semibold"
                        startContent={<CreditCard size={14} />}
                        onPress={() => {
                          onClose();
                          navigate({ to: "/checkout" });
                        }}
                      >
                        Review Order & Checkout
                      </Link>
                    </div>
                  </div>
                </DrawerFooter>
              )}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
