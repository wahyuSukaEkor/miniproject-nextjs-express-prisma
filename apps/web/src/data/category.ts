import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { CategoryResponse } from "@/types/category";
import { ResponseWithData } from "@/types/global";
import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get<ResponseWithData<CategoryResponse[]>>(
    NEXT_PUBLIC_BASE_API_URL + "/categories",
  );
  return res.data;
};
