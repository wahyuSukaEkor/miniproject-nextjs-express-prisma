import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import {
  AdminEventResponse,
  AdminEventTransactionResponse,
  AdminTotalParticipationResponse,
} from "@/types/admin";
import {
  Pagination,
  ResponseDataPagination,
  ResponseWithData,
  ResponseWithoutData,
} from "@/types/global";
import {
  transactionDetailResponse,
  TransactionResponse,
} from "@/types/transaction";
import axios from "axios";

export const getAdminEventTransactions = async (
  token: string,
  pagination: Pagination,
) => {
  const {sort_by, order_by } = pagination;

  const res = await axios.get<
    ResponseWithData<AdminEventTransactionResponse[]>
  >(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events/transactions?&sort_by=${sort_by}&order_by=${order_by}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getAdminEvents = async (token: string, pagination: Pagination) => {
  const {sort_by, order_by } = pagination;

  const res = await axios.get<ResponseWithData<AdminEventResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events?&sort_by=${sort_by}&order_by=${order_by}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const updateTransactionStatus = async (
  token: string,
  transaction_id: number,
  data: { status: string },
) => {
  const res = await axios.patch<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/transactions/${transaction_id}/status`,
    data,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getEventParticipation = async (
  token: string,
  eventId: string,
  pagination: Pagination,
) => {
  const { page, limit, sort_by, order_by } = pagination;

  const res = await axios.get<
    ResponseDataPagination<AdminTotalParticipationResponse[]>
  >(
    NEXT_PUBLIC_BASE_API_URL +
      `/admin/events/${eventId}/participations?page=${page}&limit=${limit}&sort_by=${sort_by}&order_by=${order_by}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getTransaction = async (token: string, transaction_id: number) => {
  const res = await axios.get<ResponseWithData<TransactionResponse>>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/transactions/${transaction_id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getTransactionDetails = async (
  token: string,
  transaction_id: number,
) => {
  const res = await axios.get<ResponseWithData<transactionDetailResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/transactions/${transaction_id}/details`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};

export const getEvent = async (token: string, eventId: string) => {
  const res = await axios.get<ResponseWithData<AdminEventResponse>>(
    NEXT_PUBLIC_BASE_API_URL + `/admin/events/${eventId}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return res.data;
};
