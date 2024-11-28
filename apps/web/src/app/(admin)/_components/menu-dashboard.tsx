import { Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import MenuLinkDashboard from "./menu-link-dashboard";

export const MobileMenuDashboard: React.FC = () => {
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Ngivent</span>
      </Link>
      <MenuLinkDashboard />
    </nav>
  );
};

export const TabletMenuDashboard: React.FC = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <MenuLinkDashboard className="h-4 w-4" />
    </nav>
  );
};
