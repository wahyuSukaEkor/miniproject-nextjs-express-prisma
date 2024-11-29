import { EventRequest } from "@/types/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, deleteEvent, updateEvent } from "./fetchers";
import Cookie from "js-cookie";
import { toast } from "sonner";
import axios from "axios";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const token = Cookie.get("admin-tkn");

  return useMutation({
    mutationFn: (data: EventRequest) => createEvent(token!, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminEvents"] });
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

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  const token = Cookie.get("admin-tkn");

  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: EventRequest }) =>
      updateEvent(token!, eventId, data),
    onSuccess: (data, { eventId }) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminEvents"] });
      queryClient.setQueryData(["event", { eventId }], data.result);
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

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const token = Cookie.get("admin-tkn");

  return useMutation({
    mutationFn: (eventId: string) => deleteEvent(token!, eventId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["adminEvents"] });
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
