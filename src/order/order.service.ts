import { city } from "./../drizzle/schema";
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
  address,
} from "../drizzle/schema";

// Get all orders with relations
export const getOrdersServices = async (): Promise<TOrdersSelect[] | null> => {
  return await db.query.orders.findMany({
    columns:{
      id: true,
      // restaurantId: true,
      // userId: true,
      // driverId: true,
      // deliveryAddressId: true,
      estimatedDeliveryTime: true,
      actualDeliveryTime: true,
      price: true,
      discount: true,
      finalPrice: true,
      createdAt: true,
    },
    with: {
      restaurant: {
        columns: { name: true, streetAddress: true, zipCode: true },
      },
      user: {
        columns:{
          id: true,
          name: true,
          contactPhone: true,
          email: true,
          userType: true,
        }
      },
      driver: {
        columns: {
          carMake: true,
          carModel: true,
          carYear: true,
          userId: true,
        },
      },
      deliveryAddress: {
        columns: {
          streetAddress1: true,
          zipCode: true,
          deliveryInstructions: true,
        },
      },
      orderItems: {
        with: {
          menuItem: {
            columns:{
              id: true,
              name: true,
              description: true,
              ingredients: true,
              price: true,
            }
          },
        },
      },
      comments: true,
      statuses: {
        with: {
          statusCatalog: true,
        },
      },
    },
  });
};

// Get order by ID with relations
export const getOrderByIdServices = async (
  orderId: number
): Promise<TOrdersSelect | undefined> => {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
    with: {
      restaurant: {
        columns: {
          name: true,
          streetAddress: true,
          zipCode: true,
          cityId: true,
        },
      },
      user: {
        columns: {
          name: true,
          contactPhone: true,
          email: true,
          userType: true,
        },
      },
      driver: {
        columns: {
          carMake: true,
          carModel: true,
          carYear: true,
          online: true,
          delivering: true,
        },
      },
      deliveryAddress: {
        columns: {
          streetAddress1: true,
          streetAddress2: true,
          zipCode: true,
          deliveryInstructions: true,
          cityId: true,
        },
      },
      orderItems: {
        columns: {
          orderId: true,
          quantity: true,
          price: true,
        },
        with: {
          menuItem: {
            columns: {
              id: true,
              name: true,
              description: true,
              ingredients: true,
              price: true,
              active: true,
            },
          },
        },
      },
      comments: {
        columns: {
          id: true,
          userId: true,
          commentText: true,
          isPraise: true,
          isComplaint: true,
        },
      },
      statuses: {
        with: {
          statusCatalog: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

// Create order
export const createOrderServices = async (
  order: TOrdersInsert
): Promise<TOrdersSelect> => {
  const processedOrder = {
    ...order,
    estimatedDeliveryTime: order.estimatedDeliveryTime
      ? new Date(order.estimatedDeliveryTime)
      : new Date(Date.now() + 30 * 60000), // 30 mins later
    actualDeliveryTime: order.actualDeliveryTime
      ? new Date(order.actualDeliveryTime)
      : new Date(), // Fallback to current time
  };

  const [newOrder] = await db.insert(orders).values(processedOrder).returning();
  return newOrder;
};

// Update order
export const updateOrderServices = async (
  orderId: number,
  order: TOrdersInsert
): Promise<TOrdersSelect> => {
  const [updatedOrder] = await db
    .update(orders)
    .set(order)
    .where(eq(orders.id, orderId))
    .returning();
  return updatedOrder;
};

// Delete order
export const deleteOrderServices = async (
  orderId: number
): Promise<TOrdersSelect> => {
  const [deletedOrder] = await db
    .delete(orders)
    .where(eq(orders.id, orderId))
    .returning();
  return deletedOrder;
};

// Get Order Items Based On Restaurant Id Service
export const getOrderItemsByRestaurantIdService = async (
  restaurantId: number
): Promise<TOrdersSelect[] | null> => {
  return await db.query.orders.findMany({
    where: eq(orders.restaurantId, restaurantId),
    with: {
      restaurant: {
        columns: {
          id: true,
          name: true,
          streetAddress: true,
          zipCode: true,
          cityId: true,
        },
      },
      user: {
        columns: {
          id: true,
          contactPhone: true,
          email: true,
          name: true,
          userType: true,
        },
      },
      driver: {
        columns: {
          id: true,
          carMake: true,
          carModel: true,
          carYear: true,
          userId: true,
        },
      },
      deliveryAddress: {
        columns: {
          cityId: true,
          deliveryInstructions: true,
          id: true,
          streetAddress1: true,
          streetAddress2: true,
          userId: true,
          zipCode: true,
        },
      },
      orderItems: {
        columns: {
          id: true,
          orderId: true,
          quantity: true,
          price: true,
        },
        with: {
          menuItem: {
            columns: {
              id: true,
              name: true,
              description: true,
              ingredients: true,
              price: true,
            },
            with: {
              category: true,
            },
          },
        },
      },
      comments: {
        columns: {
          id: true,
          userId: true,
          orderId: true,
          isComplaint: true,
          isPraise: true,
          commentText: true,
        },
      },
      statuses: {
        columns: {
          id: true,
          orderId: true,
        },

        with: {
          statusCatalog: true,
        },
      },
    },
  });
};
