"use client";

import { dashboardMenuItems } from "./const-dashboard";
import LinkDashboard from "./link-dashboard";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const MenuLinkDashboard: React.FC<Props> = (props) => {
  const { className } = props;
  const pathname = usePathname();

  return dashboardMenuItems.map((item, index) => (
    <LinkDashboard
      key={index}
      link={item.link}
      className={pathname === item.link ? "bg-muted text-primary" : undefined}
    >
      <item.icon className={cn("h-5 w-5", className)} />
      {item.name}
    </LinkDashboard>
  ));
};

export default MenuLinkDashboard;
