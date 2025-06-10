import { z } from "zod";
import { TRestaurantInsert } from "../drizzle/schema";

// Strict city ID validation schema (reusable)
const CityIdSchema = z.number().int().positive("City ID must be a positive integer");

// Strict name validation schema (reusable)
const RestaurantNameSchema = z.string()
  .min(1, "Name is required")
  .max(255, "Name must be less than 255 characters")
  .trim()
  .refine(val => val.length > 0, {
    message: "Name cannot be just whitespace"
  });

// Strict address validation schema (reusable)
const StreetAddressSchema = z.string()
  .min(1, "Street address is required")
  .max(500, "Address must be less than 500 characters")
  .trim()
  .refine(val => val.length > 0, {
    message: "Street address cannot be just whitespace"
  });

// Strict zip code validation schema (reusable)
const ZipCodeSchema = z.string()
  .min(1, "Zip code is required")
  .max(20, "Zip code must be less than 20 characters")
  .trim()
  .refine(val => val.length > 0, {
    message: "Zip code cannot be just whitespace"
  });

// Base schema for restaurant validation (strict mode)
export const RestaurantSchema = z.object({
  name: RestaurantNameSchema,
  streetAddress: StreetAddressSchema,
  zipCode: ZipCodeSchema,
  cityId: CityIdSchema,
}).strict().superRefine((data, ctx) => {
  // Add any cross-field validation here if needed
  // Example: if zip code must match city pattern
});

// Schema for creating a new restaurant (strict mode)
export const CreateRestaurantSchema = z.object({
  name: RestaurantNameSchema,
  streetAddress: StreetAddressSchema,
  zipCode: ZipCodeSchema,
  cityId: CityIdSchema,
}).strict().refine((data: any) => data, {
  message: "Request body must contain restaurant data"
});

// Schema for updating a restaurant (strict mode - all fields optional except ID)
export const UpdateRestaurantSchema = z.object({
  name: RestaurantNameSchema.optional(),
  streetAddress: StreetAddressSchema.optional(),
  zipCode: ZipCodeSchema.optional(),
  cityId: CityIdSchema.optional(),
  id: z.number().int().positive("ID must be a positive integer")
}).strict().refine(obj => Object.keys(obj).length > 1, {
  message: "At least one field must be provided for update"
});

// Schema for ID validation (strict mode)
export const RestaurantIdSchema = z.object({
  id: z.number().int().positive("ID must be a positive integer")
}).strict();

// Type exports with strict typing
export type RestaurantInput = z.infer<typeof RestaurantSchema> & TRestaurantInsert;
export type CreateRestaurantInput = z.infer<typeof CreateRestaurantSchema>;
export type UpdateRestaurantInput = z.infer<typeof UpdateRestaurantSchema>;
export type RestaurantIdInput = z.infer<typeof RestaurantIdSchema>;