"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getTransactionStatus } from "@/data/admin";
import { formatNumber } from "@/lib/formatter";
import { AdminTransactionStatusResponse } from "@/types/admin";
import axios from "axios";
import { formatDate, subDays } from "date-fns";
import Cookie from "js-cookie";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

const TransactionChart: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = React.useState<AdminTransactionStatusResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const token = Cookie.get("admin-tkn");
        if (!token) return;

        const past7Days = subDays(new Date(), 7).toISOString();
        const startDate = searchParams.get("transaction_from") ?? past7Days;

        const endDate =
          searchParams.get("transaction_to") ?? new Date().toISOString();

        const res = await getTransactionStatus(token, { startDate, endDate });
        const newRes = res.result.map((item) => {
          return {
            ...item,
            date: formatDate(item.date, "yyyy-MM-dd"),
          };
        });

        setData(newRes);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex h-[210px] flex-col items-center justify-center gap-1 text-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  if (!isLoading && !data.length)
    return (
      <div className="flex h-[210px] flex-col items-center justify-center gap-1 text-center">
        <h3 className="text-xl font-bold tracking-tight">
          No transactions found!
        </h3>
        <p className="text-sm text-muted-foreground">
          There are currently no transactions to display
        </p>
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => formatNumber(value as number)} />
        <Tooltip formatter={(value) => formatNumber(value as number)} />
        <Line
          type="monotone"
          dataKey="failed"
          stroke="hsl(0 72.2% 50.6%)"
          strokeWidth={2}
          name="Failed"
        />
        <Line
          type="monotone"
          dataKey="waiting"
          stroke="hsl(24.6 95% 53.1%)"
          strokeWidth={2}
          name="Waiting"
        />
        <Line
          type="monotone"
          dataKey="paid"
          stroke="hsl(142.1 76.2% 36.3%)"
          strokeWidth={2}
          name="Paid"
        />
        <Line
          type="monotone"
          dataKey="success"
          stroke="hsl(221.2 83.2% 53.3%)"
          strokeWidth={2}
          name="Success"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;
