"use client";

import Spinner from "@/components/shared/spinner";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { useTransaction } from "@/services/admin/queries";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

type Props = {
  transaction_id: number;
};

const TransactionDialogBody: React.FC<Props> = (props) => {
  const { transaction_id } = props;
  const { isPending, isError, data, error } = useTransaction({ transaction_id });

  if (isError) toast.error(error.message);

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner className="h-20 w-20" />
      </div>
    );
  }

  return (
    <div className="flex h-96 items-center justify-center ">
      {data?.result.payment_path ? (
        <Image
          src={NEXT_PUBLIC_BASE_API_URL + data?.result.payment_path}
          alt="Payment Proof"
          width={576}
          height={384}
          className="max-h-96 max-w-96 bg-contain bg-center bg-no-repeat"
        />
      ) : (
        <h2 className="text-2xl font-medium tracking-tight">
          There is no payment proof yet!
        </h2>
      )}
    </div>
  );
};

export default TransactionDialogBody;
