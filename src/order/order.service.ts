import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TOrdersInsert, TOrdersSelect, orders } from "../drizzle/schema";

// Get all orders
export const getOrdersServices = async (): Promise<TOrdersSelect[] | null> => {
  return await db.query.orders.findMany({});
};

// Get order by ID
export const getOrderByIdServices = async (orderId: number): Promise<TOrdersSelect | undefined> => {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId)
  });
};

//Create order
export const createOrderServices = async (order: TOrdersInsert): Promise<string> => {
  const processedOrder = {
    ...order,
    estimatedDeliveryTime: order.estimatedDeliveryTime ? new Date(order.estimatedDeliveryTime) : new Date(Date.now() + 30 * 60000), // 30 mins later
    actualDeliveryTime: order.actualDeliveryTime ? new Date(order.actualDeliveryTime) : new Date(), // Fallback to current time
  };

  await db.insert(orders).values(processedOrder).returning();
  return "Order created successfully ";
};


// update an order
export const updateOrderServices = async (orderId: number, order: TOrdersInsert): Promise<string> => {
  await db.update(orders).set(order).where(eq(orders.id, orderId)).returning();
  return "Order updated successfully ";
};

//Delete an order
export const deleteOrderServices = async (orderId: number): Promise<string> => {
  await db.delete(orders).where(eq(orders.id, orderId)).returning();
  return "Order deleted successfully ";
};
