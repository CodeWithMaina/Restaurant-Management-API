import {eq} from "drizzle-orm"
import db from "../drizzle/db"
import {TOrderStatusInsert, TOrderStatusSelect, orderStatus} from "../drizzle/schema"


// Get all orderStatus
export const getorderStatusServices = async (): Promise<TOrderStatusSelect[] | null> => {
  return await db.query.orderStatus.findMany({});
};

// Get orderStatus by ID
export const getorderStatusByIdServices = async (orderId: number): Promise<TOrderStatusSelect | undefined> => {
  return await db.query.orderStatus.findFirst({
    where: eq(orderStatus.id, orderId)
  });
};

// create a new orderStatus
export const createorderStatusServices=async(orderStatusData:TOrderStatusInsert):Promise<string>=>{
  await db.insert(orderStatus).values(orderStatusData).returning();
  return "orderStatus created succesfully "
}

//update an orderStatus
export const updateorderStatusServices = async (orderStatusId: number, orderStatusData: TOrderStatusInsert): Promise<string> => {
  await db.update(orderStatus).set(orderStatusData).where(eq(orderStatus.id, orderStatusId)).returning();
  return "orderStatus updated successfully ";
};

//Delete an orderStatus
export const deleteorderStatusServices = async (orderStatusId: number): Promise<string> => {
  await db.delete(orderStatus).where(eq(orderStatus.id, orderStatusId)).returning();
  return "orderStatus deleted successfully ";
};



