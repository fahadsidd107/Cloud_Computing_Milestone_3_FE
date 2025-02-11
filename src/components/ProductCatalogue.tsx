import React, { useEffect, useRef } from "react";
import { Product } from "../store/productStore";
import ProductCard from "./ProductCard";
import autoAnimate from "@formkit/auto-animate";

interface Props {
  rows: number;
  sortBy: string;
  filterBy: string;
  products: Product[];
}

const ProductCatalogue: React.FC<Props> = ({ products }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className="flex flex-col gap-5 w-full">
      {products.map((product) => (
        <div key={`product${product.productId}`}>
          <ProductCard
            product={product}
            productsDate={products.map((product) => product.productAdded)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCatalogue;
