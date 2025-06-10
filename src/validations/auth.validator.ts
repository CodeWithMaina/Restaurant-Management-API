// auth.validator.ts
import { z } from "zod";
import { roleEnum } from "../drizzle/schema";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactPhone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters"), // Reduced to 4 chars
  userType: z.enum(roleEnum.enumValues).default('customer')
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email format")
});

export const updatePasswordSchema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters") // Reduced to 4 chars
});

// Type exports remain the same
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;