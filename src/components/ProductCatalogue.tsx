import React from "react";
import { Product } from "../store/productStore";
import ProductCard from "./ProductCard";

interface Props {
  rows: number;
  sortBy: string;
  filterBy: string;
  products: Product[];
}

const ProductCatalogue: React.FC<Props> = ({
  rows,
  sortBy,
  filterBy,
  products,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
      {products.map((product) => (
        <div key={`product${product.productId}`}>
          <ProductCard
            product={product}
            onPress={(productId) => console.log(productId)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCatalogue;
