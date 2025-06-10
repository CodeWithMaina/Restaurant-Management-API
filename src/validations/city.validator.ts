// city.validator.ts
import { z } from "zod";
import { TCityInsert } from "../drizzle/schema";

// Base city schema for creation (all fields required)
export const createCitySchema = z.object({
  name: z.string().min(1, "City name is required").max(100, "City name too long"),
  stateId: z.number().int().positive("State ID must be a positive integer")
}) satisfies z.ZodType<TCityInsert>;

// Schema for updating a city (all fields optional)
export const updateCitySchema = createCitySchema.partial();

// Schema for city ID parameter
export const cityIdSchema = z.object({
  id: z.coerce.number().int().positive("City ID must be a positive integer")
});

// Type exports
export type CreateCityInput = z.infer<typeof createCitySchema>;
export type UpdateCityInput = z.infer<typeof updateCitySchema>;
export type CityIdParams = z.infer<typeof cityIdSchema>;