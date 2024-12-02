import { Button } from "@/components/ui/button";
import {
  LongCard,
  LongCardContent,
  LongCardDescription,
  LongCardHeader,
  LongCardTitle,
} from "@/components/ui/longcard";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import TransactionTable from "./transaction-table";

const TransactionCard: React.FC = () => {
  return (
    <LongCard>
      <LongCardHeader className="flex flex-row items-center pb-0">
        <div className="grid gap-2">
          <LongCardTitle>Transactions</LongCardTitle>
          <LongCardDescription>
            Recent transactions from your store.
          </LongCardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/dashboard/transactions">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </LongCardHeader>
      <LongCardContent>
        <TransactionTable />
      </LongCardContent>
    </LongCard>
  );
};

export default TransactionCard;
