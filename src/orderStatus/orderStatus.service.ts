import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { orderStatus, TOrderStatusInsert, TOrderStatusSelect } from "../drizzle/schema";
import { OrderStatusInput, OrderStatusSchema, PartialOrderStatusInput, PartialOrderStatusSchema } from "../validations/orderStatus.validator";

// Get all orderStatus with relations
export const getorderStatusServices = async (): Promise<TOrderStatusSelect[] | null> => {
  return await db.query.orderStatus.findMany({
    with: {
      order: true,
      statusCatalog: true
    }
  });
};

// Get orderStatus by ID with relations
export const getorderStatusByIdServices = async (id: number): Promise<TOrderStatusSelect | undefined> => {
  return await db.query.orderStatus.findFirst({
    where: eq(orderStatus.id, id),
    with: {
      order: true,
      statusCatalog: true
    }
  });
};

// Create a new orderStatus
export const createorderStatusServices = async (data: OrderStatusInput): Promise<TOrderStatusSelect> => {
  const validatedData = OrderStatusSchema.parse(data);
  const result = await db.insert(orderStatus).values(validatedData).returning();
  return result[0];
};

// Update an orderStatus
export const updateorderStatusServices = async (id: number, data: PartialOrderStatusInput): Promise<TOrderStatusSelect> => {
  const validatedData = PartialOrderStatusSchema.parse(data);
  const result = await db.update(orderStatus)
    .set(validatedData)
    .where(eq(orderStatus.id, id))
    .returning();
  return result[0];
};

// Delete an orderStatus
export const deleteorderStatusServices = async (id: number): Promise<TOrderStatusSelect> => {
  const result = await db.delete(orderStatus)
    .where(eq(orderStatus.id, id))
    .returning();
  return result[0];
};