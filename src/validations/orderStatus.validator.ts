import { z } from "zod";

export const OrderStatusSchema = z.object({
  orderId: z.number().int().positive(),
  statusCatalogId: z.number().int().positive(),
});

export const PartialOrderStatusSchema = OrderStatusSchema.partial();

export type OrderStatusInput = z.infer<typeof OrderStatusSchema>;
export type PartialOrderStatusInput = z.infer<typeof PartialOrderStatusSchema>;