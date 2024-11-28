import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  children: React.ReactNode;
  className?: string;
};

const LinkDashboard: React.FC<Props> = (props) => {
  const { children, link, className } = props;

  return (
    <Link
      href={link}
      className={cn(
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground md:mx-0 md:gap-3 md:rounded-lg md:transition-all",
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default LinkDashboard;
