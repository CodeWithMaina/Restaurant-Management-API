import { z } from "zod";

export const StateSchema = z.object({
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(10),
});

export const PartialStateSchema = StateSchema.partial();

export type StateInput = z.infer<typeof StateSchema>;
export type PartialStateInput = z.infer<typeof PartialStateSchema>;