import React from "react";
import { Product } from "../store/productStore";
import { Button, Card, CardBody, Image } from "@heroui/react";
import { Euro, Plus } from "lucide-react";
import { useCartStore } from "../store/cartStore";

interface Props {
  product: Product;
  productsDate: string[];
}

const ProductCard: React.FC<Props> = ({ product, productsDate }) => {
  const {
    name,
    price,
    productAdded,
    description,
    category,
    stock_count,
    image_url,
  } = product;
  const { addToCart } = useCartStore();

  const isNew = productsDate
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 2)
    .includes(productAdded);

  return (
    <Card isBlurred className="border-none bg-[#131313] text-white" shadow="sm">
      <CardBody>
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-4 items-center">
          <div className="relative flex justify-center w-full md:col-span-3">
            <Image
              alt="Product image"
              className="object-cover aspect-square"
              height={150}
              shadow="md"
              src={image_url}
              width={150}
            />
          </div>

          <div className="flex flex-col w-full md:col-span-9">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{name}</p>
                  {isNew && (
                    <span className="text-tiny uppercase font-bold bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent">
                      New
                    </span>
                  )}
                </div>
                <p className="text-large text-white/90 flex items-center">
                  <Euro size={14} />
                  {price}
                </p>
              </div>
              <p className="text-small text-white/40">{category}</p>

              <p className="text-small text-white/80 mt-2">{description}</p>

              <div className="flex justify-end items-center gap-4 mt-4">
                <div className="flex flex-col gap-1 text-small text-white/60">
                  <p>{stock_count} units in stock</p>
                </div>
                <Button
                  color="secondary"
                  variant="shadow"
                  size="sm"
                  onPress={() => addToCart(product)}
                >
                  <Plus size={14} />
                  <span className="text-tiny">Add to Cart</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
