"use client";

import { getAdminTotalSales } from "@/data/admin";
import { numberShortener } from "@/lib/formatter";
import { AdminTotalSalesResponse } from "@/types/admin";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { formatDate, subDays } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const TotalRevenueChart: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = React.useState<AdminTotalSalesResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const token = Cookie.get("admin-tkn");
        if (!token) return;

        const past7Days = subDays(new Date(), 7).toISOString();
        const startDate = searchParams.get("revenue_from") ?? past7Days;

        const endDate =
          searchParams.get("revenue_to") ?? new Date().toISOString();

        const res = await getAdminTotalSales(token, { startDate, endDate });
        const newRes = res.result.map((item) => {
          return {
            revenue: item.revenue,
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
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => formatDate(value, "yyyy-MM-dd")}
        />
        <YAxis tickFormatter={(value) => numberShortener(value as number)} />
        <Tooltip
          formatter={(value) => numberShortener(value as number)}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Bar
          dataKey="revenue"
          fill="hsl(var(--primary))"
          name="Total Revenue"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalRevenueChart;
