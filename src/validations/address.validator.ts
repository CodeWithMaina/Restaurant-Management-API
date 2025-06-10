import { z } from "zod";
import { TAddressInsert, TAddressSelect } from "../drizzle/schema";

// Strict schema that exactly matches TAddressInsert
const addressInsertSchema = z.object({
  streetAddress1: z.string().min(1).max(1000),
  streetAddress2: z.string().max(1000).nullable().optional(),
  zipCode: z.string().min(1).max(20),
  deliveryInstructions: z.string().max(1000).nullable().optional(),
  userId: z.number().int().positive(),
  cityId: z.number().int().positive(),
  // These are automatically set by DB
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// For creation - requires all non-optional fields
export const createAddressSchema = addressInsertSchema.omit({ 
  createdAt: true, 
  updatedAt: true 
});

// For updates - makes everything optional except id
export const updateAddressSchema = addressInsertSchema
  .partial()
  .extend({
    id: z.number().int().positive(),
  })
  .omit({ createdAt: true, updatedAt: true })
  .refine(data => Object.keys(data).length > 1, {
    message: "At least one field must be provided for update",
  });

// Type exports
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;

// Validation functions with proper type assertions
export const validateCreateAddress = (data: unknown): TAddressInsert => {
  return createAddressSchema.parse(data);
};

export const validateUpdateAddress = (data: unknown): Omit<UpdateAddressInput, 'id'> => {
  const { id, ...rest } = updateAddressSchema.parse(data);
  return rest;
};