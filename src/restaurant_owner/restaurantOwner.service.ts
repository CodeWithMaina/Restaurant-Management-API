 import db from "../drizzle/db";
import { TRestaurantOwnerInsert, TRestaurantOwnerSelect, restaurantOwner } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getRestaurantOwnersService = async (): Promise<TRestaurantOwnerInsert[] | null> => {
    return await db.query.restaurantOwner.findMany({
        with: {
            restaurant: {
                columns: {
                    name: true,
                }
            },
            user:{
                columns:{
                    name: true
                }
            }
        }
    });
}

export const getRestaurantOwnerByIdService = async (id: number): Promise<TRestaurantOwnerSelect | undefined> => {
    return await db.query.restaurantOwner.findFirst({
        where: eq(restaurantOwner.id, id),
        with: {
            restaurant: {
                columns: {
                    name: true,
                }
            }
        }
    });
}

export const createRestaurantOwnerService = async (restaurantOwnerValues: TRestaurantOwnerInsert): Promise<string> => {
    await db.insert(restaurantOwner).values(restaurantOwnerValues).returning();
    return "Restaurant owner created successfully 🎉";
}

export const updateRestaurantOwnerService = async (id: number, restaurantOwnerValues: TRestaurantOwnerInsert): Promise<string> => {
    await db.update(restaurantOwner).set(restaurantOwnerValues).where(eq(restaurantOwner.id, id));
    return "Restaurant owner updated successfully 😎";
}

export const deleteRestaurantOwnerService = async (id: number): Promise<string> => {
    await db.delete(restaurantOwner).where(eq(restaurantOwner.id, id));
    return "Restaurant owner deleted successfully 🎉";
}