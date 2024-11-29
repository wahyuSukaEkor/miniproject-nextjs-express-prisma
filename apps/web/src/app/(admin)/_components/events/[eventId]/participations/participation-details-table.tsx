"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactionDetails } from "@/services/admin/queries";
import Spinner from "@/components/shared/spinner";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type Props = {
  transactionId: number;
};

const ParticipationDetailsTable: React.FC<Props> = (props) => {
  const { transactionId } = props;
  const { isPending, isError, data, error } = useTransactionDetails({
    transactionId,
  });

  if (isPending) return <Spinner className="h-20 w-20" />;

  if (isError) toast.error(error.message);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Ticket Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.result.map((detail, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Badge className="text-nowrap">{detail.ticketCode}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipationDetailsTable;
