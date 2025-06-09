import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { restaurant, TRestaurantInsert, TRestaurantSelect, city } from "../drizzle/schema";

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

export const createNewRestaurantService = async (myRestaurant: TRestaurantInsert): Promise<string> => {
    await db.insert(restaurant).values(myRestaurant).returning();
    return "Restaurant created successfully 🎉";
};

export const updateRestaurantService = async (id: number, myRestaurant: Partial<TRestaurantInsert>): Promise<string> => {
    await db.update(restaurant).set(myRestaurant).where(eq(restaurant.id, id));
    return "Restaurant updated successfully 😎";
};

export const deleteRestaurantService = async (id: number): Promise<string> => {
    await db.delete(restaurant).where(eq(restaurant.id, id));
    return "Restaurant deleted successfully 🎉";
};