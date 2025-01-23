import { Button, Checkbox, Input, InputProps } from "@heroui/react";
import React, { memo } from "react";
import PaymentRadio from "./PaymentRadio";
import * as Yup from "yup";
import AddressRadio from "./AddressRadio";
import { Form, Formik } from "formik";

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
  phone: Yup.number()
    .min(0, "Too Short!")
    .max(13, "Too Long!")
    .required("Required"),
  pincode: Yup.number()
    .min(6, "Too Short!")
    .max(6, "Too Long!")
    .required("Required"),
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
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  pincode: "",
};

const CheckoutForm = memo(() => {
  const handleSubmit = (values: typeof initialValues, errors: any) => {
    if (errors) {
      console.log(errors);
    }
    console.log(values);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <h1 className="text-[28px] text-white border-b border-b-white/40 pb-2 mb-2">
        Checkout
      </h1>
      <p className="text-[16px] text-white/60 mb-2">Shipping Information</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleBlur, setFieldValue, handleSubmit }) => (
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
            <AddressRadio />
            <PaymentRadio />
            <div className="flex flex-col gap-4"></div>
            <p className="text-[16px] text-white/60">Billing Address</p>
            <Checkbox defaultSelected isDisabled color="secondary">
              Is your billing address same as shipping address?
            </Checkbox>
            <Button fullWidth type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

CheckoutForm.displayName = "CheckoutForm";

export default CheckoutForm;
