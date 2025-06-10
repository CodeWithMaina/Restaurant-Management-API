import { z } from "zod";

// Less strict password regex - only requires minimum length of 4 characters
// Removed requirements for uppercase, lowercase, numbers, and special characters
const passwordRegex = /^.{4,}$/;

export const UserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  contactPhone: z.string().min(10).max(20),
  password: z.string().regex(passwordRegex, {
    message: "Password must be at least 4 characters long"
  }),
  userType: z.enum(['admin', 'driver', 'customer', 'restaurant_owner']).optional().default('customer'),
  phoneVerified: z.boolean().optional().default(false),
  emailVerified: z.boolean().optional().default(false),
});

export const PartialUserSchema = UserSchema.partial();

export type UserInput = z.infer<typeof UserSchema>;
export type PartialUserInput = z.infer<typeof PartialUserSchema>;