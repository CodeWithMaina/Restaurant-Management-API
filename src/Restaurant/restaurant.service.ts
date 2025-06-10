import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurant, city, TRestaurantSelect } from "../drizzle/schema";
import { RestaurantInput, UpdateRestaurantInput } from "../validations/restaurant.validator";

export const getAllRestaurantsService = async (): Promise<TRestaurantSelect[] | null> => {
  return await db.query.restaurant.findMany({
    with: {
      city: {
        columns: {
          name: true,
        }
      }
    }
  });
};

export const getRestaurantByIdService = async (id: number): Promise<TRestaurantSelect | undefined> => {
  return await db.query.restaurant.findFirst({
    where: eq(restaurant.id, id),
    with: {
      city: {
        columns: {
          name: true,
        }
      }
    }
  });
};

export const createNewRestaurantService = async (restaurantData: RestaurantInput): Promise<string> => {
  await db.insert(restaurant).values(restaurantData).returning();
  return "Restaurant created successfully 🎉";
};

export const updateRestaurantService = async (id: number, restaurantData: UpdateRestaurantInput): Promise<string> => {
  await db.update(restaurant).set(restaurantData).where(eq(restaurant.id, id));
  return "Restaurant updated successfully 😎";
};

export const deleteRestaurantService = async (id: number): Promise<string> => {
  await db.delete(restaurant).where(eq(restaurant.id, id));
  return "Restaurant deleted successfully 🎉";
};