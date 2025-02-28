import { Button, Checkbox, Input, InputProps } from "@heroui/react";
import React, { memo } from "react";
import PaymentRadio from "./PaymentRadio";
import * as Yup from "yup";
import AddressRadio from "./AddressRadio";
import { Form, Formik } from "formik";
import { backendUrl } from "../../constants";
import { useCartStore } from "../../store/cartStore";
import { useRouter } from "@tanstack/react-router";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  address: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  country: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.number().required("Required"),
  pincode: Yup.number().required("Required"),
  paymentMethod: Yup.string().required("Required"),
  addressType: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

interface CustomInputProps extends InputProps {
  setFieldValue: (field: string, value: any) => void;
  name: string;
}

const CustomInput = memo<CustomInputProps>(
  ({ setFieldValue, name, ...props }) => (
    <Input
      className="text-white"
      variant="bordered"
      color="default"
      labelPlacement="outside"
      onChange={(e) => setFieldValue(name, e.target.value)}
      {...props}
    />
  )
);

CustomInput.displayName = "CustomInput";

const inputs = [
  [
    { accessor: "firstName", label: "First Name" },
    { accessor: "lastName", label: "Last Name" },
  ],
  [{ accessor: "address", label: "Address" }],
  [{ accessor: "email", label: "Email" }],
  [
    { accessor: "city", label: "City" },
    { accessor: "country", label: "Country" },
  ],
  [
    { accessor: "pincode", label: "Pincode" },
    { accessor: "phone", label: "Phone" },
  ],
] as const;

const initialValues = {
  firstName: "Basit",
  lastName: "Ansari",
  email: "xyz@example.com",
  address: "Timepass",
  city: "mumbai",
  country: "India",
  phone: "9819923095",
  pincode: "400098",
  paymentMethod: "PayOnline",
  addressType: "home",
};

const CheckoutForm = memo(() => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any
  ) => {
    setSubmitting(true);
    try {
      const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        city: values.city,
        country: values.country,
        pincode: values.pincode,
        phone: values.phone,
        payment_method: values.paymentMethod,
        address_type: values.addressType,
        products: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };
      const url = backendUrl + "orders";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Order created successfully:", responseData);
      // Optionally, you can show a success message to the user here

      resetForm();
      clearCart();
      router.navigate({ to: "/pay" });
    } catch (error) {
      console.error("Error creating order:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col h-full gap-4">
      <p className="text-[16px] text-white/60 mb-2">Shipping Information</p>
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
            {inputs.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid ${row.length > 1 ? `grid-cols-${row.length}` : "grid-cols-1"} gap-3 py-2`}
              >
                {row.map((col) => (
                  <CustomInput
                    key={col.accessor}
                    name={col.accessor}
                    onBlur={handleBlur}
                    value={values[col.accessor] ?? " "}
                    isInvalid={!!errors[col.accessor]}
                    errorMessage={errors[col.accessor]}
                    placeholder={col.label}
                    label={col.label}
                    setFieldValue={setFieldValue}
                  />
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-4 py-2">
              <AddressRadio />
              <PaymentRadio />
            </div>
            <p className="text-[16px] text-white/60">Billing Address</p>
            <Checkbox defaultSelected isDisabled color="secondary">
              Is your billing address same as shipping address?
            </Checkbox>
            <Button
              fullWidth
              type="submit"
              variant="shadow"
              color="secondary"
              className="text-white font-semibold my-4"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Checkout
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
