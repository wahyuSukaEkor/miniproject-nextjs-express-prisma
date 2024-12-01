import { z } from 'zod';

const EventSortEnum = [
  'name',
  'price',
  'available_seats',
  'start_date',
  'end_date',
  'created_at',
] as const;

export class UserValidation {
  static EVENT_QUERY = z.object({
    name: z.string().optional(),
    page: z.coerce
      .number({ invalid_type_error: 'Page must be a Number!' })
      .int({ message: 'Page must be an integer' })
      .optional(),
    limit: z.coerce
      .number({ invalid_type_error: 'Limit must be a Number!' })
      .int({ message: 'Limit must be an integer' })
      .optional(),
    sort_by: z
      .enum(EventSortEnum, {
        message: `Sort only allow: '${EventSortEnum.join(', ')}'`,
      })
      .optional(),
    order_by: z
      .enum(['asc', 'desc'], { message: "Order must be 'asc' or 'desc'" })
      .optional(),
  });

  static EVENT_TRANSACTION_QUERY = z.object({
    page: z.coerce
      .number({ invalid_type_error: 'Page must be a Number!' })
      .int({ message: 'Page must be an integer' })
      .optional(),
    limit: z.coerce
      .number({ invalid_type_error: 'Limit must be a Number!' })
      .int({ message: 'Limit must be an integer' })
      .optional(),
    sort_by: z
      .enum(['created_at'], {
        message: `Sort only allow: 'created_at'`,
      })
      .optional(),
    order_by: z
      .enum(['asc', 'desc'], { message: "Order must be 'asc' or 'desc'" })
      .optional(),
  });
}
