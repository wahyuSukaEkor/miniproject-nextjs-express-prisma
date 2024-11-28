import { Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import MenuLinkParticipant from "./menu-link-participant";

export const MobileMenuParticipant: React.FC = () => {
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Ngivent</span>
      </Link>
      <MenuLinkParticipant />
    </nav>
  );
};

export const TabletMenuParticipant: React.FC = () => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <MenuLinkParticipant className="h-4 w-4" />
    </nav>
  );
};
