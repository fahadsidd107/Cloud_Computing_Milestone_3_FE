import React, { useEffect, useRef } from "react";
import { Product } from "../store/productStore";
import ProductCard from "./ProductCard";
import autoAnimate from "@formkit/auto-animate";
import SkeletonCard from "./SkeletonCard";

interface Props {
  products: Product[];
  isFetching: boolean;
}

const ProductCatalogue: React.FC<Props> = ({ products, isFetching }) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className="flex flex-col gap-5 w-full">
      {isFetching ? (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </>
      ) : (
        products.map((product) => (
          <div key={`product${product.id}`}>
            <ProductCard
              product={product}
              productsDate={products.map((product) => product.productAdded)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCatalogue;
