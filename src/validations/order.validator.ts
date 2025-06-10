import { z } from "zod";
import { roleEnum } from "../drizzle/schema";

// Helper schemas
const timestampSchema = z.string().datetime().or(z.date());
const decimalSchema = z.string().regex(/^\d+\.\d{2}$/).or(z.number());

// Base order schema
export const OrderSchema = z.object({
  restaurantId: z.number().int().positive(),
  estimatedDeliveryTime: timestampSchema.optional(),
  actualDeliveryTime: timestampSchema,
  deliveryAddressId: z.number().int().positive(),
  userId: z.number().int().positive(),
  driverId: z.number().int().positive().optional(),
  price: decimalSchema,
  discount: decimalSchema.optional().default("0.00"),
  finalPrice: decimalSchema,
  comment: z.string().optional(),
});

// Schema for creating a new order
export const CreateOrderSchema = OrderSchema.omit({ 
  actualDeliveryTime: true 
}).extend({
  estimatedDeliveryTime: timestampSchema.optional(),
  orderItems: z.array(
    z.object({
      menuItemId: z.number().int().positive(),
      quantity: z.number().int().positive(),
      itemPrice: decimalSchema,
      price: decimalSchema,
      comment: z.string().optional(),
    })
  ).min(1, "At least one order item is required"),
}).partial({
  estimatedDeliveryTime: true, // Optional field
  discount: true, // Optional field
  comment: true, // Optional field
});

// Schema for updating an order
export const UpdateOrderSchema = OrderSchema.partial().extend({
  statusUpdates: z.array(
    z.object({
      statusCatalogId: z.number().int().positive(),
    })
  ).optional(),
  comments: z.array(
    z.object({
      userId: z.number().int().positive(),
      commentText: z.string(),
      isComplaint: z.boolean().optional(),
      isPraise: z.boolean().optional(),
    })
  ).optional(),
}).refine(
  (data) => Object.keys(data).length > 0, 
  { message: "At least one field must be provided for update" }
);

// Schema for order status update
export const OrderStatusUpdateSchema = z.object({
  statusCatalogId: z.number().int().positive(),
});

// Schema for adding a comment to an order
export const OrderCommentSchema = z.object({
  userId: z.number().int().positive(),
  commentText: z.string().min(1),
  isComplaint: z.boolean().optional(),
  isPraise: z.boolean().optional(),
});

// Schema for order items
export const OrderItemSchema = z.object({
  menuItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  itemPrice: decimalSchema,
  price: decimalSchema,
  comment: z.string().optional(),
});