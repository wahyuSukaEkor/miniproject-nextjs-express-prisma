"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTotalParticipationResponse } from "@/types/admin";
import { formatDateTime, formatNumber } from "@/lib/formatter";
import StatusBadge from "../../../status-badge";
import { PaymentStatus } from "@/types/transaction";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ParticipationDialogContent from "./participation-dialog-content";

export const participationColumns: ColumnDef<AdminTotalParticipationResponse>[] =
  [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Username
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Total Reservation
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const quantity: number = row.getValue("quantity");
        return (
          <div className="flex items-center justify-center">
            <Badge>{formatNumber(quantity)}</Badge>
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
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            Transaction Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date: string = row.getValue("createdAt");
        return (
          <div className="text-nowrap font-medium">{formatDateTime(date)}</div>
        );
      },
    },
    {
      id: "details",
      header: "Details",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-8 px-2">
                Show
              </Button>
            </DialogTrigger>
            <ParticipationDialogContent transactionId={item.transactionId} />
          </Dialog>
        );
      },
    },
  ];
