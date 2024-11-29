import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { updateTransactionStatus } from "./fetchers";
import { toast } from "sonner";
import axios from "axios";

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  const token = Cookie.get("admin-tkn");

  return useMutation({
    mutationFn: ({
      transactionId,
      data,
    }: {
      transactionId: number;
      data: { status: string };
    }) => updateTransactionStatus(token!, transactionId, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminEventTransactions"] });
    },
    onError: (data) => {
      if (axios.isAxiosError(data)) {
        toast.error(data.response?.data.message);
        return;
      }
      toast.error(data.message);
    },
  });
};
