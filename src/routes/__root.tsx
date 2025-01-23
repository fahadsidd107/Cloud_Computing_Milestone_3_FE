import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { HeroUIProvider } from "@heroui/react";
import ResponsiveNavbar from "../components/Navbar";
import "../../src/index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <HeroUIProvider>
      <ResponsiveNavbar />
      <div className="flex justify-center max-w-full">
        <div className="max-w-[1024px] h-full w-full">
          <Outlet />
        </div>
      </div>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </HeroUIProvider>
  );
}
