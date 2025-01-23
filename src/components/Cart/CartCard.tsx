import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Slider,
} from "@heroui/react";
import {
  ArrowLeft,
  ArrowRightFromLine,
  Euro,
  HeartIcon,
  Minus,
  PauseCircleIcon,
  Plus,
  Repeat,
  ShuffleIcon,
  Trash,
} from "lucide-react";
import React from "react";
import { CartItem, useCartStore } from "../../store/cartStore";

const CartCard: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const { productName, quantity, stockCount, price, productId } = cartItem;
  const { removeFromCart, updateQuantity } = useCartStore();

  const handleUpdateQuantity = (productId:string, quantity:number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  return (
    <Card
      isBlurred
      className="border-none bg-[#131313] text-white max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={100}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{productName}</p>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-[#131313] text-white"
                  onPress={() => removeFromCart(productId)}
                >
                  <Trash size={14} />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-small text-white/60">
                  {stockCount} units in stock.
                </p>
                <p className="text-large text-white/90 flex items-center">
                  {" "}
                  <Euro size={14} />
                  {(price * quantity).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between">
              <ButtonGroup>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-[#131313] text-white"
                  onPress={() => handleUpdateQuantity(productId, quantity - 1)}
                >
                  <Minus size={14} />
                </Button>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-[#131313] text-white"
                  onPress={() => handleUpdateQuantity(productId, quantity + 1)}
                  isDisabled
                >
                  {quantity}
                </Button>
                <Button
                  size="sm"
                  isIconOnly
                  className="bg-[#131313] text-white"
                  onPress={() => handleUpdateQuantity(productId, quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </ButtonGroup>
              <p className="flex items-center text-tiny text-[#505050]">
                <Euro size={14} />
                {price}
                &nbsp;x{quantity}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartCard;
