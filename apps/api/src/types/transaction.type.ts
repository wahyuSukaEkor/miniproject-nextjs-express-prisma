export type TransactionCheckout = {
  paymentStatus: PaymentStatus;
};

export enum PaymentStatus {
  WAITING = 'waiting',
  PAID = 'paid',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type TransactionStatus = {
  status: PaymentStatus.SUCCESS | PaymentStatus.FAILED;
};

export type TransactionRequest = {
  event_id: number;
  seatRequests: number;
  voucher_id?: number;
  redeemedPoints?: number;
  eventId: number;
  voucherId?: number
};

export type TotalSaleResponse = {
  date: Date;
  base_price: number;
  discounted_price: number | null;
};

export type StatusResponse = {
  date: Date;
  waiting: number;
  paid: number;
  success: number;
  failed: number;
};
