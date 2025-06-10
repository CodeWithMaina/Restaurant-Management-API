import { z } from "zod";
import { roleEnum } from "../drizzle/schema";

// Helper schemas
const timestampSchema = z.union([z.string().datetime(), z.date()]).transform(val => new Date(val));
const decimalSchema = z.union([z.string(), z.number()]).transform(val => parseFloat(val.toString()));

// Base order schema
export const OrderSchema = z.object({
  restaurantId: z.number().int().positive(),
  estimatedDeliveryTime: timestampSchema.optional(),
  actualDeliveryTime: timestampSchema.optional(),
  deliveryAddressId: z.number().int().positive(),
  userId: z.number().int().positive(),
  driverId: z.number().int().positive().optional(),
  price: decimalSchema.refine(val => val >= 0, {
    message: "Price must be a positive number"
  }),
  discount: decimalSchema.refine(val => val >= 0, {
    message: "Discount must be a positive number"
  }).optional().default(0),
  finalPrice: decimalSchema.refine(val => val >= 0, {
    message: "Final price must be a positive number"
  }),
  comment: z.string().optional(),
});

// Order items schema
export const OrderItemSchema = z.object({
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  itemPrice: decimalSchema.refine(val => val >= 0, {
    message: "Item price must be a positive number"
  }),
  price: decimalSchema.refine(val => val >= 0, {
    message: "Price must be a positive number"
  }),
  comment: z.string().optional(),
});

// Full order creation schema with items
export const CreateOrderSchema = OrderSchema.extend({
  items: z.array(OrderItemSchema).nonempty({
    message: "At least one order item is required"
  }),
  estimatedDeliveryTime: timestampSchema.default(new Date(Date.now() + 30 * 60000)), // Default to 30 mins from now
  actualDeliveryTime: timestampSchema.optional(),
}).refine(data => data.finalPrice >= 0, {
  message: "Final price must be a positive number",
  path: ["finalPrice"]
}).refine(data => {
  const calculatedFinalPrice = data.price - (data.discount || 0);
  return Math.abs(calculatedFinalPrice - data.finalPrice) < 0.01; // Allow for small floating point differences
}, {
  message: "Final price must equal price minus discount",
  path: ["finalPrice"]
});

// Order update schema (all fields optional except ID)
export const UpdateOrderSchema = OrderSchema.partial().extend({
  id: z.number().int().positive(),
  estimatedDeliveryTime: timestampSchema.optional(),
  actualDeliveryTime: timestampSchema.optional(),
}).refine(data => {
  if (data.finalPrice !== undefined && data.price !== undefined && data.discount !== undefined) {
    const calculatedFinalPrice = data.price - data.discount;
    return Math.abs(calculatedFinalPrice - data.finalPrice) < 0.01;
  }
  return true;
}, {
  message: "Final price must equal price minus discount when all are provided",
  path: ["finalPrice"]
});

// Status update schema
export const OrderStatusSchema = z.object({
  orderId: z.number().int().positive(),
  statusCatalogId: z.number().int().positive(),
});

// Comment schema
export const OrderCommentSchema = z.object({
  orderId: z.number().int().positive(),
  userId: z.number().int().positive(),
  commentText: z.string().min(1),
  isComplaint: z.boolean().optional().default(false),
  isPraise: z.boolean().optional().default(false),
});

// Type exports
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;
export type OrderStatusInput = z.infer<typeof OrderStatusSchema>;
export type OrderCommentInput = z.infer<typeof OrderCommentSchema>;
export type OrderItemInput = z.infer<typeof OrderItemSchema>;