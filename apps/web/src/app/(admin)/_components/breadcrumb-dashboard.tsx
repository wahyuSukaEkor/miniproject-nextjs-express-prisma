"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BreadcrumbDashboard: React.FC = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((segment) => segment.length > 0);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.slice(0, paths.length - 1).map((segment, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={`/${paths.slice(0, index + 1).join("/")}`}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
        {/* Last item without a link */}
        <BreadcrumbItem key={paths.length}>
          <BreadcrumbPage>
            {paths[paths.length - 1].charAt(0).toUpperCase() +
              paths[paths.length - 1].slice(1)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDashboard;
