import { CategoryResponse } from "./category";
import { LocationResponse } from "./location";
import { PaymentStatus } from "./transaction";

export type AdminEventResponse = {
  id: number;
  event_name: string;
  price: number;
  description: string;
  available_seats: number;
  max_capacity: number;
  thumbnails_path: string;
  buy_limit: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  category_id?: number;
  location_id?: number;
  category: CategoryResponse;
  location: LocationResponse;
};

export type AdminEventTransactionResponse = {
  id: number;
  base_price: number;
  quantity: number;
  total_price: number;
  discounted_price?: number;
  point_used: number | null;
  payment_status: PaymentStatus;
  created_at: string;
  updated_at: string;
  user: { username: string };
  event: { name: string };
  voucer: { name: string | null };
};

export type FilterDate = {
  start_date?: string;
  end_date?: string;
};

export type AdminTotalSalesResponse = {
  revenue: number;
  date: string;
};

export type AdminTransactionStatusResponse = {
  date: string;
  waiting: number;
  paid: number;
  success: number;
  failed: number;
};

export type AdminTotalParticipationResponse = {
  transaction_id: number;
  username: string;
  email: string;
  quantity: number;
  payment_status: PaymentStatus;
  created_at: string;
};
