import { z } from "zod";

// Validation schemas
export const createOrderMenuItemSchema = z.object({
  orderId: z.number().int().positive(),
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  specialInstructions: z.string().optional(),
});

export const updateOrderMenuItemSchema = createOrderMenuItemSchema.partial();
