"use client";
import { participantMenuItems } from "./const-participant";
import LinkParticipant from "./link-participant";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const MenuLinkParticipant: React.FC<Props> = (props) => {
  const { className } = props;
  const pathname = usePathname();

  return participantMenuItems.map((item, index) => (
    <LinkParticipant
      key={index}
      link={item.link}
      className={pathname === item.link ? "bg-muted text-primary" : undefined}
    >
      <item.icon className={cn("h-5 w-5", className)} />
      {item.name}
    </LinkParticipant>
  ));
};

export default MenuLinkParticipant;
