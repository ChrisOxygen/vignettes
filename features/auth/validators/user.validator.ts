import { z } from "zod";

// Base signup schema without refinement
const baseSignUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((name) => name.trim()),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((name) => name.trim()),

  middleName: z
    .string()
    .max(50, "Middle name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z\s'-]*$/,
      "Middle name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((name) => name.trim())
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must not exceed 255 characters")
    .transform((email) => email.toLowerCase().trim())
    .pipe(z.email("Please enter a valid email address")),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  confirmPassword: z.string().min(1, "Please confirm your password"),
});

// User creation schema with comprehensive validation
export const signUpSchema = baseSignUpSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

// Type inference from the schema
export type ZSignUpSchema = z.infer<typeof signUpSchema>;

// Schema for the actual user creation (without confirmPassword)
export const userCreationSchema = signUpSchema.omit({
  confirmPassword: true,
});

export type ZUserCreationData = z.infer<typeof userCreationSchema>;

// Additional validation schemas for different use cases
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .transform((email) => email.toLowerCase().trim())
    .pipe(z.email("Please enter a valid email address")),

  password: z.string().min(1, "Password is required"),
});

export type ZLoginInput = z.infer<typeof loginSchema>;

// Email validation schema (for forgot password, etc.)
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .transform((email) => email.toLowerCase().trim())
    .pipe(z.email("Please enter a valid email address")),
});

export type ZEmailInput = z.infer<typeof emailSchema>;

// Password reset schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ZResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// Password reset with token schema
export const resetPasswordWithTokenSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must not exceed 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ZResetPasswordWithTokenInput = z.infer<
  typeof resetPasswordWithTokenSchema
>;

// Admin signup schema (extends base signup with admin code)
export const adminSignUpSchema = baseSignUpSchema
  .extend({
    adminCode: z
      .string()
      .min(1, "Admin code is required")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Admin code must contain only letters and numbers"
      )
      .transform((code) => code.trim()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ZAdminSignUpSchema = z.infer<typeof adminSignUpSchema>;

// Schema for admin user creation (without confirmPassword but with adminCode)
export const adminUserCreationSchema = adminSignUpSchema.omit({
  confirmPassword: true,
});

export type ZAdminUserCreationData = z.infer<typeof adminUserCreationSchema>;
