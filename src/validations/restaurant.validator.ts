// src/validation/restaurant.validator.ts
import { z } from "zod";

export const createRestaurantValidator = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  cityId: z.number({
    required_error: "City ID is required",
    invalid_type_error: "City ID must be a number"
  }).positive("City ID must be a positive number"),
});

export const updateRestaurantValidator = z.object({
  name: z.string().min(1, "Restaurant name is required").optional(),
  streetAddress: z.string().min(1, "Street address is required").optional(),
  zipCode: z.string().min(1, "Zip code is required").optional(),
  cityId: z.number({
    invalid_type_error: "City ID must be a number"
  }).positive("City ID must be a positive number").optional(),
});
