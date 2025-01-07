import React from "react";
import { Product } from "../store/productStore";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Euro } from "lucide-react";

interface Props {
  product: Product;
  onPress: (productId: string) => void;
}

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  const { productId, productName, price, productAdded } = product;
  return (
    <Card
      isFooterBlurred
      className="w-full h-[250px] col-span-12 sm:col-span-5"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://nextui.org/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white text-tiny">{productName}</p>
        </div>
        <Button variant="shadow" color="primary" radius="full" size="sm">
          <Euro size={14} />
          <span className="text-tiny">{price}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
