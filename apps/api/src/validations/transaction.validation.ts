import { ErrorResponse } from '@/utils/error';
import { z } from 'zod';
import { deleteFile } from '@/utils/file';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export class TransactionValidation {
  static CREATE = z.object({
    eventId: z
      .number({ required_error: 'EventId is required!' })
      .int({ message: 'EventId must be an integer!' })
      .positive({ message: 'EventId must be a positive number!' }),
    seatRequests: z
      .number({ required_error: 'Seat Requests is required!' })
      .int({ message: 'Seat Requests must be an integer!' })
      .positive({ message: 'You cannot book 0 seats' }),
    voucherId: z
      .number({ message: 'VoucherId must be a number' })
      .int({ message: 'VoucherId must be an integer' })
      .positive({ message: 'VoucherId must be a positive number' })
      .optional(),
    redeemedPoints: z
      .number({ message: 'Redeemed Points must be a number' })
      .int({ message: 'Redeemed Points must be an integer' })
      .min(0, { message: 'Redeemed Points must be at least 0!' })
      .optional(),
  });

  static TRANSACTION_ID = z.coerce
    .number({ invalid_type_error: 'Transaction ID must be a number' })
    .int({ message: 'Transaction ID must be an integer' })
    .positive({ message: 'Transaction ID must be a positive number' });

  static fileValidation(file: Express.Multer.File) {
    if (!file) throw new ErrorResponse(400, 'Image is required!');

    if (file.size > MAX_FILE_SIZE) {
      deleteFile('../../public/assets/transactions', file.filename);
      throw new ErrorResponse(400, 'Image must be less than 2MB!');
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      deleteFile('../../public/assets/transactions', file.filename);
      throw new ErrorResponse(
        400,
        '.jpg, .jpeg, .png and .webp files are only accepted.',
      );
    }

    return file;
  }
}
