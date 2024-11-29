import { z } from "zod";

export const participantSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters!" }),
    email: z.string().email({ message: "Email format is invalid!" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters!" }),
    confirmPassword: z.string(),
    referralCode: z
      .string()
      .trim()
      .refine(
        (referralCode) => {
          if (referralCode !== "" && referralCode.length < 6) return false;
          return true;
        },
        { message: "Referral Code must be at least 6 characters!" },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export type ParticipantSchema = z.infer<typeof participantSchema>;

export const organizerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters!" }),
    email: z.string().email({ message: "Email format is invalid!" }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

export type OrganizerSchema = z.infer<typeof organizerSchema>;

export const signInSchema = z.object({
  identity: z
    .string()
    .min(3, { message: "Username or Email must be at least 3 characters!" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters!" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
