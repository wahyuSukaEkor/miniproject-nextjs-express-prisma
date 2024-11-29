import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { ResponseWithData } from "@/types/global";
import axios from "axios";

export const getUserProfile = async (token: string) => {
  const res = await axios.get<ResponseWithData<any>>(
    NEXT_PUBLIC_BASE_API_URL + `/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
