import { z } from 'zod';

export class ReviewValidation {
  static CREATE = z.object({
    comment: z.string({
      invalid_type_error: 'Message must be a String!',
      required_error: 'Message must be required!',
    }),
    rating: z
      .number({
        invalid_type_error: 'Rating must be a Number!',
        required_error: 'Rating must be required!',
      })
      .int({ message: 'Rating must be Integer!' })
      .min(1, { message:'Rating must be at least 1'})
      .max(5, { message: 'Rating must be less than 100!' }),
    eventId: z
      .number({
        invalid_type_error: 'EventId must be a Number!',
        required_error: 'EventId must be required!',
      })
      .int({ message: 'EventId must be Integer!' })
      .min(1, { message: 'EventId must be at least 1' }),
  });
}
