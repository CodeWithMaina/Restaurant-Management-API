import { z } from "zod";

// Create Category Validator
export const createCategoryValidator = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(2, { message: "Name must be at least 2 characters long" }),
  
  description: z
    .string({ invalid_type_error: "Description must be a string" })
    .optional()
    .nullable()
});

// Update Category Validator (name and/or description can be updated)
export const updateCategoryValidator = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Description must be a string" })
    .optional()
    .nullable()
});
