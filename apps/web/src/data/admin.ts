import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  AdminTotalSalesResponse,
  AdminTransactionStatusResponse,
  FilterDate,
} from "@/types/admin";
import { ResponseWithData, ResponseWithoutData } from "@/types/global";
import axios from "axios";

export const getAdminTotalSales = async (token: string, filter: FilterDate) => {
  const { startDate, endDate } = filter;

  const res = await axios.get<ResponseWithData<AdminTotalSalesResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/total-sales?start_date=${startDate}&end_date=${endDate}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getTransactionStatus = async (
  token: string,
  filter: FilterDate,
) => {
  const { startDate, endDate } = filter;

  const res = await axios.get<
    ResponseWithData<AdminTransactionStatusResponse[]>
  >(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/transaction-status?start_date=${startDate}&end_date=${endDate}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const updateTransactionStatus = async (
  token: string,
  transactionId: number,
  status: string,
) => {
  const res = await axios.patch<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/transactions/${transactionId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};
