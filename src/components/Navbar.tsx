import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { ShoppingCart, Trees } from "lucide-react";
import CartDrawer from "./Cart/CartDrawer";

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar className="py-4" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand className="text-white">
          <Trees size={48} />
          <p className="ps-2 font-bold text-inherit text-[24px]">LowTech</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CartDrawer />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
