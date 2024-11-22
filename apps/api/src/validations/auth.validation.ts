import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly REGISTER: ZodType = z
    .object({
      username: z
        .string({
          required_error: 'Username is required!',
          invalid_type_error: 'Username must be a string!',
        })
        .min(3, { message: 'Username must be at least 3 characters!' }),
      email: z
        .string({
          required_error: 'Email is required!',
          invalid_type_error: 'Email must be a string!',
        })
        .email({ message: 'Email format is invalid!' }),
      password: z
        .string({
          required_error: 'Password is required!',
          invalid_type_error: 'Password must be a string!',
        })
        .min(4, { message: 'Password must be at least 4 characters!' }),
      isAdmin: z.boolean({
        required_error: 'isAdmin is required!',
        invalid_type_error: 'isAdmin must be a boolean value!',
      }),
      referralCode: z
        .string({
          required_error: 'Referral Code is required!',
          invalid_type_error: 'Referral Code must be a string!',
        })
        .min(6, { message: 'Referral Code must be at least 6 characters!' })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.isAdmin && data.referralCode !== undefined) return false;
        return true;
      },
      {
        message: 'Admin cannot provide a referral code!',
        path: ['referralCode'],
      },
    );

  static readonly LOGIN: ZodType = z.object({
    identity: z
      .string({
        required_error: 'Identity is required!',
        invalid_type_error: 'Identity must be a string!',
      })
      .min(3, { message: 'Identity must be at least 3 characters!' }),
    password: z
      .string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string!',
      })
      .min(4, { message: 'Password must be at least 4 characters!' }),
  });
}
