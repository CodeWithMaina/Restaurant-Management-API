import { z } from "zod";

// Base restaurant owner schema
const restaurantOwnerBaseSchema = z.object({
  restaurantId: z.number().int().positive(),
  ownerId: z.number().int().positive(),
});

// Schema for creating a restaurant owner
export const createRestaurantOwnerSchema = restaurantOwnerBaseSchema;

// Schema for updating a restaurant owner
export const updateRestaurantOwnerSchema = restaurantOwnerBaseSchema.partial();

// Schema for restaurant owner ID parameter
export const restaurantOwnerIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string").transform(Number),
});

// Schema for the response when including relations
export const restaurantOwnerWithRelationsSchema = z.object({
  id: z.number(),
  restaurant: z.object({
    name: z.string(),
  }).optional(),
  user: z.object({
    name: z.string(),
  }).optional(),
});

// Type exports based on the schemas
export type CreateRestaurantOwnerInput = z.infer<typeof createRestaurantOwnerSchema>;
export type UpdateRestaurantOwnerInput = z.infer<typeof updateRestaurantOwnerSchema>;
export type RestaurantOwnerWithRelations = z.infer<typeof restaurantOwnerWithRelationsSchema>;