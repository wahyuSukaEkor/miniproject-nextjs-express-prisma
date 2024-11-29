import { ArrowRightLeft, Calendar, Home } from "lucide-react";

export const dashboardMenuItems = [
  {
    name: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  {
    name: "Events",
    icon: Calendar,
    link: "/dashboard/events",
  },
  {
    name: "Transactions",
    icon: ArrowRightLeft,
    link: "/dashboard/transactions",
  },
];
