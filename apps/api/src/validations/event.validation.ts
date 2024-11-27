import { ErrorResponse } from '@/utils/error';
import { z } from 'zod';
import { deleteFile } from '@/utils/file';

const MIN_CATEGORY_ID = 1;
const MAX_CATEGORY_ID = 6;
const MIN_LOCATION_ID = 1;
const MAX_LOCATION_ID = 515;
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export class EventValidation {
  static fileValidation(file: Express.Multer.File) {
    if (!file) throw new ErrorResponse(400, 'Image is required!');

    if (file.size > MAX_FILE_SIZE) {
      deleteFile('../../public/assets/events', file.filename);
      throw new ErrorResponse(400, 'Image must be less than 2MB!');
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      deleteFile('../../public/assets/events', file.filename);
      throw new ErrorResponse(
        400,
        '.jpg, .jpeg, .png and .webp files are accepted.',
      );
    }

    return file;
  }

  static fileValidationWithOptional(file: Express.Multer.File) {
    if (file) return EventValidation.fileValidation(file);
  }

  static QUERY = z.object({
    page: z.coerce
      .number({ invalid_type_error: 'Page must be a Number!' })
      .int({ message: 'Page must be an integer' })
      .optional(),
    limit: z.coerce
      .number({ invalid_type_error: 'Limit must be a Number!' })
      .int({ message: 'Limit must be an integer' })
      .optional(),
    price: z.coerce
      .number({ invalid_type_error: 'Price must be a Number!' })
      .int({ message: 'Price must be an integer' })
      .optional(),
    category_id: z.coerce
      .number({ invalid_type_error: 'CategoryId must be a Number!' })
      .int({ message: 'CategoryId must be an integer' })
      .optional(),
    location_id: z.coerce
      .number({ invalid_type_error: 'LocationId must be a Number!' })
      .int({ message: 'LocationId must be an integer' })
      .optional(),
    event_name: z.string().optional(),
    id: z.coerce.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
  });

  static CREATE = z
    .object({
      event_name: z
        .string({
          required_error: 'Name is required!',
          invalid_type_error: 'Name must be a string!',
        })
        .min(3, { message: 'Name must be at least 3 characters!' }),
      price: z.coerce
        .number({
          required_error: 'Price is required!',
          invalid_type_error: 'Price must be a Number!',
        })
        .min(0, { message: 'Price must be at least 0!' })
        .int({ message: 'Price must be an integer!' }),
      start_date: z
        .string({
          required_error: 'Start date is required!',
          invalid_type_error: 'Start date must be a string!',
        })
        .transform((str) => new Date(str))
        .refine(
          (date) => {
            const today = new Date();
            if (today > date) return false;
            return true;
          },
          { message: 'Start Date cannot be in the past!' },
        ),
      end_date: z
        .string({
          required_error: 'End date is required!',
          invalid_type_error: 'End date must be a string!',
        })
        .transform((str) => new Date(str))
        .refine(
          (date) => {
            const today = new Date();
            if (today > date) return false;
            return true;
          },
          { message: 'End Date cannot be in the past!' },
        ),
      location_id: z.coerce
        .number({
          required_error: 'LocationId is required!',
          invalid_type_error: 'LocationId must be a Number!',
        })
        .min(MIN_LOCATION_ID, {
          message: `LocationId must be greater than ${MIN_LOCATION_ID} and less than ${MAX_LOCATION_ID}`,
        })
        .max(MAX_LOCATION_ID, {
          message: `LocationId must be greater than ${MIN_LOCATION_ID} and less than ${MAX_LOCATION_ID}`,
        })
        .int({ message: 'LocationId must be an integer!' }),
      category_id: z.coerce
        .number({
          required_error: 'Category is required!',
          invalid_type_error: 'CategoryId must be a Number',
        })
        .min(MIN_CATEGORY_ID, {
          message: `CategoryId must be greater than ${MIN_CATEGORY_ID} and less than ${MAX_CATEGORY_ID}`,
        })
        .max(MAX_CATEGORY_ID, {
          message: `CategoryId must be greater than ${MIN_CATEGORY_ID} and less than ${MAX_CATEGORY_ID}`,
        })
        .int({ message: 'CategoryId must be an integer!' }),
      description: z
        .string({
          required_error: 'Description is required!',
          invalid_type_error: 'Description must be a string!',
        })
        .min(100, { message: 'Description must be at least 100 characters!' }),
      max_capacity: z.coerce
        .number({
          required_error: 'Max Capacity is required!',
          invalid_type_error: 'Max Capacity must be a Number!',
        })
        .min(1, { message: 'Max Capacity must be at least 1!' })
        .int({ message: 'Max Capacity must be an integer!' }),
      buy_limit: z.coerce
        .number({
          required_error: 'Limit Checkout is required!',
          invalid_type_error: 'Limit Checkout must be a Number!',
        })
        .int({ message: 'Limit Checkout must be an integer!' }),
    })
    .refine((data) => data.start_date <= data.end_date, {
      message: 'Start date cannot be after end date!',
      path: ['end_date'],
    })
    .refine(
      (data) =>
        data.buy_limit > 0 && data.buy_limit <= data.max_capacity,
      {
        message:
          'Limit Checkout must be greater than 0 and less than Max Capacity!',
        path: ['buy_limit'],
      },
    );

  static UPDATE = z
    .object({
      event_name: z
        .string({ invalid_type_error: 'Name must be a string!' })
        .min(3, { message: 'Name must be at least 3 characters!' })
        .optional(),
      price: z.coerce
        .number({
          required_error: 'Price is required!',
          invalid_type_error: 'Price must be a Number!',
        })
        .min(0, { message: 'Price must be at least 0!' })
        .int({ message: 'Price must be an integer!' })
        .optional(),
      start_date: z
        .string({ invalid_type_error: 'Start date must be a string!' })
        .transform((str) => new Date(str))
        .refine(
          (date) => {
            const today = new Date();
            if (today > date) return false;
            return true;
          },
          { message: 'Start Date cannot be in the past!' },
        )
        .optional(),
      end_date: z
        .string({ invalid_type_error: 'End date must be a string!' })
        .transform((str) => new Date(str))
        .refine(
          (date) => {
            const today = new Date();
            if (today > date) return false;
            return true;
          },
          { message: 'End Date cannot be in the past!' },
        )
        .optional(),
      location_id: z.coerce
        .number({ invalid_type_error: 'LocationId must be a Number!' })
        .min(MIN_LOCATION_ID, {
          message: `LocationId must be greater than ${MIN_LOCATION_ID} and less than ${MAX_LOCATION_ID}`,
        })
        .max(MAX_LOCATION_ID, {
          message: `LocationId must be greater than ${MIN_LOCATION_ID} and less than ${MAX_LOCATION_ID}`,
        })
        .int({ message: 'LocationId must be an integer!' })
        .optional(),
      category_id: z.coerce
        .number({ invalid_type_error: 'CategoryId must be a Number' })
        .min(MIN_CATEGORY_ID, {
          message: `CategoryId must be greater than ${MIN_CATEGORY_ID} and less than ${MAX_CATEGORY_ID}`,
        })
        .max(MAX_CATEGORY_ID, {
          message: `CategoryId must be greater than ${MIN_CATEGORY_ID} and less than ${MAX_CATEGORY_ID}`,
        })
        .int({ message: 'CategoryId must be an integer!' })
        .optional(),
      description: z
        .string({ invalid_type_error: 'Description must be a string!' })
        .min(100, { message: 'Description must be at least 100 characters!' })
        .optional(),
      max_capacity: z.coerce
        .number({ invalid_type_error: 'Max Capacity must be a Number!' })
        .min(1, { message: 'Max Capacity must be at least 1!' })
        .int({ message: 'Max Capacity must be an integer!' })
        .optional(),
      buy_limit: z.coerce
        .number({ invalid_type_error: 'Limit Checkout must be a Number!' })
        .int({ message: 'Limit Checkout must be an integer!' })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.start_date && data.end_date) {
          return data.start_date <= data.end_date;
        }
        return true;
      },
      {
        message: 'Start date cannot be after end date!',
        path: ['end_date'],
      },
    )
    .refine(
      (data) => {
        if (data.buy_limit && data.max_capacity) {
          return (
            data.buy_limit > 0 && data.buy_limit <= data.max_capacity
          );
        }
        return true;
      },
      {
        message:
          'Limit Checkout must be greater than 0 and less than Max Capacity!',
        path: ['buy_limit'],
      },
    );

  static EVENT_ID = z.coerce
    .number({ invalid_type_error: 'Event ID must be a number' })
    .int({ message: 'Event ID must be an integer' })
    .positive({ message: 'Event ID must be a positive number' });
}
