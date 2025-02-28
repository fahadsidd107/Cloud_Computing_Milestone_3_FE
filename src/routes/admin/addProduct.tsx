import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import ProductForm from "../../components/Admin/CreateProductForm";

const AddProduct = () => {
  return <ProductForm />;
};

export const Route = createFileRoute("/admin/addProduct")({
  component: AddProduct,
});
