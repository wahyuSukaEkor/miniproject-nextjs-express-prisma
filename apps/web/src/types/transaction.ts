export type PaymentStatus = "waiting" | "paid" | "success" | "failed";

export type TransactionResponse = {
  id: number;
  amount: number;
  quantity: number;
  originalAmount: number;
  discountedAmount: null | number;
  redeemedPoints: null | number;
  userId: number;
  eventId: number;
  voucherId: null | number;
  paymentStatus: PaymentStatus;
  paymentProof: string;
  createdAt: string;
  updatedAt: string;
};

export type transactionDetailResponse = {
  id: number;
  ticketCode: string;
  transactionId: number;
};
