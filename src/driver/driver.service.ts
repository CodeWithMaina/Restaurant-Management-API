import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { driver, TDriverInsert, TDriverSelect } from "../drizzle/schema";
import { DriverInput, DriverSchema, PartialDriverInput, PartialDriverSchema } from "../validations/driver.validator";

export const getDriverService = async (): Promise<TDriverSelect[] | null> => {
  return await db.query.driver.findMany({
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          contactPhone: true,
        },
      },
      orders: {
        with: {
          orderItems: true,
          statuses: true,
        },
      },
    },
  });
};

export const getDriverByIdService = async (
  id: number
): Promise<TDriverSelect | undefined> => {
  return await db.query.driver.findFirst({
    where: eq(driver.id, id),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          contactPhone: true,
        },
      },
      orders: {
        with: {
          orderItems: true,
          statuses: true,
        },
      },
    },
  });
};

export const createDriverService = async (
  driverData: DriverInput
): Promise<TDriverSelect> => {
  const validatedData = DriverSchema.parse(driverData);
  const result = await db.insert(driver).values(validatedData).returning();
  return result[0];
};

export const updateDriverService = async (
  id: number,
  driverData: PartialDriverInput
): Promise<TDriverSelect> => {
  const validatedData = PartialDriverSchema.parse(driverData);
  const result = await db.update(driver)
    .set(validatedData)
    .where(eq(driver.id, id))
    .returning();
  return result[0];
};

export const deleteDriverService = async (id: number): Promise<TDriverSelect> => {
  const result = await db.delete(driver)
    .where(eq(driver.id, id))
    .returning();
  return result[0];
};