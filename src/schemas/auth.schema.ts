import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(100, { message: "Full name must be at most 100 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" }),
  role: z.enum(["user", "admin"], {
    error: "Role must be either 'user' or 'admin'",
  }),
  bio: z
    .string()
    .max(500, { message: "Bio must be at most 500 characters long" })
    .optional(),
  tagline: z
    .string()
    .max(100, { message: "Tagline must be at most 100 characters long" })
    .optional(),
  profilePictureUrl: z.url().optional(),
  socialLinks: z
    .array(z.url({ message: "Invalid social link URL" }))
    .optional(),
  skills: z
    .array(
      z
        .string()
        .min(1, { message: "Skill must be at least 1 character long" })
        .max(15, { message: "Skill must be at most 50 characters long" })
    )
    .optional(),
  country: z
    .string()
    .max(15, { message: "Country must be at most 100 characters long" })
    .optional(),
  state: z
    .string()
    .max(15, { message: "State must be at most 100 characters long" })
    .optional(),
  city: z
    .string()
    .max(15, { message: "City must be at most 100 characters long" })
    .optional(),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" }),
  role: z.enum(["user", "admin"], {
    error: "Role must be either 'user' or 'admin'",
  }),
});

export const passwordSchema = z
  .string()
  .min(8, { message: "Use at least 8 characters" })
  .regex(/[A-Z]/, { message: "Add uppercase letters" })
  .regex(/[a-z]/, { message: "Add lowercase letters" })
  .regex(/\d/, { message: "Add numbers" })
  .regex(/[@$!%*?&]/, { message: "Add special characters (@$!%*?&)" })
  .refine((val) => !/(123|abc|password|admin)/i.test(val), {
    message: "Avoid common patterns",
  });
