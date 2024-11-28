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
  transactionId: number;
};

const TransactionDialogContent: React.FC<Props> = (props) => {
  const { transactionId } = props;
  const updateTransactionStatus = useUpdateTransactionStatus();

  const handlePaymentStatus = async (
    transactionId: number,
    data: { status: "success" | "failed" },
  ) => {
    updateTransactionStatus.mutate({
      transactionId,
      data,
    });
  };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-xl">
      <DialogHeader>
        <DialogTitle>Payment Proof</DialogTitle>
        <DialogDescription>Here&apos;s the payment proof</DialogDescription>
      </DialogHeader>
      <TransactionDialogBody transactionId={transactionId} />
      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                handlePaymentStatus(transactionId, { status: "success" })
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
                handlePaymentStatus(transactionId, { status: "failed" })
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
