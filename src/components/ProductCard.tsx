import React, { useEffect, useRef, useState } from "react";
import { Product } from "../store/productStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { Euro, Plus } from "lucide-react";
import autoAnimate from "@formkit/auto-animate";
import { useCartStore } from "../store/cartStore";

interface Props {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const { productId, productName, price, productAdded } = product;
  const { addToCart } = useCartStore()
  const [isHovered, setisHovered] = useState(false);

  const parent = useRef(null)
  
    useEffect(() => {
      parent.current && autoAnimate(parent.current)
    }, [parent])
  
  return (
    <Card
      isFooterBlurred
      className="w-full h-[250px] col-span-12 sm:col-span-5"
      isHoverable
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <CardHeader className="absolute z-10  flex-row items-start justify-between bg-white/20">
        <span
          className="text-tiny uppercase font-bold
        bg-gradient-to-r from-red-500 to-purple-900 bg-clip-text text-transparent
        "
        >
          New
        </span>
        <div className="flex items-center">
          <Euro size={14} className="text-white/80" />
          <span className="text-tiny text-purple-900 uppercase font-bold">
            {price}
          </span>
        </div>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between p-0 min-h-14">
        <div ref={parent} className="w-full h-full flex items-center justify-center">
          {isHovered ? (
            <Button
              className="m-2"
              variant="shadow"
              color="primary"
              radius="full"
              size="sm"
              onPress={()=> addToCart(product)}
            >
              <Plus size={14} />
              <span className="text-tiny ">Add to Cart</span>
            </Button>
          ) : (
            <div className="m-4 w-full h-full">
              <p className="text-black font-semibold text-center text-small">
                {productName}
              </p>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
