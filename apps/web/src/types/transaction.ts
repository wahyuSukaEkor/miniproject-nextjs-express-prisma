export type PaymentStatus = "waiting" | "paid" | "success" | "failed";

export type TransactionResponse = {
  id: number;
  base_price: number;
  quantity: number;
  total_price: number;
  discounted_price: null | number;
  point_used: null | number;
  user_id: number;
  eventId: number;
  voucer_id: null | number;
  payment_status: PaymentStatus;
  payment_path: string;
  created_at: string;
  updated_at: string;
};

export type transactionDetailResponse = {
  id: number;
  ticket_code: string;
  transaction_id: number;
};
