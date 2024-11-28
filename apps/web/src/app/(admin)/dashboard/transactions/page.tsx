"use client";

import React, { useEffect } from "react";
import DashboardTemplate from "../../_components/template";
import { useSearchParams } from "next/navigation";
import usePagination from "@/hooks/usePagination";
import { toast } from "sonner";
import LoadingDashboard from "../../_components/loading";
import { TransactionDataTable } from "../../_components/transactions/transaction-data-table";
import { transactionColumns } from "../../_components/transactions/transaction-columns";
import { useAdminEventTransactions } from "@/services/admin/queries";

const TransactionsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) ?? 1;
  const limit = Number(searchParams.get("limit")) ?? 10;
  const sort_by = searchParams.get("sort_by") ?? "createdAt";
  const order_by = searchParams.get("order_by") ?? "desc";

  const {
    canNextPage,
    canPrevPage,
    setCanNextPage,
    setCanPrevPage,
    setTotalPages,
    totalPages,
  } = usePagination();

  const { isPending, isError, data, error } = useAdminEventTransactions({
    pagination: { page, limit, sort_by, order_by },
  });

  useEffect(() => {
    if (data) {
      setCanNextPage(data.total > data.limit * data.page);
      setCanPrevPage(data.page > 1);
      setTotalPages(Math.ceil(data.total / data.limit));
    }
  }, [data, setCanNextPage, setCanPrevPage, setTotalPages]);

  if (isPending) return <LoadingDashboard />;

  if (isError) toast.error(error?.message);

  return (
    <DashboardTemplate>
      <div className="flex flex-1 justify-center">
        {data && data.result.length > 0 ? (
          <div className="w-full">
            <TransactionDataTable
              columns={transactionColumns}
              data={data.result}
              page={data.page}
              totalPages={totalPages}
              canNextPage={canNextPage}
              canPrevPage={canPrevPage}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No transactions found!
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no transactions to display
            </p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default TransactionsPage;
