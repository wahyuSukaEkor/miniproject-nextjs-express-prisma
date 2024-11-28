"use client";

import React from "react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { useAdminEventTransactions } from "@/services/admin/queries";
import LoadingTableRow from "./loading-table-row";

const TransactionTableRow: React.FC = () => {
  const { isPending, isError, data, error } = useAdminEventTransactions({
    pagination: { page: 1, limit: 3, sort_by: "createdAt", order_by: "desc" },
  });

  if (isPending) return <LoadingTableRow />;

  if (isError) {
    toast.error(error.message);
  }

  if (!data?.result.length) {
    return (
      <TableRow>
        <TableCell colSpan={2}>
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-xl font-bold tracking-tight">
              No transactions found!
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no transactions to display
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return data?.result.map((transaction) => {
    const amount = transaction.discountedAmount ?? transaction.originalAmount;

    return (
      <TableRow key={transaction.id}>
        <TableCell className="font-medium">
          {transaction.user.username}
        </TableCell>
        <TableCell className="text-right">
          {!amount ? <Badge>Free</Badge> : formatPrice(amount)}
        </TableCell>
      </TableRow>
    );
  });
};

export default TransactionTableRow;
