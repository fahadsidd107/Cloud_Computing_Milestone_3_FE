import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Trees } from "lucide-react";
import CartDrawer from "./Cart/CartDrawer";
import { useNavigate } from "@tanstack/react-router";

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Navbar className="py-4" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand
          className="text-white cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        >
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
