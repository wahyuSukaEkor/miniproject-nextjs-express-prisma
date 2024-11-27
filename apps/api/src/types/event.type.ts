export type EventQuery = {
  page?: string | number;
  limit?: string | number;
  price?: string | number;
  category_id?: string | number;
  category?: string;
  location_id?: string | number;
  location?: string;
  event_name?: string;
  id?: number;
  start_date?: Date;
  end_date?: Date;
};

export type EventRequest = {
  event_name: string;
  price: number;
  start_date: Date;
  end_date: Date;
  category_id: number;
  location_id: number;
  description: string;
  max_capacity: number;
  buy_limit: number;
};
