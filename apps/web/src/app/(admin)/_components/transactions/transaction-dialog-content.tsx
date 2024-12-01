"use client";

import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TransactionDialogBody from "./transaction-dialog-body";
import { useUpdateTransactionStatus } from "@/services/admin/mutations";

type Props = {
  transaction_id: number;
};

const TransactionDialogContent: React.FC<Props> = (props) => {
  const { transaction_id } = props;
  const updateTransactionStatus = useUpdateTransactionStatus();

  const handlePaymentStatus = async (
    transaction_id: number,
    data: { status: "success" | "failed" },
  ) => {
    updateTransactionStatus.mutate({
      transaction_id,
      data,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-xl">
      <DialogHeader>
        <DialogTitle>Payment Proof</DialogTitle>
        <DialogDescription>Here&apos;s the payment proof</DialogDescription>
      </DialogHeader>
      <TransactionDialogBody transaction_id={transaction_id} />
      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                handlePaymentStatus(transaction_id, { status: "success" })
              }
              className="bg-green-600 hover:bg-green-600/90"
            >
              Verify Payment
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                handlePaymentStatus(transaction_id, { status: "failed" })
              }
              variant="destructive"
            >
              Mark As Failed
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default TransactionDialogContent;
