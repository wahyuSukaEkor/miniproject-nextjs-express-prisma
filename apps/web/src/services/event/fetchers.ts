import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { EventRequest } from "@/types/event";
import { ResponseWithData, ResponseWithoutData } from "@/types/global";
import axios from "axios";

export const createEvent = async (token: string, data: EventRequest) => {
  const res = await axios.post<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + "/events",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const updateEvent = async (
  token: string,
  eventId: string,
  data: EventRequest,
) => {
  const res = await axios.patch<ResponseWithData<EventRequest>>(
    NEXT_PUBLIC_BASE_API_URL + `/events/${eventId}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteEvent = async (token: string, eventId: string) => {
  const res = await axios.delete<ResponseWithoutData>(
    NEXT_PUBLIC_BASE_API_URL + `/events/${eventId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return res.data;
};
