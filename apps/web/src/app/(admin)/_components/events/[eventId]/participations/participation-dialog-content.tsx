"use client";

import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ParticipationDetailsTable from "./participation-details-table";

type Props = {
  transactionId: number;
};

const ParticipationDialogContent: React.FC<Props> = (props) => {
  const { transactionId } = props;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogDescription>
          Here&apos;s the transaction details.
        </DialogDescription>
        <ParticipationDetailsTable transactionId={transactionId} />
      </DialogHeader>
    </DialogContent>
  );
};

export default ParticipationDialogContent;
