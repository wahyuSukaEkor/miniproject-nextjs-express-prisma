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
    pagination: { page: 1, limit: 3, sort_by: "created_at", order_by: "desc" },
  });

  if (isPending) return <LoadingTableRow />;

  if (isError) {
    toast.error(error.message);
  }

  if (!data?.result.length) {
    return (
      <TableRow className="bg-gray-100">
        <TableCell colSpan={2} className="py-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              No events found!
            </h3>
            <p className="text-sm text-gray-500">
              There are currently no events to display.
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return data?.result.map((event) => (
    <TableRow
      key={event.id}
      className="hover:bg-indigo-50 transition-colors duration-200"
    >
      <TableCell className="font-medium text-gray-800">
        <div className="truncate max-w-xs">{event.event_name}</div>
      </TableCell>
      <TableCell className="text-right text-gray-600">
        {!event.price ? (
          <Badge className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
            Free
          </Badge>
        ) : (
          <span className="font-semibold">{formatPrice(event.price)}</span>
        )}
      </TableCell>
    </TableRow>
  ));
};

export default EventTableRow;
