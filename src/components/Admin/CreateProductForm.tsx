import React, { memo } from "react";
import {
  Button,
  Input,
  InputProps,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { backendUrl } from "../../constants";

// Temporary product categories array
const productCategories = [
  { label: "Electronics", key: "electronics" },
  { label: "Clothing", key: "clothing" },
  { label: "Books", key: "books" },
  { label: "Home & Garden", key: "home-garden" },
  { label: "Toys", key: "toys" },
  { label: "Sports", key: "sports" },
  { label: "Beauty", key: "beauty" },
  { label: "Automotive", key: "automotive" },
];

const validationSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  productDescription: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
  productCategory: Yup.string().required("Required"),
  stock: Yup.number().min(0, "Stock cannot be negative").required("Required"),
  price: Yup.number().min(0, "Price cannot be negative").required("Required"),
  productImage: Yup.mixed<File>()
    .required("Product image is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/webp"].includes(value.type)
      );
    }),
});

interface CustomInputProps extends InputProps {
  setFieldValue: (field: string, value: any) => void;
  name: string;
}

const CustomInput = memo<CustomInputProps>(
  ({ setFieldValue, name, ...props }) => (
    <Input
      className="text-white my-10"
      variant="bordered"
      color="default"
      labelPlacement="outside"
      onChange={(e) => setFieldValue(name, e.target.value)}
      {...props}
    />
  )
);

CustomInput.displayName = "CustomInput";

const initialValues = {
  productName: "",
  productDescription: "",
  productCategory: "",
  stock: 0,
  price: 0,
  productImage: null as File | null,
};

const ProductForm = memo(() => {
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      const formData = new FormData();

      // Match backend field names exactly
      formData.append("name", values.productName);
      formData.append("description", values.productDescription);
      formData.append("category", values.productCategory);
      formData.append("stock_count", values.stock.toString());
      formData.append("price", values.price.toString());

      // Append image file with backend's expected field name
      if (values.productImage) {
        formData.append("image", values.productImage);
      }
      const url = backendUrl + "/products";
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        // Content-Type header will be automatically set by FormData
      });

      const result = await response.json();

      if (!response.ok) {
        // Match backend error structure
        throw new Error(result.error || "Submission failed");
      }

      // Handle success as your backend returns
      console.log("Product created with ID:", result.id);
      if (result.imageUrl) {
        console.log("Image uploaded to:", result.imageUrl);
      }

      // Reset form or redirect as needed
    } catch (error) {
      console.error("Submission error:", error);
      // Display error message matching backend responses
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <p className="text-[16px] text-white/60 mb-2">Product Information</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          handleBlur,
          setFieldValue,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <CustomInput
              name="productName"
              onBlur={handleBlur}
              value={values.productName}
              isInvalid={!!errors.productName}
              errorMessage={errors.productName}
              placeholder="Product Name"
              label="Product Name"
              setFieldValue={setFieldValue}
            />
            <CustomInput
              name="productDescription"
              onBlur={handleBlur}
              value={values.productDescription}
              isInvalid={!!errors.productDescription}
              errorMessage={errors.productDescription}
              placeholder="Product Description"
              label="Product Description"
              setFieldValue={setFieldValue}
            />
            <CustomInput
              name="productCategory"
              onBlur={handleBlur}
              value={values.productCategory}
              isInvalid={!!errors.productCategory}
              errorMessage={errors.productCategory}
              placeholder="Product Category"
              label="Product Category"
              setFieldValue={setFieldValue}
            />
            <CustomInput
              name="stock"
              onBlur={handleBlur}
              value={values.stock.toString()}
              isInvalid={!!errors.stock}
              errorMessage={errors.stock}
              placeholder="Stock"
              label="Stock"
              setFieldValue={(field, value) => {
                const numValue = parseInt(value, 10);
                setFieldValue(field, isNaN(numValue) ? 0 : numValue);
              }}
              type="number"
            />

            <CustomInput
              name="price"
              onBlur={handleBlur}
              value={values.price.toString()}
              isInvalid={!!errors.price}
              errorMessage={errors.price}
              placeholder="Price"
              label="Price in (EUR)"
              setFieldValue={(field, value) => {
                const numValue = parseInt(value, 10);
                setFieldValue(field, isNaN(numValue) ? 0 : numValue);
              }}
              type="number"
            />
            <div className="my-10">
              <label className="text-white/70 text-sm font-medium mb-2 block">
                Product Image
              </label>
              <input
                type="file"
                className="w-full p-2 rounded-lg border border-gray-600 bg-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFieldValue("productImage", file);
                }}
                onBlur={handleBlur}
                name="productImage"
                id="productImage"
              />
              {errors.productImage && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.productImage}
                </div>
              )}
              {values.productImage && (
                <p className="text-sm text-gray-400 mt-2">
                  Selected: {values.productImage.name}
                </p>
              )}
            </div>
            <Button
              fullWidth
              type="submit"
              variant="shadow"
              color="secondary"
              className="text-white font-semibold my-4"
              isLoading={isSubmitting}
            >
              Submit Product
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

ProductForm.displayName = "ProductForm";

export default ProductForm;
