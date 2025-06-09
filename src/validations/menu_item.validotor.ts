import { z } from "zod";

// Shared fields
const baseMenuItemSchema = {
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
  ingredients: z.array(z.string()).min(1, "At least one ingredient is required"),
  price: z.number().positive("Price must be a positive number"),
  restaurantId: z.number().int().positive("Restaurant ID must be a positive integer"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  active: z.boolean({ invalid_type_error: "Active must be a boolean value" }),
};

// Create Validator (all fields required)
export const createMenuItemValidator = z.object({
  ...baseMenuItemSchema,
});

// Update Validator (partial update allowed — make fields optional)
export const updateMenuItemValidator = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  ingredients: z.array(z.string()).min(1).optional(),
  price: z.number().positive().optional(),
  restaurantId: z.number().int().positive().optional(),
  categoryId: z.number().int().positive().optional(),
  active: z.boolean().optional(),
});
