import db from "../drizzle/db";
import { driver, TDriverInsert, TDriverSelect } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const getDriverService = async (): Promise<TDriverSelect[] | null> => {
    const drivers = await db.query.driver.findMany({
        with: {
            user: {
                columns: {
                    name: true,
                    email: true
                }
            }
        }
    });
    return drivers;
};

export const getDriverByIdService = async (id: number): Promise<TDriverSelect | undefined> => {
    const result = await db.query.driver.findFirst({
        where: eq(driver.id, id),
        with: {
            user: {
                columns: {
                    name: true,
                    email: true
                }
            }
        }
    });
    return result;
}

export const createDriverService = async (driverValues: TDriverInsert): Promise<string> => {
    await db.insert(driver).values(driverValues).returning();
    return "Driver created successfully 🎉";
}

export const updateDriverService = async (id: number, driverValues: TDriverInsert): Promise<string> => {
    await db.update(driver).set(driverValues).where(eq(driver.id, id));
    return "Driver updated successfully 😎";
}

export const deleteDriverService = async (id: number): Promise<string> => {
    await db.delete(driver).where(eq(driver.id, id));
    return "Driver deleted successfully 🎉";
}