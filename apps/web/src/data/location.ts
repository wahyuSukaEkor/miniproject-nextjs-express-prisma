import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { ResponseWithData } from "@/types/global";
import { LocationResponse } from "@/types/location";
import axios from "axios";

export const getLocations = async (query: string) => {
  const res = await axios.get<ResponseWithData<LocationResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL + "/locations?name=" + query,
  );

  return res.data;
};
