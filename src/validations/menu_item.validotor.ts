import { z } from "zod";

// Base schema for menu item validation
export const MenuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  restaurantId: z.number().int().positive("Restaurant ID must be a positive integer"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  description: z.string().optional(),
  ingredients: z.string().min(1, "Ingredients are required"),
  price: z.number().positive("Price must be a positive number").or(
    z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format").transform(Number)
  ),
  active: z.boolean().default(true),
}).strict();

// Schema for creating a new menu item
export const CreateMenuItemSchema = MenuItemSchema;

// Schema for updating a menu item (all fields optional except ID)
export const UpdateMenuItemSchema = MenuItemSchema.partial().extend({
  id: z.number().int().positive("ID must be a positive integer"),
}).strict();

// Type for TypeScript inference
export type MenuItemInput = z.infer<typeof MenuItemSchema>;
export type CreateMenuItemInput = z.infer<typeof CreateMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof UpdateMenuItemSchema>;

// Schema for ID validation
export const MenuItemIdSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer"),
});