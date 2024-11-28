export type EventRequest = {
  name?: string;
  event_name?: string;
  price: number;
  start_date: Date;
  end_date: Date;
  location_id: number;
  category_id: number;
  description: string;
  max_capacity: number;
  buy_limit: number;
  image: File;
};

export type EventResponse = {
  id: number;
  name?: string;
  event_name?: string;
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
  user_id: number;
  location_id: number;
  category_id: number;
};
