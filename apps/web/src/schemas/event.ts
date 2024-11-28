import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const eventSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required!" })
      .min(3, { message: "Name must be at least 3 characters!" }),
    price: z.coerce
      .number({ invalid_type_error: "Price is required!" })
      .int({ message: "Price must be an integer!" })
      .min(0, { message: "Price must be at least 0!" }),
    start_date: z
      .date({ required_error: "Start date is required!" })
      .min(yesterday, {
        message: "Start date cannot be in the past!",
      }),
    end_date: z
      .date({ required_error: "End date is required!" })
      .min(yesterday, {
        message: "End date cannot be in the past!",
      }),
    location: z.coerce
      .number({ invalid_type_error: "Location is required!" })
      .int({ message: "Location must be an integer!" }),
    category: z.coerce
      .number({ invalid_type_error: "Category is required!" })
      .int({
        message: "Category must be an integer!",
      }),
    description: z
      .string({ required_error: "Description is required!" })
      .min(100, { message: "Description must be at least 100 characters!" }),
    max_capacity: z.coerce
      .number({ invalid_type_error: "Max Capacity is required!" })
      .int({ message: "Max Capacity must be an integer!" })
      .min(1, { message: "Max Capacity must be at least 1!" }),
    buy_limit: z.coerce
      .number({
        invalid_type_error: "Limit Checkout is required!",
      })
      .int({ message: "Limit Checkout must be an integer!" })
      .min(0, { message: "Limit Checkout must be at least 0!" }),
    image: z.any().optional(),
  })
  .refine((data) => data.start_date <= data.end_date, {
    message: "Start date cannot be after end date!",
    path: ["endDate"],
  })
  .refine((data) => data.buy_limit <= data.max_capacity, {
    message:
      "Limit Checkout must be greater than 0 and less than Max Capacity!",
    path: ["limitCheckout"],
  });

export type EventSchema = z.infer<typeof eventSchema>;
