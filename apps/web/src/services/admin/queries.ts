import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import {
  getAdminEvents,
  getAdminEventTransactions,
  getEvent,
  getEventParticipation,
  getTransaction,
  getTransactionDetails,
} from "./fetchers";
import { Pagination } from "@/types/global";

export const useAdminEventTransactions = ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["adminEventTransactions", { token, pagination }],
    queryFn: () => getAdminEventTransactions(token!, pagination),
  });
};

export const useAdminEvents = ({ pagination }: { pagination: Pagination }) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["adminEvents", { token, pagination }],
    queryFn: () => getAdminEvents(token!, pagination),
  });
};

export const useEventParticipation = ({
  eventId,
  pagination,
}: {
  eventId: string;
  pagination: Pagination;
}) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["eventParticipation", { token, eventId, pagination }],
    queryFn: () => getEventParticipation(token!, eventId, pagination),
  });
};

export const useTransaction = ({
  transaction_id,
}: {
  transaction_id: number;
}) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["transaction", { token, transaction_id }],
    queryFn: () => getTransaction(token!, transaction_id),
  });
};

export const useTransactionDetails = ({
  transaction_id,
}: {
  transaction_id: number;
}) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["transactionDetails", { token, transaction_id }],
    queryFn: () => getTransactionDetails(token!, transaction_id),
  });
};

export const useEvent = ({ eventId }: { eventId: string }) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["event", { token, eventId }],
    queryFn: () => getEvent(token!, eventId),
  });
};
