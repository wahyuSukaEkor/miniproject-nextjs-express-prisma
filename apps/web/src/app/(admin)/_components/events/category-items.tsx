"use client";

import { SelectItem } from "@/components/ui/select";
import { getCategories } from "@/data/category";
import { CategoryResponse } from "@/types/category";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CategoryItems: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getCategories();
        setCategories(res.result);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      }
    };

    getData();
  }, []);

  return categories.map((category) => (
    <SelectItem key={category.id} value={`${category.id}`}>
      {category.category_name}
    </SelectItem>
  ));
};

export default CategoryItems;
