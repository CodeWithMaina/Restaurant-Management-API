import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { 
  TOrdersInsert, 
  TOrdersSelect, 
  orders,
  orderMenuItem,
  comment,
  orderStatus,
  restaurant,
  users,
  driver,
  address
} from "../drizzle/schema";

// Get all orders with relations
export const getOrdersServices = async (): Promise<TOrdersSelect[] | null> => {
  return await db.query.orders.findMany({
    with: {
      restaurant: true,
      user: true,
      driver: true,
      deliveryAddress: true,
      orderItems: {
        with: {
          menuItem: true
        }
      },
      comments: true,
      statuses: {
        with: {
          statusCatalog: true
        }
      }
    }
  });
};

// Get order by ID with relations
export const getOrderByIdServices = async (orderId: number): Promise<TOrdersSelect | undefined> => {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      restaurant: true,
      user: true,
      driver: true,
      deliveryAddress: true,
      orderItems: {
        with: {
          menuItem: true
        }
      },
      comments: true,
      statuses: {
        with: {
          statusCatalog: true
        }
      }
    }
  });
};

// Create order
export const createOrderServices = async (order: TOrdersInsert): Promise<TOrdersSelect> => {
  const processedOrder = {
    ...order,
    estimatedDeliveryTime: order.estimatedDeliveryTime ? new Date(order.estimatedDeliveryTime) : new Date(Date.now() + 30 * 60000), // 30 mins later
    actualDeliveryTime: order.actualDeliveryTime ? new Date(order.actualDeliveryTime) : new Date(), // Fallback to current time
  };

  const [newOrder] = await db.insert(orders).values(processedOrder).returning();
  return newOrder;
};

// Update order
export const updateOrderServices = async (orderId: number, order: TOrdersInsert): Promise<TOrdersSelect> => {
  const [updatedOrder] = await db.update(orders)
    .set(order)
    .where(eq(orders.id, orderId))
    .returning();
  return updatedOrder;
};

// Delete order
export const deleteOrderServices = async (orderId: number): Promise<TOrdersSelect> => {
  const [deletedOrder] = await db.delete(orders)
    .where(eq(orders.id, orderId))
    .returning();
  return deletedOrder;
};