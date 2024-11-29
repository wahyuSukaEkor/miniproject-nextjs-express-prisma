import { format } from "date-fns";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export const formatDate = (date: string | number | Date) => {
  return format(date, "d LLL y");
};

export const formatDateTime = (date: string | number | Date) => {
  return format(date, "d LLL y - HH:mm");
};

export const numberShortener = (number: number) => {
  if (number < 1000) {
    return `${number}`;
  } else if (number < 1000000) {
    return `${(number / 1000).toFixed(1)}K`;
  } else if (number < 1000000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number < 1000000000000) {
    return `${(number / 1000000000).toFixed(1)}B`;
  } else {
    return `${(number / 1000000000000).toFixed(1)}T`;
  }
};
