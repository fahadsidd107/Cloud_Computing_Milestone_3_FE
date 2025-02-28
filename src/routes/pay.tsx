import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import { CreditCard } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

const Pay = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 10 }, (_, i) =>
    (new Date().getFullYear() + i).toString()
  );

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces every 4 digits
    const formattedCardNumber = value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setCardNumber(formattedCardNumber);
  };

  const handleCvvChange = (value: string) => {
    // Only allow numbers and limit to 3 digits
    const formattedCvv = value.replace(/\D/g, "").slice(0, 3);
    setCvv(formattedCvv);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("Card Payment Details:", {
        cardNumber,
        cardHolderName,
        expiryMonth,
        expiryYear,
        cvv,
        saveCard,
      });

      // Reset form fields
      setCardNumber("");
      setCardHolderName("");
      setExpiryMonth("");
      setExpiryYear("");
      setCvv("");
      setSaveCard(false);
      setIsSubmitting(false);
      // In a real scenario, you'd make an API call here
      alert("Payment processed successfully! (Mock)");
    }, 2000);
  };

  return (
    <Card
      isBlurred
      className="border-none bg-[#131313] text-white w-full md:w-[500px]"
      shadow="sm"
    >
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CreditCard size={24} />
            <p className="font-semibold">Card Payment</p>
          </div>
          <Input
            label="Card Number"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="Enter card number"
            type="text"
            isRequired
            variant="bordered"
            color="default"
            labelPlacement="outside"
            maxLength={19}
            className="text-white"
          />
          <Input
            label="Card Holder Name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            placeholder="Enter card holder name"
            type="text"
            isRequired
            variant="bordered"
            color="default"
            labelPlacement="outside"
            className="text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Expiry Month"
              selectedKeys={expiryMonth ? [expiryMonth] : []}
              onSelectionChange={(value) => {
                const selectedMonth = Array.from(value)[0];
                if (typeof selectedMonth === "string") {
                  setExpiryMonth(selectedMonth);
                }
              }}
              placeholder="MM"
              isRequired
              variant="bordered"
              color="default"
              labelPlacement="outside"
              className="text-white"
            >
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Expiry Year"
              selectedKeys={expiryYear ? [expiryYear] : []}
              onSelectionChange={(value) => {
                const selectedYear = Array.from(value)[0];
                if (typeof selectedYear === "string") {
                  setExpiryYear(selectedYear);
                }
              }}
              placeholder="YYYY"
              isRequired
              variant="bordered"
              color="default"
              labelPlacement="outside"
              className="text-white"
            >
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Input
            label="CVV"
            value={cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            placeholder="Enter CVV"
            type="text"
            isRequired
            variant="bordered"
            color="default"
            labelPlacement="outside"
            className="text-white"
            maxLength={3}
          />
          <Checkbox
            isSelected={saveCard}
            onValueChange={setSaveCard}
            className="text-white"
          >
            Save this card for future payments
          </Checkbox>
          <Button
            type="submit"
            color="secondary"
            variant="shadow"
            className="text-white font-semibold"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            fullWidth
          >
            Pay Now
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export const Route = createFileRoute("/pay")({
  component: Pay,
});
