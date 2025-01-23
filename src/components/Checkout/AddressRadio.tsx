import {RadioGroup, Radio, cn, RadioProps} from "@heroui/react";
import { Building, CreditCard, Home, LaptopMinimalCheck } from "lucide-react";

export const CustomRadio = (props:RadioProps) => {
  const {children, ...otherProps} = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-2 border-2 border-transparent",
          "data-[selected=true]:border-secondary bg-[#131313]",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function AddressRadio() {
  return (
    <RadioGroup defaultValue="home" color="secondary" orientation="horizontal" label="Address Type">
      <CustomRadio value="home">
        <div className="flex gap-4">
            <Home size={24}/>
            <p>Home</p>
        </div>
      </CustomRadio>
      <CustomRadio value="office">
      <div className="flex gap-4">
            <Building size={24}/>
            <p>Office</p>
        </div>
      </CustomRadio>
    </RadioGroup>
  );
}
