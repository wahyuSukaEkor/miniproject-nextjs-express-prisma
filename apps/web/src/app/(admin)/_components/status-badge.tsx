import { Badge } from "@/components/ui/badge";
import React from "react";
import { PaymentStatus } from "@/types/transaction";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  status: PaymentStatus;
};
const StatusBadge: React.FC<Props> = (props) => {
  const { status, children } = props;

  return (
    <Badge
      variant="outline"
      className={cn(
        status === "waiting" && "bg-orange-500 font-medium text-white",
        status === "paid" && "bg-green-500 font-medium text-white",
        status === "success" && "bg-blue-500 font-medium text-white",
        status === "failed" && "bg-red-500 font-medium text-white",
      )}
    >
      {children}
    </Badge>
  );
};

export default StatusBadge;
