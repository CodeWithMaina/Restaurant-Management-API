import { z } from "zod";

export const DriverSchema = z.object({
  carMake: z.string().min(1).max(100),
  carModel: z.string().min(1).max(100),
  carYear: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  userId: z.number().int().positive(),
  online: z.boolean().optional().default(false),
  delivering: z.boolean().optional().default(false),
});

export const PartialDriverSchema = DriverSchema.partial();

export type DriverInput = z.infer<typeof DriverSchema>;
export type PartialDriverInput = z.infer<typeof PartialDriverSchema>;