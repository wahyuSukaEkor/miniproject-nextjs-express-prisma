import { z } from 'zod';

export class VoucherValidation {
  static CREATE = z.object({
    name: z.string({
      invalid_type_error: 'Name must be a String!',
      required_error: 'Name must be required!',
    }).nonempty({ message: 'Name cannot be empty!' }),
    maxUsage: z
      .number({
        invalid_type_error: 'Max Usage must be a Number!',
        required_error: 'Max Usage must be required!',
      })
      .int({ message: 'Max Usage must be Integer!' })
      .min(1, { message: 'Max usage must be at least 1' }),
    discount: z
      .number({
        invalid_type_error: 'Discount must be a Number!',
        required_error: 'Discount must be required!',
      })
      .int({ message: 'Discount must be Integer!' })
      .min(1, { message: 'Discount must be at least 1' })
      .max(100, { message: 'Discount must be less than 100!' }),
    eventId: z
      .number({
        invalid_type_error: 'EventId must be a Number!',
        required_error: 'EventId must be required!',
      })
      .int({ message: 'EventId must be Integer!' })
      .min(1, { message: 'EventId must be at least 1' }),
  });

  static EVENT_ID = z.coerce
    .number({ invalid_type_error: 'Event AAAAAID must be a Number!' })
    .int({ message: 'Event ID must be an integer' })
    .positive();


}
