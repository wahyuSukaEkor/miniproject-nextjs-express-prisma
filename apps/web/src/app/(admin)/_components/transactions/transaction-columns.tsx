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
    accessorKey: "event.event_name",
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
    accessorKey: "discounted_price",
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
      const base_price: number =
        row.getValue("discounted_price") ?? row.getValue("total_price");
      return <div>{!base_price ? <Badge>Free</Badge> : formatPrice(base_price)}</div>;
    },
  },
  {
    accessorKey: "total_price",
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
      const base_price: number = row.getValue("total_price");
      return <div>{!base_price ? <Badge>Free</Badge> : formatPrice(base_price)}</div>;
    },
  },
  {
    accessorKey: "point_used",
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
      const points: number = row.getValue("point_used");
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
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status: PaymentStatus = row.getValue("payment_status");
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
    accessorKey: "updated_at",
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
      const date: string = row.getValue("updated_at");
      return <div className="text-nowrap font-medium">{formatDate(date)}</div>;
    },
  },
  {
    id: "payment_path",
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
          <TransactionDialogContent transaction_id={item.id} />
        </Dialog>
      );
    },
  },
];
