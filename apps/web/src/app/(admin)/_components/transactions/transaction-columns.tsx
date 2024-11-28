"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AdminEventTransactionResponse } from "@/types/admin";
import { formatDate, formatNumber, formatPrice } from "@/lib/formatter";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/transaction";
import StatusBadge from "../status-badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TransactionDialogContent from "./transaction-dialog-content";

export const transactionColumns: ColumnDef<AdminEventTransactionResponse>[] = [
  {
    id: "event_name",
    accessorKey: "event.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "discountedAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Price To Pay
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number =
        row.getValue("discountedAmount") ?? row.getValue("originalAmount");
      return <div>{!amount ? <Badge>Free</Badge> : formatPrice(amount)}</div>;
    },
  },
  {
    accessorKey: "originalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Original Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = row.getValue("originalAmount");
      return <div>{!amount ? <Badge>Free</Badge> : formatPrice(amount)}</div>;
    },
  },
  {
    accessorKey: "redeemedPoints",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Redeemed Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const points: number = row.getValue("redeemedPoints");
      return (
        <div>
          {!points ? (
            "No points provided"
          ) : (
            <Badge>{formatNumber(points)}</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "voucher_name",
    accessorKey: "voucher.name",
    header: "Voucher",
    cell: ({ row }) => {
      const voucher: string | undefined = row.getValue("voucher_name");
      return (
        <div>
          {!voucher ? (
            "No voucher provided"
          ) : (
            <Badge className="text-nowrap">{voucher.toUpperCase()}</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status: PaymentStatus = row.getValue("paymentStatus");
      return (
        <div>
          {status === "waiting" && (
            <StatusBadge status="waiting">Waiting</StatusBadge>
          )}
          {status === "paid" && <StatusBadge status="paid">Paid</StatusBadge>}
          {status === "success" && (
            <StatusBadge status="success">Success</StatusBadge>
          )}
          {status === "failed" && (
            <StatusBadge status="failed">Failed</StatusBadge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("updatedAt");
      return <div className="text-nowrap font-medium">{formatDate(date)}</div>;
    },
  },
  {
    id: "paymentProof",
    header: "Payment Proof",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-8 px-2">
              Show
            </Button>
          </DialogTrigger>
          <TransactionDialogContent transactionId={item.id} />
        </Dialog>
      );
    },
  },
];
