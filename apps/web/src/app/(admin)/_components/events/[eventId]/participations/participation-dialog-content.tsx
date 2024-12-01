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
  transaction_id: number;
};

const ParticipationDialogContent: React.FC<Props> = (props) => {
  const { transaction_id } = props;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogDescription>
          Here is the transaction details.
        </DialogDescription>
        <ParticipationDetailsTable transaction_id={transaction_id} />
      </DialogHeader>
    </DialogContent>
  );
};

export default ParticipationDialogContent;
