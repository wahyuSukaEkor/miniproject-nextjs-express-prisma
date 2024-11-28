"use client";

import React from "react";
import { toast } from "sonner";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { useAdminEvents } from "@/services/admin/queries";
import LoadingTableRow from "./loading-table-row";

const EventTableRow: React.FC = () => {
  const { isPending, isError, data, error } = useAdminEvents({
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
              No events found!
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no events to display
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return data?.result.map((event) => (
    <TableRow key={event.id}>
      <TableCell className="font-medium">{event.name}</TableCell>
      <TableCell className="text-right">
        {!event.price ? <Badge>Free</Badge> : formatPrice(event.price)}
      </TableCell>
    </TableRow>
  ));
};

export default EventTableRow;
